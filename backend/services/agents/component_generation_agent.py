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
- Visual Style: {visual_style}
- Theme: {theme}
- Primary Accent Color: {primary_color} (use Tailwind classes like bg-{primary_color}-600, text-{primary_color}-400, hover:bg-{primary_color}-700)
- Font: {font_body}

━━━ RETRIEVED DESIGN SYSTEM RULES ━━━
- Spacing Level: {spacing} (apply comfortable/loose/compact margins/paddings accordingly)
- Border Radius: {border_radius} (e.g., rounded-none, rounded-md, rounded-xl, rounded-2xl)
- Shadow Level: {shadow} (apply shadows like shadow-none, shadow-md, shadow-lg, shadow-2xl, or custom neon/heavy shadows matching style)
- Border Details: {border} (apply borders matching style: e.g., border border-zinc-800 or thick border-black)

━━━ DEVELOPMENT GUIDELINES ━━━
- Output ONLY the complete, ready-to-import JSX code.
- Do NOT wrap code in markdown blocks (no ```jsx or ```).
- Do NOT output any explanations, TODOs, comments, or header text.
- Start directly with the imports: e.g. import React from 'react';
- Generate ONLY standard React web components for Vite.
- Allowed libraries:
  * react
  * lucide-react
  * react-router-dom
- Forbidden imports:
  * react-native
  * lucide-react-native
  * next/*
  * expo
  * @react-navigation
- Rules:
  * Never generate React Native components
  * Never generate Next.js imports
  * Never use View, Text, Pressable, ScrollView
  * Use div, section, button, span instead
  * Use lucide-react for icons only
- Examples:
  * BAD: import {{ View, Text }} from 'react-native'
    GOOD: <div><span>Hello</span></div>
  * BAD: import Link from 'next/link'
    GOOD: import {{ Link }} from 'react-router-dom'
  * BAD: import {{ Home }} from 'lucide-react-native'
    GOOD: import {{ Home }} from 'lucide-react'
- Ensure the component is responsive (use mobile-first Tailwind prefixes: sm:, md:, lg:).
- Design it with a premium visual feel, leveraging nice hover states and subtle gradients.
- Make all key elements interactive (tabs, menu collapses, accordions, form inputs) using standard React useState.
- Do NOT import other files; if you need dummy sub-elements, define them locally inside this component.

━━━ PRE-FLIGHT VALIDATION CHECKLIST ━━━
Before outputting, verify:
1. Every opened JSX tag (e.g. <div>) has a matching closing tag (e.g. </div>) or is self-closing (e.g. <img />).
2. Every array, object, and function is properly closed.
3. The component has exactly one "export default function {component_name}".
4. Do NOT output truncated code or placeholder lines like "// rest of component goes here". Every piece of code must be fully written and valid.
5. First line must start with the first import statement. Do not use markdown fences (```jsx).

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
- Generate ONLY standard React web components for Vite.
- Allowed libraries:
  * react
  * lucide-react
  * react-router-dom
- Forbidden imports:
  * react-native
  * lucide-react-native
  * next/*
  * expo
  * @react-navigation
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
    rag_json: dict,
    previous_components: dict
):
    """
    Calls the AI router to stream a single React component, yielding chunks of content.
    """
    logger.info(f"Generating component: {component_name}")
    
    from backend.services.debug.debug_logger import DebugLogger
    db_logger = DebugLogger()
    
    styling = design_plan.get("styling", {})
    rules = rag_json.get("designRules", {})
    
    prev_summary = ""
    for name, code in previous_components.items():
        prev_summary += f"- {name}: Exports default component {name}\n"
        
    sys_prompt = COMPONENT_SYSTEM_PROMPT.format(
        component_name=component_name,
        product_name=design_plan.get("productName", "App"),
        tagline=design_plan.get("tagline", ""),
        spacing=rules.get("spacing", "comfortable"),
        border_radius=rules.get("borderRadius", "xl"),
        shadow=rules.get("shadow", "medium"),
        border=rules.get("border", "none"),
        visual_style=rag_json.get("styleMatched", "modern"),
        theme=design_plan.get("styling", {}).get("aesthetic", "premium dark"),
        primary_color=styling.get("primary_color", "violet"),
        font_body=styling.get("font_body", "Inter"),
        previous_components=prev_summary or "None"
    )
    
    db_logger.log("GENERATION", "STREAM_START", f"Component: {component_name}\nSystem Prompt Length: {len(sys_prompt)}")
    
    stream = generate_ai(
        task_type="component_generator",
        system_prompt=sys_prompt,
        user_prompt=f"Generate the JSX file content for {component_name}",
        temperature=0.7,
        stream=True
    )
    
    full_code = ""
    async for chunk in stream:
        if isinstance(chunk, dict):
            continue
        content = chunk.choices[0].delta.content if hasattr(chunk, "choices") else None
        if content:
            full_code += content
            yield content
            
    db_logger.log("GENERATION", "STREAM_COMPLETE", f"Component: {component_name}\nCode length: {len(full_code)}")

async def generate_app_stream(
    design_plan: dict,
    components_list: list[str]
):
    """
    Calls AI router to stream App.jsx incorporating the planned layout and styling.
    """
    logger.info("Generating App.jsx root container")
    
    from backend.services.debug.debug_logger import DebugLogger
    db_logger = DebugLogger()
    
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
    
    db_logger.log("GENERATION", "STREAM_START", f"App.jsx\nSystem Prompt Length: {len(sys_prompt)}")
    
    stream = generate_ai(
        task_type="app_generator",
        system_prompt=sys_prompt,
        user_prompt="Generate the root App.jsx layout file",
        temperature=0.3,
        stream=True
    )
    
    full_code = ""
    async for chunk in stream:
        if isinstance(chunk, dict):
            continue
        content = chunk.choices[0].delta.content if hasattr(chunk, "choices") else None
        if content:
            full_code += content
            yield content
            
    db_logger.log("GENERATION", "STREAM_COMPLETE", f"App.jsx\nCode length: {len(full_code)}")
