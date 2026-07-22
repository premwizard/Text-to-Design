import json
import logging
from backend.app.services.ai_router import generate_ai
from backend.project_runner import cleanGeneratedCode

logger = logging.getLogger("backend.editing.jsx_patch_engine")

PATCH_SYSTEM_PROMPT = """You are a senior HTML5, Vanilla CSS, and Vanilla JS code editor.
You modify static web files (index.html, style.css, script.js) to apply visual and layout changes according to user requests.

Rules:
1. Modify ONLY the requested styling, HTML sections, content, or JavaScript functions.
2. Keep semantic HTML5 structure, CSS variables, and Vanilla JS interactivity intact.
3. Return ONLY the complete, corrected file code.
4. Do NOT wrap your output in markdown code fences or explain the changes.
5. Do NOT use React, JSX, Tailwind, Bootstrap, or any external framework packages.
"""

NEW_COMP_SYSTEM_PROMPT = """You are a Web Developer building a static website section.
Generate an HTML section and matching Vanilla CSS styles.

Rules:
1. Choose typography, layout classes, background themes, and accents matching the design metadata.
2. Use inline SVG or Unicode icons.
3. Make the section fully responsive.
4. Return ONLY clean HTML / CSS.
5. Do NOT wrap your output in markdown code fences.
"""

class JSXPatchEngine:
    """
    Selectively modifies or creates static web files to apply user edit requests.
    """
    
    def __init__(self):
        pass

    async def apply_patches(self, original_files: dict, edit_plan: dict, design_metadata: dict = None) -> dict:
        logger.info("Starting selective component patching...")
        
        patched_files = dict(original_files)
        affected = edit_plan.get("affectedComponents", [])
        changes = edit_plan.get("changes", [])
        changes_str = "\n".join(f"- {c}" for c in changes)
        
        # Default to patching index.html, style.css, or script.js
        target_files = [f for f in affected if f in original_files]
        if not target_files:
            target_files = [k for k in ["index.html", "style.css", "script.js"] if k in original_files]
            
        for file_path in target_files:
            clean_path = file_path.lstrip("/")
            logger.info(f"Patching file: {clean_path}")
            current_code = original_files.get(clean_path, "")
            
            user_msg = (
                f"File: {clean_path}\n"
                f"Original Code:\n{current_code}\n\n"
                f"Requested Edits:\n{changes_str}\n\n"
                f"Output the complete updated file code."
            )
            
            try:
                response = await generate_ai(
                    task_type="editor",
                    system_prompt=PATCH_SYSTEM_PROMPT,
                    user_prompt=user_msg,
                    temperature=0.2,
                    stream=False
                )
                code = response.choices[0].message.content.strip()
                cleaned_code = cleanGeneratedCode(code)
                if len(cleaned_code.strip()) > 10:
                    patched_files[clean_path] = cleaned_code
                logger.info(f"Patched file {clean_path}")
            except Exception as exc:
                logger.error(f"Failed to patch file {clean_path}: {exc}")
                
        return patched_files
from pathlib import Path
