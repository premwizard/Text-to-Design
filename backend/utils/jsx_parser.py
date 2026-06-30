"""
utils/jsx_parser.py
JSX parsing utilities: JSON repair, truncation repair, brace balancing, and JSX closure.
Extracted from routes/generate_ui.py for reuse across the codebase.
"""
import re
import json
import logging

logger = logging.getLogger("backend.utils.jsx_parser")


# ─── JSON Repair Utilities ─────────────────────────────────────────────────────

def repair_json_escapes(raw: str) -> str:
    r"""
    Walk the raw JSON string character-by-character and, inside string literals,
    double-escape any backslash that is NOT already part of a valid JSON escape
    sequence. Valid sequences: \", \\, \/, \b, \f, \n, \r, \t, \uXXXX.
    """
    VALID_ESCAPES = set('"\\/bfnrtu')
    result = []
    in_string = False
    i = 0
    length = len(raw)
    while i < length:
        ch = raw[i]
        if in_string:
            if ch == '\\':
                if i + 1 < length:
                    nxt = raw[i + 1]
                    if nxt in VALID_ESCAPES:
                        result.append(ch)
                        result.append(nxt)
                        i += 2
                        continue
                    else:
                        result.append('\\\\')
                        i += 1
                        continue
                else:
                    result.append('\\\\')
                    i += 1
                    continue
            elif ch == '"':
                in_string = False
                result.append(ch)
                i += 1
                continue
            else:
                result.append(ch)
                i += 1
                continue
        else:
            if ch == '"':
                in_string = True
            result.append(ch)
            i += 1
    return ''.join(result)


def repair_truncated_json(raw: str) -> str:
    """
    Attempt to close an LLM response that was truncated mid-stream.
    Handles unterminated strings and unbalanced arrays/objects.
    """
    result = []
    in_string = False
    escaped = False
    stack = []

    for ch in raw:
        result.append(ch)
        if escaped:
            escaped = False
            continue
        if ch == '\\' and in_string:
            escaped = True
            continue
        if ch == '"':
            in_string = not in_string
            continue
        if not in_string:
            if ch in ('{', '['):
                stack.append(ch)
            elif ch == '}':
                if stack and stack[-1] == '{':
                    stack.pop()
            elif ch == ']':
                if stack and stack[-1] == '[':
                    stack.pop()

    if in_string:
        result.append('"')
    for opener in reversed(stack):
        result.append('}' if opener == '{' else ']')

    return ''.join(result)


def parse_json_robust(raw: str) -> dict:
    """
    Attempts multiple strategies to parse a JSON string containing files.
    Always returns a dictionary (either successfully parsed or empty).
    """
    start_idx = raw.find('{')
    end_idx = raw.rfind('}')
    if start_idx == -1 or end_idx == -1:
        return {}

    json_str = raw[start_idx:end_idx + 1]

    # Strategy 1: Direct parse
    try:
        return json.loads(json_str)
    except json.JSONDecodeError:
        pass

    # Strategy 2: Escape repair
    try:
        return json.loads(repair_json_escapes(json_str))
    except json.JSONDecodeError:
        pass

    # Strategy 3: Truncation + escape repair
    try:
        return json.loads(repair_truncated_json(repair_json_escapes(json_str)))
    except json.JSONDecodeError:
        pass

    # Strategy 4: Regex fallback
    files = {}
    try:
        file_keys = re.findall(r"""["'](App\.jsx|components/[\w\.\-]+?\.jsx?)["']\s*:""", json_str)
        for key in file_keys:
            key_idx = json_str.find(f'"{key}"')
            if key_idx == -1:
                key_idx = json_str.find(f"'{key}'")
            if key_idx == -1:
                continue

            val_start = json_str.find(':', key_idx)
            if val_start == -1:
                continue

            curr = val_start + 1
            quote_char = None
            while curr < len(json_str):
                if json_str[curr] in ('"', "'", '`'):
                    quote_char = json_str[curr]
                    val_start = curr
                    break
                curr += 1

            if quote_char is None:
                continue

            val_content = []
            escaped = False
            curr = val_start + 1
            while curr < len(json_str):
                ch = json_str[curr]
                if escaped:
                    val_content.append(ch)
                    escaped = False
                elif ch == '\\':
                    val_content.append(ch)
                    escaped = True
                elif ch == quote_char:
                    break
                else:
                    val_content.append(ch)
                curr += 1

            raw_val = "".join(val_content)
            try:
                decoded_val = json.loads(f'"{raw_val}"')
            except Exception:
                decoded_val = raw_val.replace('\\n', '\n').replace('\\t', '\t').replace('\\"', '"').replace('\\\\', '\\')

            files[key] = decoded_val

        if files:
            return {"files": files}
    except Exception as e:
        logger.error(f"[parse_json_robust] Regex fallback parser failed: {e}")

    return {}


# ─── JSX Repair Utilities ──────────────────────────────────────────────────────

def count_unbalanced_braces(code: str) -> int:
    """
    Counts how many '{' are unbalanced, ignoring braces inside strings and comments.
    """
    if not code:
        return 0
    in_string = False
    string_char = None
    escaped = False
    in_single_line_comment = False
    in_multi_line_comment = False
    open_braces = 0
    i = 0
    length = len(code)
    while i < length:
        ch = code[i]
        if escaped:
            escaped = False
            i += 1
            continue
        if in_single_line_comment:
            if ch == '\n':
                in_single_line_comment = False
            i += 1
            continue
        if in_multi_line_comment:
            if ch == '*' and i + 1 < length and code[i + 1] == '/':
                in_multi_line_comment = False
                i += 2
            else:
                i += 1
            continue
        if in_string:
            if ch == '\\':
                escaped = True
            elif ch == string_char:
                in_string = False
                string_char = None
            i += 1
            continue
        if ch == '/' and i + 1 < length:
            if code[i + 1] == '/':
                in_single_line_comment = True
                i += 2
                continue
            elif code[i + 1] == '*':
                in_multi_line_comment = True
                i += 2
                continue
        if ch in ('"', "'", '`'):
            in_string = True
            string_char = ch
            i += 1
            continue
        if ch == '{':
            open_braces += 1
        elif ch == '}':
            open_braces -= 1
        i += 1
    return open_braces


def repair_jsx(code: str) -> str:
    """
    Post-process LLM JSX output to ensure it is complete and balanced:
    1. Truncate at the last clean closing tag/brace if output was cut short.
    2. Close unbalanced curly braces so Babel can parse the file.
    3. Ensure the component function body is properly closed.
    """
    if not code:
        return code

    from backend.services.debug.debug_logger import DebugLogger
    db_logger = DebugLogger()

    orig_len = len(code)
    db_logger.log("JSX_REPAIR", "START", f"Original length: {orig_len} chars")

    clean_boundary_re = re.compile(
        r'^\s*(?:\);?|};?|/>|<\/\w[\w.]*>)\s*$', re.MULTILINE
    )
    lines = code.split('\n')
    last_clean = len(lines) - 1

    for i in range(len(lines) - 1, -1, -1):
        stripped = lines[i].strip()
        if not stripped:
            continue
        if clean_boundary_re.match(lines[i]) or stripped in ('}', ')', '};', ');', '/>'):
            last_clean = i
            break
        if "export default" in stripped:
            last_clean = len(lines) - 1
            break

    if last_clean < len(lines) - 1:
        db_logger.log("JSX_REPAIR", "TRUNCATION", f"Truncated from line {len(lines)} to {last_clean + 1}")
        lines = lines[:last_clean + 1]
        code = '\n'.join(lines)

    open_braces = count_unbalanced_braces(code)
    if open_braces > 0:
        code = code.rstrip()
        code += '\n' + '  ' * max(open_braces - 1, 0) + '\n'.join(['}'] * open_braces)
        db_logger.log("JSX_REPAIR", "BRACE_BALANCING", f"Added {open_braces} closing braces")

    last_meaningful = code.rstrip().splitlines()[-1].strip() if code.strip() else ''
    if last_meaningful not in ('}', '};'):
        if not last_meaningful.startswith("export default"):
            code = code.rstrip() + '\n}'
            db_logger.log("JSX_REPAIR", "PAGE_CLOSURE", "Appended function closing bracket }")

    final_code = code.strip()
    db_logger.log("JSX_REPAIR", "SUCCESS", f"Repaired length: {len(final_code)} chars (delta: {len(final_code) - orig_len})")
    return final_code


# ─── Public aliases (for tools that used the old _repair_* names) ─────────────
_repair_jsx = repair_jsx
_repair_json_escapes = repair_json_escapes
_repair_truncated_json = repair_truncated_json
_count_unbalanced_braces = count_unbalanced_braces
