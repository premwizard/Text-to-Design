import json
import logging
from backend.services.ai_router import generate_ai

logger = logging.getLogger("backend.agents.design_planning")

SYSTEM_PROMPT = """You are a Design Planning Agent in a multi-agent UI generation pipeline.
Take the structured intent JSON from Agent 1, combined with reference design patterns retrieved from our Design RAG Knowledge Base, and formulate the page layout architecture and theme.

━━━ RETRIEVED DESIGN KNOWLEDGE ━━━
Retrieved Style Pattern: {style_matched}
Retrieved Layout Style: {layout_pattern}
Retrieved Design Rules: {design_rules}
Curated Typography:
- Heading Font: {font_heading}
- Body Font: {font_body}
Curated Colors:
- Background: {bg_color}
- Primary Accent: {primary_color}
- Text Color: {text_color}

━━━ PLANNING RULES ━━━
- Align the layout structure, main sections, and style properties directly with the retrieved design knowledge.
- Do NOT guess layout placements; base them on the retrieved layout patterns and design rules.
- Maintain consistency across the heading and body fonts, background, text, and primary color classes.

Output ONLY a JSON object with this exact schema (do not output any explanation or markdown fences):
{{
  "productName": "Invent a specific brand name matching the domain. Never 'Acme' or 'My App'.",
  "tagline": "A punchy one-liner headline matching the user's domain and intent.",
  "layout": {{
    "sidebar": "left|right|none",
    "navbar": "top|none",
    "mainSections": [
      "List of specific section file basenames (PascalCase, e.g. HeroSection, BentoFeatures, TransactionTable, TestimonialCarousel, PricingPlan, Footer) in rendering order."
    ]
  }},
  "styling": {{
    "font_heading": "Google Font Name matching the retrieved design knowledge",
    "font_body": "Google Font Name matching the retrieved design knowledge",
    "bg_color": "Tailwind bg class matching the retrieved design knowledge",
    "primary_color": "Tailwind primary color matching the retrieved design knowledge",
    "text_color": "Tailwind text class matching the retrieved design knowledge"
  }}
}}

Output must start with {{ and end with }}. No extra text.
"""

async def run_design_planning(intent_json: dict, rag_json: dict, user_prompt: str) -> dict:
    logger.info(f"Running Design Planning Agent with RAG integration. RAG style: {rag_json.get('styleMatched')}")
    
    styling = rag_json.get("styling", {})
    sys_prompt = SYSTEM_PROMPT.format(
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
        user_message = f"Intent: {json.dumps(intent_json)}\nUser Prompt: '{user_prompt}'\nRetrieved Design Details: {json.dumps(rag_json)}"
        response = await generate_ai(
            task_type="design_planning",
            system_prompt=sys_prompt,
            user_prompt=user_message,
            temperature=0.2,
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
        logger.error(f"Design Planning failed: {exc}. Falling back to default RAG schema.")
        
        # Build layout fallback directly based on matching RAG parameters
        components = intent_json.get("components", ["navbar", "hero", "features", "footer"])
        main_sections = []
        for c in components:
            if c in ("navbar", "footer"):
                continue
            camel = "".join(x.capitalize() for x in c.split())
            if not any(camel.endswith(term) for term in ["Section", "Widget", "Table", "Card"]):
                camel += "Section"
            main_sections.append(camel)
            
        if not main_sections:
            main_sections = ["HeroSection", "FeaturesSection"]
        main_sections.append("FooterSection")
        
        layout_pattern = rag_json.get("layoutPattern", "split-hero")
        sidebar_val = "left" if "sidebar" in layout_pattern or "sidebar" in components else "none"
        
        return {
            "productName": "NextGen UI Workspace",
            "tagline": "Premium interfaces engineered with multi-agent orchestration.",
            "layout": {
                "sidebar": sidebar_val,
                "navbar": "top" if "navbar" in components or sidebar_val == "none" else "none",
                "mainSections": main_sections
            },
            "styling": styling
        }
