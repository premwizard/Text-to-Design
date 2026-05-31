import json
import logging
import re
from typing import Any, Dict

import anyio
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain_community.chat_models import ChatOpenAI

from backend.rag.manager import retrieve_relevant_docs
from backend.utils.env import get_env

Groq = None
try:
    from langchain_community.llms.groq import Groq
except ImportError:
    try:
        from langchain.llms.groq import Groq
    except ImportError:
        Groq = None

logger = logging.getLogger("backend.llm_service")

PROMPT_TEMPLATE = """
You are a senior UI/UX design director and system builder.
Your goal is to generate a DESIGN SYSTEM DRIVEN USER INTERFACE matching modern premium standards (like Stripe, Vercel, Linear, and Framer).

Before compiling the layout, outline the design strategy and visual identity.
Output ONLY a single valid JSON object following this strict schema:

{
  "designSystem": {
    "theme": "modern" | "minimal" | "startup" | "glassmorphism" | "bold" | "luxury",
    "palette": "blue-purple" | "orange-red" | "emerald-cyan" | "black-gold" | "pastel" | "monochrome",
    "colors": {
      "primary": "Hex color (e.g. #6366f1)",
      "secondary": "Hex color (e.g. #0f172a)",
      "background": "Hex color",
      "surface": "Hex color",
      "text": "Hex color"
    },
    "typography": {
      "font": "Outfit" | "Inter" | "Space Grotesk" | "Playfair Display",
      "scale": "comfortable" | "spacious" | "compact",
      "weights": ["300", "400", "550", "700"]
    },
    "spacing": "compact" | "comfortable" | "spacious",
    "borderRadius": "none" | "md" | "lg" | "xl" | "2xl",
    "shadow": "none" | "sm" | "md" | "lg" | "xl" | "2xl",
    "gradient": "Tailwind gradient class (e.g. from-blue-600 to-purple-650)",
    "animation": "subtle" | "medium" | "dynamic"
  },
  "layoutStrategy": {
    "productType": "SaaS landing page" | "portfolio" | "dashboard" | "eCommerce" | "blog",
    "uiStyle": "minimal clean" | "futuristic glass" | "premium dark" | "high contrast bold",
    "visualIdentity": "brand visual identity description",
    "layoutStrategy": "visual structure rhythm planning strategy",
    "density": "comfortable" | "compact",
    "tone": "professional" | "energetic",
    "modernInfluences": ["stripe", "vercel", "linear", "framer"]
  },
  "components": [
    {
      "id": "unique-id-1",
      "type": "navbar" | "hero" | "features" | "pricing" | "testimonials" | "faq" | "cta" | "footer" | "cards" | "stats" | "form",
      "variant": "standard" | "sticky" | "centered" | "minimal" | "modern" | "grid" | "list" | "alternating-rows" | "cards" | "comparison" | "minimal-table" | "carousel" | "stacked" | "accordion" | "gradient" | "glass" | "stats" | "masonry" | "simple" | "detailed" | "centered-logo" | "contact" | "login" | "signup",
      "style": {
        "theme": "light" | "dark" | "auto",
        "align": "left" | "center" | "right",
        "padding": "small" | "medium" | "large"
      },
      "layout": {
        "desktop": "grid-4" | "grid-2" | "stack" | "flex",
        "tablet": "grid-4" | "grid-2" | "stack" | "flex",
        "mobile": "grid-4" | "grid-2" | "stack" | "flex"
      },
      "animation": {
        "type": "none" | "fade" | "slide" | "zoom",
        "duration": number
      },
      "image": {
        "url": "url_string",
        "alt": "alt_string"
      },
      "actions": [
        {
          "type": "navigate" | "open-modal" | "scroll-to-section",
          "target": "target_string"
        }
      ],
      "props": {
        // Props matching the component type schema requirements
      },
      "children": []
    }
  ]
}

CRITICAL RULES:
1. Every component MUST include ALL fields: id, type, variant, style, layout, animation, image, actions, props, children.
2. NEVER use null or undefined values. Use valid defaults:
   - style: { "theme": "auto", "align": "left", "padding": "medium" }
   - layout: { "desktop": "flex", "tablet": "flex", "mobile": "stack" }
   - animation: { "type": "none", "duration": 0 }
   - image: { "url": "", "alt": "" }
   - actions: []
   - children: []
3. Return ONLY valid JSON block. No explanation block, no markdown wraps.
"""

def enforce_component_schema(data: dict) -> dict:
    if not data or not isinstance(data, dict):
        return data
        
    components = data.get("components")
    if not isinstance(components, list):
        return data
        
    for idx, comp in enumerate(components):
        if not isinstance(comp, dict):
            continue
            
        # Ensure mandatory keys and strict default structures
        type_key = comp.get("type", "hero")
        if comp.get("id") is None:
            comp["id"] = f"{type_key}-{idx + 1}"
            
        if comp.get("type") is None:
            comp["type"] = "hero"
            
        if comp.get("variant") is None:
            comp["variant"] = "standard"
            
        # style
        style = comp.get("style")
        if not isinstance(style, dict) or style is None:
            comp["style"] = {
                "theme": "auto",
                "align": "left",
                "padding": "medium"
            }
        else:
            style_theme = style.get("theme")
            style_align = style.get("align")
            style_padding = style.get("padding")
            
            comp["style"] = {
                "theme": "auto" if style_theme is None else style_theme,
                "align": "left" if style_align is None else style_align,
                "padding": "medium" if style_padding is None else style_padding
            }
            
        # layout
        layout = comp.get("layout")
        if not isinstance(layout, dict) or layout is None:
            comp["layout"] = {
                "desktop": "flex",
                "tablet": "flex",
                "mobile": "stack"
            }
        else:
            lay_desk = layout.get("desktop")
            lay_tab = layout.get("tablet")
            lay_mob = layout.get("mobile")
            
            comp["layout"] = {
                "desktop": "flex" if lay_desk is None else lay_desk,
                "tablet": "flex" if lay_tab is None else lay_tab,
                "mobile": "stack" if lay_mob is None else lay_mob
            }
            
        # animation
        animation = comp.get("animation")
        if not isinstance(animation, dict) or animation is None:
            comp["animation"] = {
                "type": "none",
                "duration": 0
            }
        else:
            anim_type = animation.get("type")
            anim_dur = animation.get("duration")
            
            comp["animation"] = {
                "type": "none" if anim_type is None else anim_type,
                "duration": 0 if anim_dur is None else anim_dur
            }
            
        # image
        image = comp.get("image")
        if not isinstance(image, dict) or image is None:
            comp["image"] = {
                "url": "",
                "alt": ""
            }
        else:
            img_url = image.get("url")
            img_alt = image.get("alt")
            
            comp["image"] = {
                "url": "" if img_url is None else img_url,
                "alt": "" if img_alt is None else img_alt
            }
            
        # actions
        actions = comp.get("actions")
        if not isinstance(actions, list) or actions is None:
            comp["actions"] = []
        else:
            clean_actions = []
            for act in actions:
                if isinstance(act, dict):
                    act_type = act.get("type")
                    act_target = act.get("target")
                    clean_actions.append({
                        "type": "navigate" if act_type is None else act_type,
                        "target": "" if act_target is None else act_target
                    })
            comp["actions"] = clean_actions
            
        # props
        if comp.get("props") is None:
            comp["props"] = {}
            
        # children
        children = comp.get("children")
        if not isinstance(children, list) or children is None:
            comp["children"] = []
        else:
            # Recursively enforce schema on children
            comp["children"] = [enforce_component_schema(child) if isinstance(child, dict) else child for child in children]
            
    return data

DEFAULT_RESPONSE = enforce_component_schema({
    "page": "landing",
    "designSystem": {
        "theme": "startup",
        "palette": "blue-purple",
        "colors": {
            "primary": "#6366f1",
            "secondary": "#0f172a",
            "background": "#020617",
            "surface": "#0f172a",
            "text": "#f8fafc"
        },
        "typography": {
            "font": "Inter",
            "scale": "comfortable",
            "weights": ["300", "400", "550", "700"]
        },
        "spacing": "comfortable",
        "borderRadius": "lg",
        "shadow": "lg",
        "gradient": "from-indigo-500 to-purple-650",
        "animation": "medium"
    },
    "layoutStrategy": {
        "productType": "SaaS landing page",
        "uiStyle": "vibrant startup",
        "visualIdentity": "Clean tech developer platform",
        "layoutStrategy": "standard responsive block stack",
        "density": "comfortable",
        "tone": "energetic",
        "modernInfluences": ["stripe", "vercel", "linear"]
    },
    "components": [
        {
            "id": "nav-1",
            "type": "navbar",
            "variant": "standard",
            "props": {
                "logo": "UI Studio",
                "links": ["Home", "Features", "Pricing", "FAQ"]
            }
        },
        {
            "id": "hero-1",
            "type": "hero",
            "variant": "split-image",
            "props": {
                "title": "Build your next page with confidence",
                "subtitle": "A complete landing flow powered by a dynamic prompt-driven UI generator.",
                "cta": "Get Started",
                "ctaSecondary": "Learn More"
            }
        },
        {
            "id": "features-1",
            "type": "features",
            "variant": "grid",
            "props": {
                "items": [
                    {"title": "Fast Setup", "description": "Get a complete landing page structure instantly."},
                    {"title": "Flexible Layout", "description": "Render components from JSON without hardcoding."},
                    {"title": "Responsive Design", "description": "Built for web and mobile with clean styling."}
                ]
            }
        },
        {
            "id": "faq-1",
            "type": "faq",
            "variant": "accordion",
            "props": {
                "items": [
                    {"question": "What is this platform?", "answer": "This is an AI-powered Text-to-Design production rendering platform."},
                    {"question": "Is it responsive?", "answer": "Yes, it adapts perfectly to mobile, tablet, and desktop views."}
                ]
            }
        },
        {
            "id": "footer-1",
            "type": "footer",
            "variant": "simple",
            "props": {
                "copyright": "© 2026 Generated UI Studio",
                "links": ["Privacy Policy", "Terms of Service", "Support"]
            }
        }
    ],
})

def get_llm():
    groq_api_key = get_env("GROQ_API_KEY")
    openai_api_key = get_env("OPENAI_API_KEY")

    if groq_api_key:
        if Groq is not None:
            model_name = get_env("GROQ_MODEL", default="mixtral")
            return Groq(model=model_name, api_key=groq_api_key, temperature=0)
        logger.warning("GROQ_API_KEY is set but Groq integration is not installed. Falling back to OpenAI.")

    if openai_api_key:
        model_name = get_env("OPENAI_MODEL", default="gpt-4o-mini")
        return ChatOpenAI(model_name=model_name, temperature=0, openai_api_key=openai_api_key)

    logger.warning("No LLM API key found. Using prompt-based fallback generator.")
    return None

async def _execute_chain(chain: LLMChain, inputs: Dict[str, Any]) -> str:
    if hasattr(chain, "arun"):
        return await chain.arun(**inputs)
    return await anyio.to_thread.run_sync(chain.run, **inputs)

def _extract_json(response_text: str) -> Dict[str, Any]:
    response_text = response_text.strip()
    json_match = re.search(r"\{.*\}", response_text, flags=re.S)
    if not json_match:
        raise ValueError("No JSON object found in model output")

    raw_json = json_match.group(0)
    return json.loads(raw_json)

def generate_ui_from_prompt(user_text: str) -> Dict[str, Any]:
    prompt_lower = user_text.lower()
    
    # Food/Restaurant Theme Fallback
    if "food" in prompt_lower or "restaurant" in prompt_lower or "cafe" in prompt_lower:
        return enforce_component_schema({
            "page": "landing",
            "designSystem": {
                "theme": "modern",
                "palette": "orange-red",
                "colors": {
                    "primary": "#f97316",
                    "secondary": "#dc2626",
                    "background": "#0f172a",
                    "surface": "#1e293b",
                    "text": "#f8fafc"
                },
                "typography": {
                    "font": "Outfit",
                    "scale": "comfortable",
                    "weights": ["400", "700"]
                },
                "spacing": "comfortable",
                "borderRadius": "xl",
                "shadow": "lg"
            },
            "layoutStrategy": {
                "productType": "Restaurant Landing",
                "uiStyle": "clean organic branding",
                "visualIdentity": "Fresh ingredients, bold organic colors",
                "layoutStrategy": "split presentation",
                "density": "comfortable",
                "tone": "professional",
                "modernInfluences": ["stripe", "framer"]
            },
            "components": [
                {"id": "nav-1", "type": "navbar", "variant": "standard", "props": {"logo": "FreshBites", "links": ["Menu", "About", "Locations"]}},
                {"id": "hero-1", "type": "hero", "variant": "split-image", "props": {"title": "Delicious meals delivered fast", "subtitle": "Fresh ingredients, bold flavors.", "cta": "View Menu", "ctaSecondary": "Order Online"}},
                {"id": "features-1", "type": "features", "variant": "grid", "props": {"items": [{"title": "Seasonal Specials", "description": "Try our chef-curated dishes."}, {"title": "Online Ordering", "description": "Easy pickup."}, {"title": "Loyalty Rewards", "description": "Earn points."}]}},
                {"id": "footer-1", "type": "footer", "variant": "simple", "props": {"copyright": "© 2026 FreshBites", "links": ["Privacy Policy", "Terms"]}}
            ]
        })
        
    # Portfolio Fallback
    if "portfolio" in prompt_lower or "freelance" in prompt_lower or "designer" in prompt_lower:
        return enforce_component_schema({
            "page": "portfolio",
            "designSystem": {
                "theme": "luxury",
                "palette": "black-gold",
                "colors": {
                    "primary": "#d97706",
                    "secondary": "#1c1917",
                    "background": "#0c0a09",
                    "surface": "#1c1917",
                    "text": "#f5f5f4"
                },
                "typography": {
                    "font": "Playfair Display",
                    "scale": "spacious",
                    "weights": ["300", "600"]
                },
                "spacing": "spacious",
                "borderRadius": "md",
                "shadow": "md"
            },
            "layoutStrategy": {
                "productType": "Design Portfolio",
                "uiStyle": "minimal luxury dark",
                "visualIdentity": "Refined and clean premium aesthetics",
                "layoutStrategy": "editorial typography layout",
                "density": "comfortable",
                "tone": "professional",
                "modernInfluences": ["apple", "vercel"]
            },
            "components": [
                {"id": "hero-1", "type": "hero", "variant": "centered", "props": {"title": "Crafting digital experiences", "subtitle": "Portfolio of a creative digital designer.", "cta": "View Projects"}},
                {"id": "features-1", "type": "features", "variant": "alternating-rows", "props": {"items": [{"title": "Branding & Identity", "description": "Crafting modern vector marks and digital design systems."}, {"title": "Full Stack Dev", "description": "Highly responsive frontend and backend systems built on clean architectures."}]}},
                {"id": "footer-1", "type": "footer", "variant": "centered-logo", "props": {"copyright": "© 2026 Studio Design", "links": ["Dribbble", "LinkedIn"]}}
            ]
        })
        
    # E-Commerce Fallback
    if "ecommerce" in prompt_lower or "shop" in prompt_lower or "store" in prompt_lower:
        return enforce_component_schema({
            "page": "ecommerce",
            "designSystem": {
                "theme": "minimal",
                "palette": "monochrome",
                "colors": {
                    "primary": "#171717",
                    "secondary": "#fafafa",
                    "background": "#ffffff",
                    "surface": "#f5f5f5",
                    "text": "#171717"
                },
                "typography": {
                    "font": "Inter",
                    "scale": "compact",
                    "weights": ["400", "700"]
                },
                "spacing": "compact",
                "borderRadius": "none",
                "shadow": "none"
            },
            "layoutStrategy": {
                "productType": "Fashion Store",
                "uiStyle": "monochrome editorial layout",
                "visualIdentity": "Pure contrast, massive typography, raw grids",
                "layoutStrategy": "masonry presentation",
                "density": "compact",
                "tone": "professional",
                "modernInfluences": ["vercel", "linear"]
            },
            "components": [
                {"id": "nav-1", "type": "navbar", "variant": "sticky", "props": {"logo": "MarketLane", "links": ["New Arrivals", "Collections", "Sale"]}},
                {"id": "hero-1", "type": "hero", "variant": "centered", "props": {"title": "Summer Collection 2026", "subtitle": "Discover premium linen, lightweight wool, and refined outerwear.", "cta": "Shop Now"}},
                {"id": "features-1", "type": "features", "variant": "grid", "props": {"items": [{"title": "Classic Tee", "description": "100% Organic Pima Cotton. $29"}, {"title": "Linen Trousers", "description": "Italian linen yarn, regular fit. $79"}]}},
                {"id": "footer-1", "type": "footer", "variant": "simple", "props": {"copyright": "© 2026 MarketLane", "links": ["Privacy Policy", "Terms"]}}
            ]
        })

    return DEFAULT_RESPONSE

async def generate_ui_design(user_text: str) -> Dict[str, Any]:
    logger.info("Generating UI design for user prompt: %s", user_text)
    llm = get_llm()
    if llm is None:
        logger.warning("No external LLM available; using fallback prompt-based generation.")
        return generate_ui_from_prompt(user_text)

    try:
        rag_docs = retrieve_relevant_docs(user_text)
        logger.info("Retrieved RAG docs. prompt=%s", user_text)

        prompt = PromptTemplate(
            input_variables=["rag_docs", "text"],
            template=PROMPT_TEMPLATE,
        )
        chain = LLMChain(llm=llm, prompt=prompt)

        response_text = await _execute_chain(chain, {"rag_docs": rag_docs, "text": user_text})
        logger.info("Raw LLM response received: %s", response_text)

        parsed = _extract_json(response_text)
        
        # Verify schema keys accepting either design or designSystem structure
        if "components" not in parsed or ("design" not in parsed and "designSystem" not in parsed):
            raise ValueError("JSON response missing required fields (components, design or designSystem)")
            
        # Post-process parsed response to enforce strict default component schemas
        return enforce_component_schema(parsed)
    except Exception as exc:
        logger.error("UI generation failed: %s", exc, exc_info=True)
        return generate_ui_from_prompt(user_text)
