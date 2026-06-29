import json
import logging
import re
from backend.services.ai_router import generate_ai

logger = logging.getLogger("backend.agents.full_app_generation")

SYSTEM_PROMPT = """You are a master React + Tailwind CSS developer.
Generate the complete React application in a single response based on the design plan.

You must output a single JSON object containing ALL files. The keys are the file paths, and the values are the raw code content.
Do NOT use markdown fences or explanations. Output ONLY valid JSON.

Required format:
{
  "App.jsx": "import React from 'react';\\nimport Navbar from './components/Navbar';\\n...",
  "components/Navbar.jsx": "...",
  "components/HeroSection.jsx": "..."
}

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
- Allowed libraries: react, lucide-react, react-router-dom
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

Output a JSON object containing ONLY the repaired versions of the broken files.
Do NOT output files that are not listed in the errors.

Required format:
{
  "components/BrokenComponent.jsx": "import React from 'react';\\n..."
}
"""

async def run_full_app_generation(design_plan: dict, rag_json: dict) -> dict:
    """
    Generates all components and App.jsx in a single LLM call.
    Returns a dict mapping filenames to their raw code content.
    """
    logger.info("Executing Full App Generation (Single Call)")
    
    from backend.services.debug.debug_logger import DebugLogger
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
            
    components_list_str = "App.jsx\n" + "\n".join([f"components/{c}.jsx" for c in planned_components])
    
    font_heading = styling.get("font_heading", "Space Grotesk")
    font_body = styling.get("font_body", "Inter")
    
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
    
    db_logger.log("GENERATION", "SINGLE_CALL_START", f"Components: {components_list_str}")
    
    response = await generate_ai(
        task_type="full_app_generator",
        system_prompt=sys_prompt,
        user_prompt="Generate the full React application.",
        temperature=0.7,
        stream=False
    )
    
    output_text = response.choices[0].message.content.strip()
    
    # Clean any backticks
    if output_text.startswith("```"):
        output_text = re.sub(r'^```(?:json)?\s*\n?', '', output_text, flags=re.IGNORECASE)
        output_text = re.sub(r'\n?```\s*$', '', output_text)
        output_text = output_text.strip()
        
    start_idx = output_text.find('{')
    end_idx = output_text.rfind('}')
    
    if start_idx != -1 and end_idx != -1:
        json_str = output_text[start_idx:end_idx+1]
        try:
            files = json.loads(json_str)
            db_logger.log("GENERATION", "SINGLE_CALL_COMPLETE", f"Generated {len(files)} files.")
            return files
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse generation JSON: {e}")
            raise ValueError("Invalid JSON output from model")
    else:
        raise ValueError("No JSON object found in model output")

async def run_auto_fix_generation(broken_files: dict, validation_errors: list) -> dict:
    """
    Given a dict of broken files and a list of error objects,
    asks the LLM to fix ONLY the broken files.
    Returns a dict of filename -> repaired code.
    """
    logger.info("Executing Auto-Fix for broken files")
    
    from backend.services.debug.debug_logger import DebugLogger
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
    
    if output_text.startswith("```"):
        output_text = re.sub(r'^```(?:json)?\s*\n?', '', output_text, flags=re.IGNORECASE)
        output_text = re.sub(r'\n?```\s*$', '', output_text)
        output_text = output_text.strip()
        
    start_idx = output_text.find('{')
    end_idx = output_text.rfind('}')
    
    if start_idx != -1 and end_idx != -1:
        json_str = output_text[start_idx:end_idx+1]
        try:
            repaired_files = json.loads(json_str)
            db_logger.log("GENERATION", "AUTO_FIX_COMPLETE", f"Repaired {len(repaired_files)} files.")
            return repaired_files
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse auto-fix JSON: {e}")
            raise ValueError("Invalid JSON output from fix model")
    else:
        raise ValueError("No JSON object found in auto-fix output")
