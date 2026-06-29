import re
import logging

logger = logging.getLogger("backend.validators.import_validator")

FORBIDDEN_IMPORTS = ["react-native", "lucide-react-native", "next/", "expo", "@react-navigation"]

def validate_imports(code: str, filename: str) -> tuple[bool, str]:
    """
    Checks the code for any forbidden framework/library imports.
    Returns (True, "") if imports are valid, or (False, error_message) if forbidden imports are found.
    """
    if not code:
        return True, ""
        
    # Extract import sources. In ES6 imports:
    # 1 & 2: Match from clauses: from 'source'
    from_matches = re.findall(r'\bfrom\s+[\'"]([^\'"]+)[\'"]', code)
    
    # 3: Match direct imports: import 'source' or import "source"
    direct_matches = re.findall(r'\bimport\s+[\'"]([^\'"]+)[\'"]', code)
    
    all_imports = set(from_matches + direct_matches)
    
    for imp in all_imports:
        for forbidden in FORBIDDEN_IMPORTS:
            if imp == forbidden or imp.startswith(forbidden):
                error_msg = f"Unsupported import detected: {forbidden} in {filename}"
                logger.error(error_msg)
                return False, error_msg
                
    return True, ""
