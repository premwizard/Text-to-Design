import json
import logging
from backend.services.ai_router import generate_ai

logger = logging.getLogger("backend.agents.prompt_understanding")

SYSTEM_PROMPT = """You are a Prompt Understanding Agent in a multi-agent UI generation pipeline.
Analyze the user request deeply and extract the design intent into a structured JSON object.

Output ONLY a JSON object with this exact schema (do not output any explanation or markdown fences):
{
  "pageType": "landing|dashboard|portfolio|ecommerce|restaurant|mobile_app|agency|event|blog|other",
  "industry": "e.g., fintech, food, fashion, education, healthcare, technology, creative, corporate",
  "theme": "e.g., premium dark, warm organic, minimal light, vibrant gradient, neon dark",
  "components": [
    "List of essential sections needed on this page, as short strings in lowercase (e.g. navbar, hero, cards, sidebar, footer, pricing, charts)"
  ],
  "style": {
    "spacing": "comfortable|compact|loose",
    "borderRadius": "none|medium|large|full",
    "visualStyle": "modern|brutalist|neumorphism|glassmorphism|luxury-minimal|cyberpunk"
  }
}

Output must start with { and end with }. No extra text.
"""

async def run_prompt_understanding(user_prompt: str) -> dict:
    logger.info(f"Running Prompt Understanding Agent for: {user_prompt}")
    
    try:
        response = await generate_ai(
            task_type="prompt_understanding",
            system_prompt=SYSTEM_PROMPT,
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
        # Fallback dictionary matching the prompt keywords roughly
        prompt_lower = user_prompt.lower()
        page_type = "landing"
        if "dashboard" in prompt_lower or "analytics" in prompt_lower:
            page_type = "dashboard"
        elif "portfolio" in prompt_lower or "resume" in prompt_lower:
            page_type = "portfolio"
        elif "ecommerce" in prompt_lower or "store" in prompt_lower or "shop" in prompt_lower:
            page_type = "ecommerce"
            
        industry = "technology"
        if "fintech" in prompt_lower or "finance" in prompt_lower or "crypto" in prompt_lower:
            industry = "fintech"
        elif "food" in prompt_lower or "restaurant" in prompt_lower:
            industry = "food"
        elif "fashion" in prompt_lower or "clothing" in prompt_lower:
            industry = "fashion"
            
        return {
            "pageType": page_type,
            "industry": industry,
            "theme": "premium dark" if "dark" in prompt_lower else "minimal light",
            "components": ["navbar", "hero", "features", "footer"],
            "style": {
                "spacing": "comfortable",
                "borderRadius": "large",
                "visualStyle": "modern"
            }
        }
