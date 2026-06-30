import logging
from typing import Dict, Any

from backend.app.utils.validators.jsx_validator import validate_generated_code
from backend.app.services.debug.debug_logger import DebugLogger

logger = logging.getLogger("backend.app.agents.code_validator")
db_logger = DebugLogger()

async def run_code_validation(files: Dict[str, str]) -> Dict[str, Any]:
    """
    Validates all generated files using the pure Python stack-based JSX parser.
    Returns:
    {
        "valid": bool,
        "errors": [{"file": "App.jsx", "type": "UNCLOSED_TAG", "message": "..."}, ...]
    }
    """
    # Convert dict format to list format expected by jsx_validator
    # files is {"components/Hero.jsx": "code..."}
    files_list = [{"filename": fname, "content": code} for fname, code in files.items()]
    
    validation_result = validate_generated_code(files_list)
    
    is_valid = validation_result.get("valid", False)
    errors = validation_result.get("errors", [])
    
    if is_valid:
        db_logger.log("CODE_VALIDATION", "PASS", "All files passed validation.")
    else:
        err_msg = "\n".join([f"- [{e.get('file')}] {e.get('type')}: {e.get('message')}" for e in errors])
        db_logger.log("CODE_VALIDATION", "FAIL", err_msg)
        logger.warning(f"Code validation failed with {len(errors)} errors:\n{err_msg}")
        
    return {
        "valid": is_valid,
        "errors": errors
    }
