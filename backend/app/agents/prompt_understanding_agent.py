import json
import logging
from backend.app.services.ai_router import generate_ai

logger = logging.getLogger("backend.app.agents.prompt_understanding")

SYSTEM_PROMPT = """You are a Prompt Understanding Agent in a multi-agent UI generation pipeline.
Analyze the user request deeply and extract the design intent into a structured JSON object.

━━━ USER PERSONALIZATION MEMORY ━━━
The user has the following design preferences (use these to populate parameters NOT explicitly specified in the user's prompt):
{memory_preferences}

━━━ OVERRIDE RULES ━━━
1. Explicit instructions in the user's prompt ALWAYS override memory preferences.
2. Memory preferences fill in missing values. For example, if the prompt is 'Create portfolio page' and style memory is 'glassmorphism' and theme memory is 'dark', output visualStyle='glassmorphism' and theme='premium dark'.

Output ONLY a JSON object with this exact schema (do not output any explanation or markdown fences):
{{
  "pageType": "landing|dashboard|portfolio|ecommerce|restaurant|mobile_app|agency|event|blog|other",
  "industry": "e.g., fintech, food, fashion, education, healthcare, technology, creative, corporate",
  "theme": "e.g., premium dark, warm organic, minimal light, vibrant gradient, neon dark",
  "components": [
    "List of essential sections needed on this page, as short strings in lowercase (e.g. navbar, hero, cards, sidebar, footer, pricing, charts)"
  ],
  "style": {{
    "spacing": "comfortable|compact|loose",
    "borderRadius": "none|medium|large|full",
    "visualStyle": "modern|brutalist|neumorphism|glassmorphism|luxury-minimal|cyberpunk"
  }}
}}

Output must start with {{ and end with }}. No extra text.
"""

async def run_prompt_understanding(user_prompt: str, memory_prefs: dict) -> dict:
    logger.info("Running Prompt Understanding Agent with personalization details.")
    
    prefs_str = json.dumps(memory_prefs) if memory_prefs else "No saved preferences yet."
    sys_prompt = SYSTEM_PROMPT.format(memory_preferences=prefs_str)
    
    try:
        response = await generate_ai(
            task_type="prompt_understanding",
            system_prompt=sys_prompt,
            user_prompt=f"Analyze this request: '{user_prompt}'",
            temperature=0.2,
            stream=False
        )
        output_text = response.choices[0].message.content.strip()
        
        # Clean any markdown block wrappers if LLM returned them
        if output_text.startswith("```"):
            output_text = output_text.strip("`").replace("json\n", "", 1).strip()
            
        start_idx = output_text.find('{')
        end_idx = output_text.rfind('}')
        if start_idx != -1 and end_idx != -1:
            json_str = output_text[start_idx:end_idx+1]
            return json.loads(json_str)
        else:
            raise ValueError("No JSON object found in LLM output")
            
    except Exception as exc:
        logger.error(f"Prompt Understanding failed: {exc}. Falling back to default.")
        
        # Build fallback blending memory details
        prompt_lower = user_prompt.lower()
        page_type = "landing"
        if "dashboard" in prompt_lower or "analytics" in prompt_lower:
            page_type = "dashboard"
        elif "portfolio" in prompt_lower or "resume" in prompt_lower:
            page_type = "portfolio"
        elif "ecommerce" in prompt_lower or "store" in prompt_lower or "shop" in prompt_lower:
            page_type = "ecommerce"
            
        theme_val = memory_prefs.get("theme", "premium dark" if "dark" in prompt_lower else "minimal light")
        style_val = memory_prefs.get("style", "modern")
        spacing_val = memory_prefs.get("spacing", "comfortable")
        radius_val = memory_prefs.get("borderRadius", "large")
        
        return {
            "pageType": page_type,
            "industry": "technology",
            "theme": theme_val,
            "components": ["navbar", "hero", "features", "footer"],
            "style": {
                "spacing": spacing_val,
                "borderRadius": radius_val,
                "visualStyle": style_val
            }
        }
