import logging
from typing import Dict, Any

from backend.services.ai_router import generate_ai
from backend.services.debug.debug_logger import DebugLogger
from backend.prompts import FIX_SYSTEM_PROMPT

logger = logging.getLogger("backend.agents.auto_fixer")
db_logger = DebugLogger()

async def run_auto_fixer(files: Dict[str, str], errors: list[Dict[str, str]]) -> Dict[str, str]:
    """
    Takes the generated files and the list of errors.
    Uses AI to fix the broken files and returns the updated files dict.
    """
    if not errors:
        return files
        
    db_logger.log("AUTO_FIXER", "START", f"Fixing {len(errors)} errors...")
    
    fixed_files = files.copy()
    
    for error_obj in errors:
        filename = error_obj["filename"]
        error_msg = error_obj["error"]
        
        broken_code = files.get(filename, "")
        if not broken_code:
            continue
            
        logger.info(f"Auto-fixing {filename} due to error: {error_msg}")
        
        prompt = f"""
You are an expert React + Tailwind Developer. The following file failed validation:
Filename: {filename}
Error Message: {error_msg}

Here is the broken code:
```jsx
{broken_code}
```

Fix the code to resolve the error. 
RULES:
1. Return ONLY the raw JSX code.
2. DO NOT use Markdown code fences (e.g. no ```jsx).
3. Do not include any explanations.
4. Ensure all syntax is correct and tags are matched.
5. If the error mentions a forbidden import, replace it with an allowed equivalent (lucide-react) or remove it.
"""

        try:
            fixed_code = await generate_ai(
                task_type="auto_fixer",
                system_prompt=FIX_SYSTEM_PROMPT,
                user_prompt=prompt,
                temperature=0.4
            )
            
            # Clean up potential markdown blocks if the LLM disobeyed
            if "```" in fixed_code:
                import re
                fixed_code = re.sub(r'```[a-z]*\n?', '', fixed_code)
                fixed_code = fixed_code.replace('```', '')
                
            fixed_files[filename] = fixed_code
            db_logger.log("AUTO_FIXER", "SUCCESS", f"Repaired {filename}")
        except Exception as e:
            logger.error(f"Failed to auto-fix {filename}: {str(e)}")
            db_logger.log("AUTO_FIXER", "ERROR", f"Failed to fix {filename}: {str(e)}")
            
    return fixed_files
