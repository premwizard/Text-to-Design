import re
from typing import List, Dict, Tuple
from backend.app.core.logger.logger import get_logger

logger = get_logger()

ALLOWED_IMPORTS = {"react", "react-router-dom", "lucide-react"}
SELF_CLOSING_TAGS = {"img", "input", "br", "hr", "meta", "link"}

def validate_generated_code(files: List[Dict[str, str]]) -> dict:
    """
    Validates JSX files purely in Python using regex and stacks.
    Files format: [{"filename": "...", "content": "..."}]
    """
    all_errors = []
    
    for file in files:
        filename = file.get("filename", "unknown")
        content = file.get("content", "")
        
        errors = []
        
        # 1. Export Validation
        if not re.search(r'export\s+(default|const)\s+', content):
            errors.append({
                "file": filename,
                "type": "MISSING_EXPORT",
                "message": "Component must have 'export default' or 'export const'"
            })
            
        # 2. Import Validation
        imports = re.finditer(r'import\s+.*?from\s+[\'"](.*?)[\'"]', content)
        seen_imports = set()
        
        for match in imports:
            pkg = match.group(1)
            if pkg not in ALLOWED_IMPORTS and not pkg.startswith('.'):
                errors.append({
                    "file": filename,
                    "type": "INVALID_IMPORT",
                    "message": f"'{pkg}' is not allowed"
                })
            
            if pkg in seen_imports:
                errors.append({
                    "file": filename,
                    "type": "DUPLICATE_IMPORT",
                    "message": f"Duplicate import found for '{pkg}'"
                })
            seen_imports.add(pkg)
            
        # 3. Bracket Validation ((), {}, [])
        bracket_pairs = {')': '(', '}': '{', ']': '['}
        bracket_stack = []
        
        lines = content.split('\n')
        for i, line in enumerate(lines):
            for char in line:
                if char in "({[":
                    bracket_stack.append((char, i + 1))
                elif char in ")}]":
                    if not bracket_stack:
                        errors.append({
                            "file": filename,
                            "type": "UNMATCHED_BRACKET",
                            "message": f"Unmatched closing bracket '{char}' on line {i + 1}"
                        })
                    else:
                        top, line_num = bracket_stack.pop()
                        if top != bracket_pairs[char]:
                            errors.append({
                                "file": filename,
                                "type": "MISMATCHED_BRACKET",
                                "message": f"Mismatched bracket '{char}' on line {i + 1}. Expected match for '{top}' from line {line_num}"
                            })
                            
        for char, line_num in bracket_stack:
            errors.append({
                "file": filename,
                "type": "UNCLOSED_BRACKET",
                "message": f"Unclosed bracket '{char}' starting on line {line_num}"
            })
            
        # 4. Tag Validation (Stack-Based)
        # Removed: Regex cannot reliably parse JSX tags with arrow functions (e.g. onClick={() => {}})
        # which causes many false positive MISMATCHED_TAG errors.
            
        all_errors.extend(errors)
        
    # Calculate score
    score = 100
    if all_errors:
        score = max(0, 100 - (len(all_errors) * 10))  # arbitrary score drop per error
        
    result = {
        "valid": len(all_errors) == 0,
        "score": score,
        "errors": all_errors
    }
    
    if not result["valid"]:
        logger.bind(validation=True).warning(
            f"Validation failed with score {score} and {len(all_errors)} errors",
            extra={"errors": all_errors}
        )
    else:
        logger.bind(validation=True).info(f"Validation passed successfully (Score: {score})")
        
    return result
