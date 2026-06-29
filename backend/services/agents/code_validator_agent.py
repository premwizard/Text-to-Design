import logging
import re
from typing import Dict, Any

from backend.services.validators.import_validator import validate_imports
from backend.services.debug.debug_logger import DebugLogger

logger = logging.getLogger("backend.agents.code_validator")
db_logger = DebugLogger()

def validate_component_syntax(code: str) -> str:
    """
    Returns an error message if the JSX code is obviously truncated or malformed,
    otherwise returns an empty string.
    """
    if not code or len(code.strip()) == 0:
        return "File is completely empty."
        
    if "```" in code:
        return "File contains Markdown code fences (```). Files must contain ONLY raw code."
        
    # Check for basic matching braces and tags (very simplistic heuristic for truncation)
    open_braces = code.count('{')
    close_braces = code.count('}')
    if open_braces > close_braces:
        return f"Mismatched braces: {open_braces} open, {close_braces} close. Code might be truncated."
        
    if "export default" not in code:
        return "Missing 'export default'. Every React component must have a default export."
        
    return ""

async def run_code_validation(files: Dict[str, str]) -> Dict[str, Any]:
    """
    Validates all generated files.
    Returns:
    {
        "valid": bool,
        "errors": [{"filename": "App.jsx", "error": "Missing export default"}, ...]
    }
    """
    errors = []
    
    for filename, code in files.items():
        # Check imports
        is_valid_imports, import_error = validate_imports(code, filename)
        if not is_valid_imports:
            errors.append({"filename": filename, "error": import_error})
            
        # Check syntax and truncation
        syntax_error = validate_component_syntax(code)
        if syntax_error:
            errors.append({"filename": filename, "error": syntax_error})
            
    is_valid = len(errors) == 0
    
    if is_valid:
        db_logger.log("CODE_VALIDATION", "PASS", "All files passed validation.")
    else:
        err_msg = "\n".join([f"- {e['filename']}: {e['error']}" for e in errors])
        db_logger.log("CODE_VALIDATION", "FAIL", err_msg)
        logger.warning(f"Code validation failed with {len(errors)} errors:\n{err_msg}")
        
    return {
        "valid": is_valid,
        "errors": errors
    }
