import json
import logging
import re
from typing import Dict
from backend.app.pipeline.models import GeneratedCode, DesignContext
from backend.app.services.ai_router import generate_ai

logger = logging.getLogger(__name__)

CODE_GENERATION_SYSTEM_PROMPT = """You are a master React + Tailwind CSS developer.
Generate the complete React application in a single response based on the layout and component blueprint.

You MUST output the raw code for ALL files using the exact following format separator.
Do NOT wrap the response in markdown code fences or JSON.

Required format:
===FILE: App.jsx===
import React from 'react';
import Navbar from './components/Navbar';
// ... rest of the code

===FILE: components/Navbar.jsx===
// ... rest of the code

━━━ DEVELOPMENT GUIDELINES ━━━
- Generate ONLY standard React web components for Vite.
- Allowed libraries: react, lucide-react, react-router-dom, framer-motion. (CRITICAL: Always use <HashRouter> instead of <BrowserRouter>. Avoid BrowserRouter completely.)
- Apply global CSS by importing `import './index.css';`. Do NOT use `<style>` tags in JSX files, they will break compilation.
- Apply mobile-first responsive Tailwind classes (sm:, md:, lg:).
- Design it with a premium visual feel, leveraging nice hover states and smooth animations.
- ABSOLUTELY NO LOREM IPSUM. Generate realistic copy.
- ABSOLUTELY NO EMPTY PLACEHOLDER DIVS. Use realistic placeholder images from Unsplash or SVG illustrations.
- Include rich animations using `framer-motion` (e.g., Fade In, Slide Up, Scale Hover) to make the UI feel alive.
- Incorporate `lucide-react` icons extensively for visual hierarchy.
- Ensure 100% complete files. Do not leave trailing or unfinished tags. Provide every single import statement required.
- You MUST NOT import any local assets, images, SVGs, or CSS files (like `App.css`). They do NOT exist.
- If you need an image, use an Unsplash source URL directly as a string (e.g. `const img = "https://images.unsplash.com/...";`). Do NOT use ES module `import` for URLs.
- Use `lucide-react` for icons. Do NOT use brand icons (Facebook, Twitter) as they might not exist. Use generic equivalents.
- CRITICAL: Do NOT use namespace tags for icons (e.g., `<lucide:arrow-right />`). Always import the named component exactly (e.g., `import { ArrowRight } from 'lucide-react';`) and use it as a standard JSX tag `<ArrowRight />`.
"""

class CodeGenerator:
    def _parse_generated_files(self, raw_text: str) -> Dict[str, str]:
        """Parses the raw text response based on the ===FILE: <filename>=== delimiter."""
        files = {}
        # Splitting by the file separator
        parts = re.split(r'===FILE:\s*([a-zA-Z0-9_\-\./]+)===', raw_text)
        
        # parts[0] is everything before the first file (usually empty or intro text)
        for i in range(1, len(parts), 2):
            filename = parts[i].strip()
            content = parts[i+1].strip()
            
            # Clean up trailing/leading markdown fences if the AI mistakenly added them
            content = re.sub(r'^```[a-z]*\n?', '', content, flags=re.IGNORECASE)
            content = re.sub(r'\n?```$', '', content)
            
            files[filename] = content.strip()
            
        return files

    async def process(self, context: DesignContext) -> DesignContext:
        """
        Analyzes the complete DesignContext and generates the React application code.
        """
        logger.info("Starting Code Generation phase.")
        try:
            # Gather all plans for the prompt payload
            design_dict = context.design_plan.model_dump() if context.design_plan else {}
            theme_dict = context.theme_plan.model_dump() if context.theme_plan else {}
            layout_dict = context.layout_plan.model_dump() if context.layout_plan else {}
            component_dict = context.component_plan.model_dump() if context.component_plan else {}
            
            prompt_payload = (
                f"Design Blueprint: {json.dumps(design_dict)}\n"
                f"Theme Plan (Colors/Fonts): {json.dumps(theme_dict)}\n"
                f"Layout System: {json.dumps(layout_dict)}\n"
                f"Components to Build: {json.dumps(component_dict.get('components', []))}\n"
                f"Global Assets: {json.dumps(component_dict.get('global_assets', []))}\n"
            )
            
            response = await generate_ai(
                task_type="code_generation",
                system_prompt=CODE_GENERATION_SYSTEM_PROMPT,
                user_prompt=prompt_payload,
                temperature=0.3,
                stream=False
            )
            
            raw_content = response.choices[0].message.content.strip()
            files_dict = self._parse_generated_files(raw_content)
            
            if not files_dict:
                raise ValueError("No files were extracted from the LLM response. Ensure the format matches ===FILE: <filename>===")
                
            context.generated_code = GeneratedCode(files=files_dict)
            logger.info(f"Code Generation successful. Extracted {len(files_dict)} files.")
            
        except Exception as e:
            logger.error(f"Failed to generate code. Error: {e}")
            # Fallback
            context.generated_code = GeneratedCode(files={
                "App.jsx": "import React from 'react';\n\nfunction App() { return <div>Generated Code Failed</div>; }\nexport default App;"
            })
            
        return context
