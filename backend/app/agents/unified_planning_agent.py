import json
import logging
from backend.app.services.ai_router import generate_ai

logger = logging.getLogger("backend.app.agents.unified_planning")

SYSTEM_PROMPT = """You are a Unified Design Planner in a multi-agent UI generation pipeline.
Analyze the user request, apply their personalized memory preferences, and incorporate the retrieved design knowledge to output a complete UI architecture plan.

━━━ USER PERSONALIZATION MEMORY ━━━
{memory_preferences}

━━━ RETRIEVED DESIGN KNOWLEDGE ━━━
Retrieved Style Pattern: {style_matched}
Retrieved Layout Style: {layout_pattern}
Retrieved Design Rules: {design_rules}
Curated Typography: {font_heading} / {font_body}
Curated Colors: {bg_color}, {primary_color}, {text_color}

━━━ PLANNING RULES ━━━
1. Explicit instructions in the user's prompt ALWAYS override memory and retrieved knowledge.
2. Formulate the page layout structure based on the retrieved design knowledge.
3. Output ONLY a valid JSON object matching the schema below. No markdown fences.

{{
  "pageType": "e-commerce|saas|portfolio|restaurant|healthcare|ai_startup|travel|fitness|education|finance|agency|real_estate|dashboard|landing_page|other",
  "theme": "premium dark|minimal light|vibrant gradient|etc",
  "productName": "Invent a specific brand name matching the domain.",
  "tagline": "A punchy one-liner headline matching the user's intent.",
  "layout": {{
    "sidebar": "left|right|none",
    "navbar": "top|none",
    "mainSections": [
      "List of specific section file basenames (PascalCase). MUST INCLUDE AT LEAST 8 UNIQUE SECTIONS (e.g. Hero, Features, BentoGrid, Statistics, Testimonials, Brands, Pricing, FAQ, ProductGrid, Footer). Avoid simple linear stacking; prefer bento grids, asymmetrical layouts, overlapping elements, and masonry."
    ]
  }},
  "assets": [
    "List of asset instructions like 'Hero section needs a large SaaS dashboard Unsplash placeholder', 'Features section needs 3 SVG illustrations', 'Testimonials need avatar images'"
  ],
  "styling": {{
    "font_heading": "Google Font Name matching the retrieved design knowledge",
    "font_body": "Google Font Name matching the retrieved design knowledge",
    "bg_color": "Tailwind bg class matching the retrieved design knowledge",
    "primary_color": "Tailwind primary color matching the retrieved design knowledge",
    "text_color": "Tailwind text class matching the retrieved design knowledge",
    "animation": "Framer Motion styles to use (e.g., SlideUp, FadeIn)",
    "borderRadius": "none|medium|large|full|xl",
    "shadows": "none|soft|medium|large"
  }}
}}
"""

async def run_unified_planning(user_prompt: str, memory_prefs: dict, rag_json: dict) -> dict:
    logger.info("Running Unified Planning Agent.")
    
    prefs_str = json.dumps(memory_prefs) if memory_prefs else "No saved preferences."
    styling = rag_json.get("styling", {})
    
    sys_prompt = SYSTEM_PROMPT.format(
        memory_preferences=prefs_str,
        style_matched=rag_json.get("styleMatched", "minimal"),
        layout_pattern=rag_json.get("layoutPattern", "split-hero-bento-features"),
        design_rules=json.dumps(rag_json.get("designRules", {})),
        font_heading=styling.get("font_heading", "Space Grotesk"),
        font_body=styling.get("font_body", "Inter"),
        bg_color=styling.get("bg_color", "bg-zinc-950"),
        primary_color=styling.get("primary_color", "violet"),
        text_color=styling.get("text_color", "text-zinc-100")
    )
    
    try:
        response = await generate_ai(
            task_type="unified_planning",
            system_prompt=sys_prompt,
            user_prompt=f"Create a plan for this request: '{user_prompt}'",
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
            raise ValueError("No JSON object found in output")
            
    except Exception as exc:
        logger.error(f"Unified Planning failed: {exc}. Falling back.")
        return {
            "pageType": "landing_page",
            "theme": "premium dark",
            "productName": "NextGen UI",
            "tagline": "AI-Generated Interface",
            "layout": {
                "sidebar": "none",
                "navbar": "top",
                "mainSections": ["HeroSection", "FeaturesSection", "PricingSection", "TestimonialsSection", "FAQSection", "FooterSection"]
            },
            "assets": [
                "Hero section needs a large abstract placeholder",
                "Features need illustrative SVG icons"
            ],
            "styling": {
                "font_heading": styling.get("font_heading", "Space Grotesk"),
                "font_body": styling.get("font_body", "Inter"),
                "bg_color": styling.get("bg_color", "bg-zinc-950"),
                "primary_color": styling.get("primary_color", "violet"),
                "text_color": styling.get("text_color", "text-zinc-100"),
                "animation": "FadeIn and SlideUp",
                "borderRadius": "xl",
                "shadows": "medium"
            }
        }
