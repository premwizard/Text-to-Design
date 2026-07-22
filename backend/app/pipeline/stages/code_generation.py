import json
import logging
import re
from typing import Dict
from backend.app.pipeline.models import GeneratedCode, DesignContext
from backend.app.services.ai_router import generate_ai

logger = logging.getLogger(__name__)

CODE_GENERATION_SYSTEM_PROMPT = """You are a master Web Developer specializing in semantic HTML5, Vanilla CSS, and modern Vanilla JavaScript.
Generate the complete static website in a single response based on the layout and component blueprint.

You MUST output the raw code for ALL 3 files using the exact following format separator:
===FILE: index.html===
<!DOCTYPE html>
<html lang="en">
...
</html>

===FILE: style.css===
/* CSS code */

===FILE: script.js===
// JavaScript code

━━━ DEVELOPMENT GUIDELINES ━━━
1. index.html:
- Complete, semantic HTML5 document (<!DOCTYPE html>, <html lang="en">, <head>, <body>).
- Include meta tags (viewport, charset, title, description).
- Include Google Fonts link in <head> matching the typography plan.
- Link external stylesheet: <link rel="stylesheet" href="style.css">
- Link external script: <script src="script.js" defer></script>
- Use semantic sectioning tags (<header>, <nav>, <main>, <section>, <footer>, <article>).
- Include hero, features, pricing, testimonials, footer, and navigation sections.
- Use inline SVG elements or Unicode icons for visual elements.
- Use clean, semantic, reusable class names (e.g. class="navbar", class="hero-section", class="btn btn-primary", class="glass-card").
- ABSOLUTELY NO React syntax, NO JSX tags, NO fragments (<>), NO React state, NO imports/exports.

2. style.css:
- Pure, native Vanilla CSS.
- Define CSS Variables at :root for the color palette, fonts, spacing scale, shadows, and glassmorphism settings.
- Implement modern layout techniques using CSS Grid and Flexbox.
- Fully responsive design using media queries (@media (max-width: 768px), etc.).
- Include keyframes, transitions, smooth scrolling, hover effects, shadows, gradients, and glassmorphism (backdrop-filter: blur()).
- ABSOLUTELY NO Tailwind, NO Bootstrap, NO external CSS framework imports.

3. script.js:
- Pure Vanilla JavaScript DOM manipulation.
- Implement interactive features:
  • Mobile navigation menu toggle
  • Sticky navbar on scroll
  • Smooth scrolling for internal anchor links
  • Accordion toggle for FAQs / details
  • Tab switching logic
  • Theme toggle / Dark mode switch
  • Intersection Observer for scroll animations
  • Counter animations
- ABSOLUTELY NO React, Vue, Angular, jQuery, TypeScript, Webpack, Vite, or npm packages.

Do NOT wrap the response in markdown code fences or JSON.
Output ONLY the three files: index.html, style.css, script.js using ===FILE: <filename>=== separators.
"""

class StaticWebsiteGenerator:
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
        Analyzes the complete DesignContext and generates the HTML/CSS/JS static website code.
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
                "index.html": "<!DOCTYPE html>\n<html lang=\"en\">\n<head><meta charset=\"UTF-8\"><title>Fallback</title><link rel=\"stylesheet\" href=\"style.css\"></head>\n<body><h1>Website Generation Fallback</h1><script src=\"script.js\"></script></body>\n</html>",
                "style.css": "body { font-family: sans-serif; background: #09090b; color: #fff; text-align: center; padding: 50px; }",
                "script.js": "console.log('Static website loaded');"
            })
            
        return context

HTMLGenerator = StaticWebsiteGenerator
CodeGenerator = StaticWebsiteGenerator