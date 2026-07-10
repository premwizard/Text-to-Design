import json
import logging
from backend.app.services.ai_router import generate_ai
from backend.project_runner import cleanGeneratedCode

logger = logging.getLogger("backend.editing.jsx_patch_engine")

PATCH_SYSTEM_PROMPT = """You are a senior React + Tailwind CSS code editor.
You modify an existing file to apply visual and layout changes according to a critique plan.

Rules:
1. Modify ONLY the requested styling, classes, labels, content, or sub-components.
2. Keep the component name, exports, and React state parameters intact unless explicitly requested to change.
3. Preserve all Tailwind variables, fonts, and styling consistency.
4. Return ONLY the complete, corrected React component code.
5. Do NOT wrap your output in markdown code fences or explain the changes.
6. Do NOT import or use 'lucide-react-native'. Use standard 'lucide-react' for web icons.
7. Do NOT import or use 'react-router-dom', 'framer-motion', 'recharts', 'chart.js', or any external packages. For links/navigation, use standard <a> tags or state toggles, NOT <Link> or useNavigate.
"""

NEW_COMP_SYSTEM_PROMPT = """You are a React + Tailwind CSS component builder.
Generate a new visual section component from scratch.

Rules:
1. Choose typography, layout classes, background themes, and accents that harmoniously match the design metadata.
2. Use standard 'lucide-react' icons for visual interest. Do NOT use 'lucide-react-native'. CRITICAL: Do NOT use brand icons (Facebook, Twitter, Instagram, Linkedin, Github, etc.) as they do not exist. Use generic equivalents.
3. Do NOT import or use 'react-router-dom', 'framer-motion', 'recharts', 'chart.js', or any external packages. For links/navigation, use standard <a> tags or state toggles, NOT <Link> or useNavigate.
4. Make the component fully responsive.
5. Return ONLY the clean React component code.
6. Do NOT wrap your output in markdown code fences or explain the changes.
"""

class JSXPatchEngine:
    """
    Selectively modifies or creates React components to apply user edit requests.
    """
    
    def __init__(self):
        pass

    async def apply_patches(self, original_files: dict, edit_plan: dict, design_metadata: dict = None) -> dict:
        logger.info("Starting selective component patching...")
        
        patched_files = dict(original_files)
        affected = edit_plan.get("affectedComponents", [])
        changes = edit_plan.get("changes", [])
        changes_str = "\n".join(f"- {c}" for c in changes)
        
        # Keep track of generated components to handle mounts inside App.jsx
        new_mounts = []
        
        for file_path in affected:
            # Standardize paths
            clean_path = file_path.lstrip("/")
            
            if clean_path not in original_files:
                # 1. NEW COMPONENT CREATION
                logger.info(f"Component {clean_path} not found in existing files. Creating from scratch...")
                
                comp_name = Path(clean_path).stem
                new_mounts.append(comp_name)
                
                user_msg = (
                    f"Create a new component named {comp_name}.\n"
                    f"Component requirements: {changes_str}\n"
                    f"Design guidelines: {json.dumps(design_metadata or {})}"
                )
                
                try:
                    response = await generate_ai(
                        task_type="builder",
                        system_prompt=NEW_COMP_SYSTEM_PROMPT,
                        user_prompt=user_msg,
                        temperature=0.3,
                        stream=False
                    )
                    code = response.choices[0].message.content.strip()
                    cleaned_code = cleanGeneratedCode(code)
                    if not cleaned_code or len(cleaned_code.strip()) < 30:
                        raise ValueError(f"Generated new component '{clean_path}' is empty or too short.")
                    patched_files[clean_path] = cleaned_code
                    logger.info(f"Created new component {clean_path}")
                except Exception as exc:
                    logger.error(f"Failed to build new component {clean_path}: {exc}")
                    raise exc
                    
            else:
                # 2. PATCH EXISTING COMPONENT
                logger.info(f"Patching existing component file: {clean_path}")
                current_code = original_files[clean_path]
                
                user_msg = (
                    f"Original Component Code:\n{current_code}\n\n"
                    f"Requested Edits:\n{changes_str}\n\n"
                    f"Output the updated component code."
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
                    if not cleaned_code or len(cleaned_code.strip()) < 30 or ("export default" not in cleaned_code and "export " not in cleaned_code):
                        logger.warning(f"Patch Engine returned empty or malformed code for '{clean_path}'. Keeping original code.")
                    else:
                        patched_files[clean_path] = cleaned_code
                    logger.info(f"Patched component {clean_path}")
                except Exception as exc:
                    logger.error(f"Failed to patch component {clean_path}: {exc}")
                    
        # 3. AUTO-MOUNT NEW SECTIONS IN App.jsx
        if new_mounts and "App.jsx" in patched_files:
            logger.info("Integrating new components inside App.jsx routing...")
            app_code = patched_files["App.jsx"]
            
            mount_changes = [
                f"Import the newly created components: {', '.join(new_mounts)}.",
                "Mount/render the components inside the main layout block of App."
            ]
            
            user_msg = (
                f"Original App.jsx Code:\n{app_code}\n\n"
                f"Required Modifications:\n" + "\n".join(f"- {m}" for m in mount_changes) + "\n\n"
                "Output the updated App.jsx code."
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
                if not cleaned_code or len(cleaned_code.strip()) < 30:
                    raise ValueError("App.jsx mount generation returned empty or invalid code.")
                patched_files["App.jsx"] = cleaned_code
                logger.info("Successfully updated App.jsx mounts.")
            except Exception as exc:
                logger.error(f"Failed to auto-mount components in App.jsx: {exc}")
                raise exc
                
        return patched_files
from pathlib import Path
