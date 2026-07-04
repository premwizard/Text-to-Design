import logging
import re
from backend.app.services.ai_router import generate_ai

logger = logging.getLogger("backend.app.agents.full_app_generation")

SYSTEM_PROMPT = """You are a master React + Tailwind CSS developer.
Generate the complete React application in a single response based on the design plan.

You must output the raw code for ALL files using the exact following format separator.
Do NOT wrap the response in markdown code fences or JSON.

Required format:
===FILE: App.jsx===
import React from 'react';
import Navbar from './components/Navbar';
...

===FILE: components/Navbar.jsx===
...

===FILE: components/HeroSection.jsx===
...
Layout Context:
- Brand Name: {product_name}
- Hero Tagline: {tagline}
- Visual Style: {visual_style}
- Theme: {theme}
- Primary Accent Color: {primary_color}
- Background Color: {bg_color}
- Text Color: {text_color}
- Heading Font: {font_heading} (URL name: {font_heading_url})
- Body Font: {font_body} (URL name: {font_body_url})

━━━ RETRIEVED DESIGN SYSTEM RULES ━━━
- Spacing Level: {spacing}
- Border Radius: {border_radius}
- Shadow Level: {shadow}
- Border Details: {border}

━━━ DEVELOPMENT GUIDELINES ━━━
- Generate ONLY standard React web components for Vite.
- Allowed libraries: react, lucide-react, react-router-dom (CRITICAL: Always use <HashRouter> instead of <BrowserRouter>. Avoid BrowserRouter completely.)
- App.jsx must import fonts and apply global styles via <style> tag.
- Apply mobile-first responsive Tailwind classes (sm:, md:, lg:).
- Design it with a premium visual feel, leveraging nice hover states and subtle gradients.
- Make all key elements interactive using standard React useState where appropriate.

Components to generate:
{components_list}
"""

AUTO_FIX_PROMPT = """You are an expert React + Tailwind code validator and repair agent.
The generated code failed syntax/import validation.

━━━ VALIDATION ERRORS ━━━
{error_context}

Output the raw code for ONLY the repaired versions of the broken files using the exact following format separator.
Do NOT output files that are not listed in the errors.
Do NOT wrap the response in markdown code fences or JSON.

Required format:
===FILE: components/BrokenComponent.jsx===
import React from 'react';
...
"""

async def run_full_app_generation(design_plan: dict, rag_json: dict, event_callback=None) -> dict:
    """
    Generates all components and App.jsx in a single LLM call.
    Returns a dict mapping filenames to their raw code content.
    """
    logger.info("Executing Full App Generation (Single Call)")
    
    from backend.app.services.debug.debug_logger import DebugLogger
    db_logger = DebugLogger()
    
    layout = design_plan.get("layout", {})
    styling = design_plan.get("styling", {})
    rules = rag_json.get("designRules", {})
    
    main_sections = layout.get("mainSections", [])
    planned_components = []
    if layout.get("navbar") == "top":
        planned_components.append("Navbar")
    if layout.get("sidebar") in ["left", "right"]:
        planned_components.append("Sidebar")
    for sec in main_sections:
        if sec not in planned_components:
            planned_components.append(sec)
            
    batches = []
    current_batch = ["App.jsx"]
    for comp in planned_components:
        current_batch.append(f"components/{comp}.jsx")
        if len(current_batch) >= 3:
            batches.append(current_batch)
            current_batch = []
    if current_batch:
        batches.append(current_batch)
        
    font_heading = styling.get("font_heading", "Space Grotesk")
    font_body = styling.get("font_body", "Inter")
    
    async def generate_batch(batch_idx, batch_files):
        components_list_str = "\n".join(batch_files)
        sys_prompt = SYSTEM_PROMPT.format(
            product_name=design_plan.get("productName", "App"),
            tagline=design_plan.get("tagline", ""),
            spacing=rules.get("spacing", "comfortable"),
            border_radius=rules.get("borderRadius", "xl"),
            shadow=rules.get("shadow", "medium"),
            border=rules.get("border", "none"),
            visual_style=rag_json.get("styleMatched", "modern"),
            theme=styling.get("aesthetic", "premium dark"),
            primary_color=styling.get("primary_color", "violet"),
            bg_color=styling.get("bg_color", "bg-zinc-950"),
            text_color=styling.get("text_color", "text-zinc-100"),
            font_heading=font_heading,
            font_heading_url=font_heading.replace(" ", "+"),
            font_body=font_body,
            font_body_url=font_body.replace(" ", "+"),
            components_list=components_list_str
        )
        
        token_count = len(sys_prompt) // 4
        logger.info(f"Batch {batch_idx+1} ({len(batch_files)} files) prompt size: ~{token_count} tokens")
        
        response = await generate_ai(
            task_type="full_app_generator",
            system_prompt=sys_prompt,
            user_prompt="Generate the requested React components.",
            temperature=0.7,
            stream=False
        )
        
        output_text = response.choices[0].message.content.strip()
        logger.debug(f"Batch {batch_idx+1} raw model response: {output_text[:500]}...")

        import re
        file_pattern = re.compile(r"===FILE:\s*(.+?)\s*===\n(.*?)(?=\n===FILE:|$)", re.DOTALL)
        matches = file_pattern.findall(output_text)

        batch_valid_files = {}
        for filename, content in matches:
            clean_name = filename.strip()
            clean_content = content.strip()
            clean_content = re.sub(r'^```(?:jsx|javascript|js|tsx|ts)?\s*\n?', '', clean_content, flags=re.IGNORECASE)
            clean_content = re.sub(r'\n?```\s*$', '', clean_content)
            clean_content = clean_content.strip()
            if clean_name and "\n" not in clean_name:
                batch_valid_files[clean_name] = clean_content
        return batch_valid_files

    db_logger.log("GENERATION", "MULTI_CALL_START", f"Processing {len(planned_components) + 1} files in {len(batches)} batches.")
    
    import asyncio
    tasks = [generate_batch(idx, batch) for idx, batch in enumerate(batches)]
    results = await asyncio.gather(*tasks, return_exceptions=True)
    
    valid_files = {}
    warnings = []
    for idx, res in enumerate(results):
        if isinstance(res, Exception):
            logger.error(f"Batch {idx+1} failed: {res}")
            warnings.append(f"Batch {idx+1} failed to generate.")
        else:
            valid_files.update(res)

    if "App.jsx" not in valid_files:
        warning_msg = "App.jsx is missing from the generated files."
        logger.warning(warning_msg)
        warnings.append(warning_msg)
            
    db_logger.log("GENERATION", "MULTI_CALL_COMPLETE", f"Generated {len(valid_files)} files.")
    return {
        "success": True,
        "files": valid_files,
        "errors": [],
        "warnings": warnings
    }

async def run_auto_fix_generation(broken_files: dict, validation_errors: list) -> dict:
    """
    Given a dict of broken files and a list of error objects,
    asks the LLM to fix ONLY the broken files.
    Returns a dict of filename -> repaired code.
    """
    logger.info("Executing Auto-Fix for broken files")
    
    from backend.app.services.debug.debug_logger import DebugLogger
    db_logger = DebugLogger()
    
    error_context = ""
    for err in validation_errors:
        fname = err.get("file")
        etype = err.get("type")
        msg = err.get("message")
        error_context += f"- File: {fname} | Error: {etype} | Details: {msg}\n"
        
    user_prompt = "Here is the broken code:\n\n"
    for fname, code in broken_files.items():
        user_prompt += f"--- {fname} ---\n{code}\n\n"
        
    sys_prompt = AUTO_FIX_PROMPT.format(error_context=error_context)
    
    db_logger.log("GENERATION", "AUTO_FIX_START", f"Fixing {len(broken_files)} files with {len(validation_errors)} errors.")
    
    response = await generate_ai(
        task_type="auto_fix_generator",
        system_prompt=sys_prompt,
        user_prompt=user_prompt,
        temperature=0.3, # lower temp for fixes
        stream=False
    )
    
    output_text = response.choices[0].message.content.strip()
    logger.debug(f"[AutoFix] Raw model response: {output_text[:500]}...")
    
    file_pattern = re.compile(r"===FILE:\s*(.+?)\s*===\n(.*?)(?=\n===FILE:|$)", re.DOTALL)
    matches = file_pattern.findall(output_text)
    
    if not matches:
        error_msg = "No files found in auto-fix output. Expected ===FILE: filename=== format."
        logger.error(error_msg)
        logger.error(f"Raw output that failed parsing:\n{output_text}")
        raise ValueError(error_msg)
        
    repaired_files = {}
    for filename, content in matches:
        clean_name = filename.strip()
        clean_content = content.strip()
        
        # Clean any markdown fences inside the block
        clean_content = re.sub(r'^```(?:jsx|javascript|js|tsx|ts)?\s*\n?', '', clean_content, flags=re.IGNORECASE)
        clean_content = re.sub(r'\n?```\s*$', '', clean_content)
        clean_content = clean_content.strip()
        
        if clean_name and "\n" not in clean_name:
            repaired_files[clean_name] = clean_content
            
    db_logger.log("GENERATION", "AUTO_FIX_COMPLETE", f"Repaired {len(repaired_files)} files.")
    return repaired_files
    