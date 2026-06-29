import re
import logging
from typing import Dict, Any

from backend.services.debug.debug_logger import DebugLogger
from backend.services.validators.import_validator import FORBIDDEN_IMPORTS, ALLOWED_IMPORTS

logger = logging.getLogger("backend.agents.sanitizer")
db_logger = DebugLogger()

def remove_markdown(code: str) -> str:
    """Removes ```jsx, ```javascript, and closing ``` from code."""
    if not code:
        return code
    code = re.sub(r'^```[a-zA-Z]*\n?', '', code.strip(), flags=re.IGNORECASE)
    code = re.sub(r'\n?```\s*$', '', code)
    return code.strip()

def normalize_escapes(code: str) -> str:
    """Normalizes corrupted newlines or escaped strings."""
    if not code:
        return code
    # Sometimes LLM yields literal '\\n' instead of actual newline
    code = code.replace('\\n', '\n')
    # Remove literal backslashes escaping quotes if they aren't part of a valid escape sequence
    code = code.replace('\\"', '"')
    code = code.replace("\\'", "'")
    return code

def clean_imports(code: str, available_files: list[str]) -> str:
    """
    Strips forbidden library imports.
    Removes imports for local files that do not exist in available_files.
    Cleans up lucide-react imports to allow only likely valid PascalCase icons.
    """
    if not code:
        return code
        
    lines = code.split('\n')
    cleaned_lines = []
    
    for line in lines:
        line_stripped = line.strip()
        
        # Only process import lines
        if not line_stripped.startswith("import "):
            cleaned_lines.append(line)
            continue
            
        # 1. Check for forbidden imports
        is_forbidden = False
        for forbidden in FORBIDDEN_IMPORTS:
            if forbidden in line:
                is_forbidden = True
                break
        if is_forbidden:
            continue
            
        # 2. Check for unsupported 3rd party libraries
        # Extract the package name
        match = re.search(r'from\s+[\'"]([^\'"]+)[\'"]', line)
        if match:
            pkg = match.group(1)
            # Not local, not explicitly allowed
            if not pkg.startswith("."):
                is_allowed = False
                for allowed in ALLOWED_IMPORTS:
                    if pkg == allowed or pkg.startswith(allowed + "/"):
                        is_allowed = True
                        break
                if not is_allowed:
                    continue # Drop unsupported package import
                    
            # 3. Handle local imports (must exist in available_files)
            if pkg.startswith("."):
                # E.g. "./components/Button" -> "components/Button.jsx"
                # This is heuristic, but generally correct for our flat or single-depth structure
                pkg_normalized = pkg.replace("./", "")
                if pkg_normalized.startswith("../"):
                    pkg_normalized = pkg_normalized.replace("../", "")
                    
                # Check if file exists (with or without .jsx)
                exists = False
                for av_file in available_files:
                    if pkg_normalized in av_file or av_file.startswith(pkg_normalized):
                        exists = True
                        break
                        
                if not exists:
                    # File doesn't exist, remove import
                    continue
                    
            # 4. Handle lucide-react icon validation
            if pkg == "lucide-react":
                # Extract icons: import { IconA, IconB } from 'lucide-react'
                icons_match = re.search(r'\{([^}]+)\}', line)
                if icons_match:
                    icons_str = icons_match.group(1)
                    icons = [i.strip() for i in icons_str.split(',')]
                    
                    # Heuristic: Valid icons are PascalCase
                    valid_icons = []
                    for icon in icons:
                        if not icon: continue
                        if re.match(r'^[A-Z][a-zA-Z0-9]*$', icon):
                            if icon not in ['FakeIcon', 'Icon', 'ReactLogo']:
                                valid_icons.append(icon)
                            
                    if not valid_icons:
                        continue # No valid icons left, drop the import
                        
                    # Reconstruct import line
                    line = f"import {{ {', '.join(valid_icons)} }} from 'lucide-react';"
                    
        cleaned_lines.append(line)
        
    return '\n'.join(cleaned_lines)

def clean_tailwind_classes(code: str) -> str:
    """
    Searches for className="..." strings and cleans up malformed Tailwind classes.
    Also repairs severely broken font class strings like `"DM_Sans']` -> ` font-['DM_Sans']`.
    """
    # 1. Repair broken quotes around bracketed classes (e.g., LLM outputs "DM_Sans'] instead of font-['DM_Sans'])
    # Example broken: className="... py-32"DM_Sans'] bg-..."
    # We look for a quote immediately followed by text and bracket `']`, and change the quote to space + `font-['`
    code = re.sub(r'\"([a-zA-Z0-9_]+)\'\]', r" font-['\1']", code)
    
    # 2. Repair missing quotes at end of className: className="abc def> -> className="abc def">
    # This is tricky without a full parser, but we can do a naive check in heuristic repair instead.

    def replacer(match):
        class_str = match.group(1)
        # Remove duplicate spaces
        classes = re.sub(r'\s+', ' ', class_str).strip().split(' ')
        valid_classes = []
        
        for c in classes:
            # Remove obviously broken classes like 'text-white-' or '-[100px' (missing brackets)
            if c.endswith('-'):
                continue
            if '[' in c and ']' not in c:
                continue
            if ']' in c and '[' not in c:
                continue
            valid_classes.append(c)
            
        # De-duplicate while preserving order
        seen = set()
        unique_classes = []
        for c in valid_classes:
            if c not in seen:
                seen.add(c)
                unique_classes.append(c)
                
        return f'className="{ " ".join(unique_classes) }"'

    return re.sub(r'className=["\']([^"\']*)["\']', replacer, code)

def heuristic_jsx_repair(code: str) -> str:
    """
    Attempts to fix severely truncated JSX by appending closing tags/braces.
    """
    if not code: return code
    
    # 1. Check if it's abruptly cut off in the middle of a className string
    open_quotes = code.count('"')
    if open_quotes % 2 != 0:
        code += '"'
        
    # 2. Check for missing closing tags. Very basic heuristic.
    open_divs = code.count('<div')
    close_divs = code.count('</div')
    if open_divs > close_divs:
        code += "\n" + "</div>\n" * (open_divs - close_divs)
        
    open_braces = code.count('{')
    close_braces = code.count('}')
    if open_braces > close_braces:
        code += "\n" + "}\n" * (open_braces - close_braces)
        
    return code

async def run_code_sanitization(files: Dict[str, str]) -> Dict[str, str]:
    """
    Runs the full sanitization pipeline on generated files.
    """
    sanitized_files = {}
    available_filenames = list(files.keys())
    
    for filename, code in files.items():
        original_code = code
        try:
            # 1. Remove markdown
            code = remove_markdown(code)
            
            # 2. Normalize escapes
            code = normalize_escapes(code)
            
            # 3. Clean imports
            code = clean_imports(code, available_filenames)
            
            # 4. Clean Tailwind
            code = clean_tailwind_classes(code)
            
            # 5. Heuristic repair
            code = heuristic_jsx_repair(code)
            
            sanitized_files[filename] = code
        except Exception as e:
            logger.error(f"Failed to sanitize {filename}: {e}")
            sanitized_files[filename] = original_code
            
    db_logger.log("SANITIZATION", "COMPLETE", f"Sanitized {len(sanitized_files)} files.")
    return sanitized_files
