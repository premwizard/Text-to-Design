import json
import logging
from backend.services.ai_router import generate_ai

logger = logging.getLogger("backend.agents.component_generation")

def escape_json_chunk(text: str) -> str:
    """Escapes raw text chunk so it can be safely appended inside a JSON string value."""
    return json.dumps(text)[1:-1]

COMPONENT_SYSTEM_PROMPT = """You are a master React + Tailwind CSS component developer.
Generate the complete JSX code for a single component: '{component_name}'.

Layout Context:
- Brand Name: {product_name}
- Hero Tagline: {tagline}
- Spacing: {spacing}
- Border Radius: {border_radius}
- Visual Style: {visual_style}
- Theme: {theme}
- Primary Accent Color: {primary_color} (use Tailwind classes like bg-{primary_color}-600, text-{primary_color}-400, hover:bg-{primary_color}-700)
- Font: {font_body}

━━━ DEVELOPMENT GUIDELINES ━━━
- Output ONLY the complete, ready-to-import JSX code.
- Do NOT wrap code in markdown blocks (no ```jsx or ```).
- Do NOT output any explanations, TODOs, comments, or header text.
- Start directly with the imports: e.g. import React from 'react';
- Use lucide-react icons for visual decoration.
- Ensure the component is responsive (use mobile-first Tailwind prefixes: sm:, md:, lg:).
- Design it with a premium visual feel, leveraging nice hover states and subtle gradients.
- Make all key elements interactive (tabs, menu collapses, accordions, form inputs) using standard React useState.
- Do NOT import other files; if you need dummy sub-elements, define them locally inside this component.

Previous components created so far:
{previous_components}
"""

APP_SYSTEM_PROMPT = """You are a React developer. Generate the root 'App.jsx' file that integrates the generated layout components.

Layout Details:
- Sidebar Position: {sidebar}
- Navbar Position: {navbar}
- Brand Name: {product_name}
- Background color: {bg_color}
- Default text color: {text_color}
- Heading Font: {font_heading}
- Body Font: {font_body}
- Heading Font URL name: {font_heading_url}
- Body Font URL name: {font_body_url}

Sections to import and render:
{sections_import_list}

━━━ APP RULES ━━━
- Output ONLY the complete root App.jsx code. Do NOT wrap in markdown fences or include explanations.
- Import all layout components correctly using relative paths:
  e.g., import Navbar from './components/Navbar';
        import HeroSection from './components/HeroSection';
- App.jsx MUST:
  1. Render a style block at the top containing font imports:
     <style>{{`
       @import url('https://fonts.googleapis.com/css2?family={font_heading_url}:wght@300;400;500;600;700;800&family={font_body_url}:wght@300;400;500;600&display=swap');
       body {{ font-family: '{font_body}', sans-serif; }}
       h1, h2, h3, h4, h5, h6 {{ font-family: '{font_heading}', sans-serif; }}
     `}}</style>
  2. Implement the layout structure. If sidebar is 'left', place the Sidebar component and a main content container side-by-side:
     <div className="flex min-h-screen bg-slate-950 text-white">
       <Sidebar />
       <div className="flex-1 flex flex-col">
         <Navbar />
         <main className="flex-1">
           {{/* mainSections go here in order */}}
         </main>
       </div>
     </div>
  3. Apply the root background ({bg_color}) and text color ({text_color}) classes.
"""

async def generate_component_stream(
    component_name: str,
    design_plan: dict,
    previous_components: dict
):
    """
    Calls the AI router to stream a single React component, yielding chunks of content.
    """
    logger.info(f"Generating component: {component_name}")
    
    styling = design_plan.get("styling", {})
    prev_summary = ""
    for name, code in previous_components.items():
        prev_summary += f"- {name}: Exports default component {name}\n"
        
    sys_prompt = COMPONENT_SYSTEM_PROMPT.format(
        component_name=component_name,
        product_name=design_plan.get("productName", "App"),
        tagline=design_plan.get("tagline", ""),
        spacing=design_plan.get("spacing", "comfortable"),
        border_radius=design_plan.get("borderRadius", "large"),
        visual_style=design_plan.get("visualStyle", "modern"),
        theme=design_plan.get("theme", "premium dark"),
        primary_color=styling.get("primary_color", "violet"),
        font_body=styling.get("font_body", "Inter"),
        previous_components=prev_summary or "None"
    )
    
    stream = generate_ai(
        task_type="component_generator",
        system_prompt=sys_prompt,
        user_prompt=f"Generate the JSX file content for {component_name}",
        temperature=0.7,
        stream=True
    )
    
    async for chunk in stream:
        if isinstance(chunk, dict):
            continue
        content = chunk.choices[0].delta.content if hasattr(chunk, "choices") else None
        if content:
            yield content

async def generate_app_stream(
    design_plan: dict,
    components_list: list[str]
):
    """
    Calls AI router to stream App.jsx incorporating the planned layout and styling.
    """
    logger.info("Generating App.jsx root container")
    
    layout = design_plan.get("layout", {})
    styling = design_plan.get("styling", {})
    
    sections_import_list = ""
    for c in components_list:
        sections_import_list += f"- {c} (import {c} from './components/{c}')\n"
        
    font_heading = styling.get("font_heading", "Space Grotesk")
    font_body = styling.get("font_body", "Inter")
    
    sys_prompt = APP_SYSTEM_PROMPT.format(
        sidebar=layout.get("sidebar", "none"),
        navbar=layout.get("navbar", "top"),
        product_name=design_plan.get("productName", "App"),
        bg_color=styling.get("bg_color", "bg-zinc-950"),
        text_color=styling.get("text_color", "text-zinc-100"),
        font_heading=font_heading,
        font_body=font_body,
        font_heading_url=font_heading.replace(" ", "+"),
        font_body_url=font_body.replace(" ", "+"),
        sections_import_list=sections_import_list
    )
    
    stream = generate_ai(
        task_type="app_generator",
        system_prompt=sys_prompt,
        user_prompt="Generate the root App.jsx layout file",
        temperature=0.3,
        stream=True
    )
    
    async for chunk in stream:
        if isinstance(chunk, dict):
            continue
        content = chunk.choices[0].delta.content if hasattr(chunk, "choices") else None
        if content:
            yield content
