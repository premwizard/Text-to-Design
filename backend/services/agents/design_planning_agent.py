import json
import logging
from backend.services.ai_router import generate_ai

logger = logging.getLogger("backend.agents.design_planning")

SYSTEM_PROMPT = """You are a Design Planning Agent in a multi-agent UI generation pipeline.
Take the structured intent JSON from Agent 1 and create a layout architecture and design theme.

Output ONLY a JSON object with this exact schema (do not output any explanation or markdown fences):
{
  "productName": "Invent a specific brand name matching the domain. Never 'Acme' or 'My App'.",
  "tagline": "A punchy one-liner headline matching the user's domain and intent.",
  "layout": {
    "sidebar": "left|right|none",
    "navbar": "top|none",
    "mainSections": [
      "List of specific section file basenames (PascalCase, e.g. HeroSection, BentoFeatures, TransactionTable, TestimonialCarousel, PricingPlan, Footer) in rendering order."
    ]
  },
  "styling": {
    "font_heading": "Google Font Name (e.g. Space Grotesk, Playfair Display, Outfit, Cormorant Garamond, Nunito, Jost, DM Sans)",
    "font_body": "Google Font Name (e.g. Inter, DM Sans, Nunito, Outfit, Jost, Space Mono)",
    "bg_color": "Tailwind bg class (e.g., bg-slate-950, bg-zinc-900, bg-stone-950, bg-white, bg-gray-50)",
    "primary_color": "Tailwind brand accent color prefix without weight (e.g., violet, indigo, emerald, sky, rose, orange)",
    "text_color": "Tailwind text class (e.g., text-zinc-100, text-slate-900, text-stone-200)"
  }
}

Output must start with { and end with }. No extra text.
"""

async def run_design_planning(intent_json: dict, user_prompt: str) -> dict:
    logger.info(f"Running Design Planning Agent for intent: {intent_json}")
    
    try:
        user_message = f"Intent: {json.dumps(intent_json)}\nUser Prompt: '{user_prompt}'"
        response = await generate_ai(
            task_type="design_planning",
            system_prompt=SYSTEM_PROMPT,
            user_prompt=user_message,
            temperature=0.3,
            stream=False
        )
        output_text = response.choices[0].message.content.strip()
        
        if output_text.startswith("```"):
            output_text = output_text.strip("`").replace("json\n", "", 1).strip()
            
        start_idx = output_text.find('{')
        end_idx = output_text.rfind('}')
        if start_idx != -1 and end_idx != -1:
            json_str = output_text[start_idx:end_idx+1]
            return json.loads(json_str)
        else:
            raise ValueError("No JSON object found in design planner output")
            
    except Exception as exc:
        logger.error(f"Design Planning failed: {exc}. Using default layout plan.")
        # Determine standard layout components from intent_json
        page_type = intent_json.get("pageType", "landing")
        components = intent_json.get("components", ["navbar", "hero", "features", "footer"])
        
        main_sections = []
        for c in components:
            if c == "navbar":
                continue
            if c == "footer":
                continue
            # Capitalise first letters
            camel = "".join(x.capitalize() for x in c.split())
            if not camel.endswith("Section") and not camel.endswith("Widget") and not camel.endswith("Table") and not camel.endswith("Card"):
                camel += "Section"
            main_sections.append(camel)
            
        if not main_sections:
            main_sections = ["HeroSection", "FeaturesSection"]
            
        # Add footer section
        main_sections.append("FooterSection")
        
        sidebar_val = "none"
        if page_type == "dashboard" or "sidebar" in components:
            sidebar_val = "left"
            
        return {
            "productName": "NextGen UI",
            "tagline": "Modern component interfaces generated with AI orchestrations.",
            "layout": {
                "sidebar": sidebar_val,
                "navbar": "top" if "navbar" in components or sidebar_val == "none" else "none",
                "mainSections": main_sections
            },
            "styling": {
                "font_heading": "Space Grotesk",
                "font_body": "Inter",
                "bg_color": "bg-zinc-950" if intent_json.get("theme", "dark") == "premium dark" else "bg-white",
                "primary_color": "violet",
                "text_color": "text-zinc-100" if intent_json.get("theme", "dark") == "premium dark" else "text-zinc-900"
            }
        }
