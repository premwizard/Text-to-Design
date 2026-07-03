import re
import logging

logger = logging.getLogger("backend.app.utils.validators.import_validator")

FORBIDDEN_IMPORTS = ["react-native", "lucide-react-native", "next/", "expo", "@react-navigation", "@chakra-ui/", "styled-components", "mui", "antd"]
ALLOWED_IMPORTS = ["react", "react-dom", "react-router-dom", "lucide-react", "vite", "@vitejs/plugin-react"]

def validate_imports(code: str, filename: str) -> tuple[bool, str]:
    """
    Checks the code for any forbidden framework/library imports.
    Returns (True, "") if imports are valid, or (False, error_message) if forbidden imports are found.
    """
    if not code:
        return True, ""
        
    # Extract import sources. In ES6 imports:
    from_matches = re.findall(r'\bfrom\s+[\'"]([^\'"]+)[\'"]', code)
    direct_matches = re.findall(r'\bimport\s+[\'"]([^\'"]+)[\'"]', code)
    
    all_imports = set(from_matches + direct_matches)
    
    for imp in all_imports:
        # 1. Check against explicit forbidden list
        for forbidden in FORBIDDEN_IMPORTS:
            if imp == forbidden or imp.startswith(forbidden):
                error_msg = f"Unsupported import detected: {forbidden} in {filename}"
                logger.error(error_msg)
                return False, error_msg
                
        # 2. Check against allowed whitelist for external packages
        if not imp.startswith("."):
            is_allowed = False
            for allowed in ALLOWED_IMPORTS:
                if imp == allowed or imp.startswith(allowed + "/"):
                    is_allowed = True
                    break
            if not is_allowed:
                error_msg = f"Unsupported import detected: '{imp}' in {filename}. Only react, react-router-dom, and lucide-react are allowed."
                logger.error(error_msg)
                return False, error_msg
                
    return True, ""
