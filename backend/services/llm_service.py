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
You are a senior UI/UX architect generator that writes ONLY valid JSON.
Your goal is to generate high-end, responsive, and interactive UI layouts based on user requests.

Page Types: landing, dashboard, ecommerce, portfolio, blog

Design System (design):
- primaryColor: Hex color (e.g., "#6366f1")
- secondaryColor: Hex color (e.g., "#0f172a")
- borderRadius: sm, md, lg, xl, full
- font: Google Font name (e.g., "Inter", "Outfit", "Manrope")

Component Structure:
- id: unique string (e.g., "hero-1")
- type: hero, navbar, cards, container, text, section, dashboard-stat, etc.
- variant: visual style (e.g., for hero: "split-image", "minimal", "gradient")
- image: { "url": "string", "alt": "string" }
- actions: [ { "type": "navigate"|"open-modal"|"submit-form", "target": "string" } ]
- style: { "theme": "light"|"dark", "align": "left"|"center"|"right", "padding": "small"|"medium"|"large" }
- layout: { "desktop": "grid-N"|"flex"|"stack", "tablet": "grid-N"|"stack", "mobile": "stack" }
- animation: { "type": "fade-up"|"fade-in"|"slide-right"|"zoom-in", "duration": float }
- props: component specific data
- children: [ UIComponent ] (Recursive nested components)

Reference patterns:
{rag_docs}

User request:
{text}

Instructions:
1. Choose the most appropriate 'page' type.
2. Define a cohesive 'design' object with professional colors and typography.
3. Generate a list of components. Use 'children' for nested layouts (e.g., a container holding text and buttons).
4. Use 'image' for visual elements and 'actions' for interactivity.
5. Output ONLY the JSON object.

Example JSON shape:
{
  "page": "landing",
  "design": {
    "primaryColor": "#6366f1",
    "secondaryColor": "#0f172a",
    "borderRadius": "lg",
    "font": "Inter"
  },
  "components": [
    {
      "id": "hero-1",
      "type": "hero",
      "variant": "split-image",
      "image": { "url": "https://images.unsplash.com/photo-1498050108023-c5249f4df085", "alt": "Tech Hero" },
      "actions": [ { "type": "navigate", "target": "/pricing" } ],
      "props": { "title": "Build Faster", "subtitle": "AI-powered UI" },
      "children": [
        { "id": "subtext-1", "type": "text", "props": { "value": "Trusted by 10k+ devs" } }
      ]
    }
  ]
}
"""

DEFAULT_RESPONSE = {
    "page": "landing",
    "design": {
        "primaryColor": "#6366f1",
        "secondaryColor": "#0f172a",
        "borderRadius": "lg",
        "font": "Outfit"
    },
    "components": [
        {
            "id": "nav-1",
            "type": "navbar",
            "variant": "standard",
            "style": {"theme": "light", "align": "center", "padding": "medium"},
            "layout": {"desktop": "flex", "tablet": "flex", "mobile": "stack"},
            "animation": {"type": "fade-in", "duration": 0.3},
            "props": {
                "logo": "UI Studio",
                "links": ["Home", "Features", "Contact"]
            },
            "actions": [{"type": "navigate", "target": "/"}]
        },
        {
            "id": "hero-1",
            "type": "hero",
            "variant": "split-image",
            "image": {"url": "https://images.unsplash.com/photo-1551434678-e076c223a692", "alt": "Team working"},
            "style": {"theme": "dark", "align": "left", "padding": "large"},
            "layout": {"desktop": "grid-2", "tablet": "stack", "mobile": "stack"},
            "animation": {"type": "fade-up", "duration": 0.8},
            "props": {
                "title": "Build your next page with confidence",
                "subtitle": "A complete landing flow powered by a dynamic prompt-driven UI generator."
            },
            "actions": [{"type": "navigate", "target": "#start"}],
            "children": [
                {
                    "id": "hero-badge",
                    "type": "text",
                    "variant": "badge",
                    "props": {"value": "New v2.0 is out!"}
                }
            ]
        },
        {
            "id": "features-1",
            "type": "cards",
            "variant": "grid",
            "style": {"theme": "light", "align": "left", "padding": "medium"},
            "layout": {"desktop": "grid-3", "tablet": "grid-2", "mobile": "stack"},
            "animation": {"type": "slide-right", "duration": 0.5},
            "props": {
                "items": [
                    {"title": "Fast Setup", "description": "Get a complete landing page structure instantly."},
                    {"title": "Flexible Layout", "description": "Render components from JSON without hardcoding."},
                    {"title": "Responsive Design", "description": "Built for web and mobile with clean styling."}
                ]
            }
        },
        {
            "id": "footer-1",
            "type": "footer",
            "variant": "simple",
            "style": {"theme": "dark", "align": "center", "padding": "small"},
            "layout": {"desktop": "flex", "tablet": "flex", "mobile": "stack"},
            "animation": {"type": "fade-in", "duration": 0.3},
            "props": {
                "copyright": "© 2026 Generated UI Studio",
                "links": ["Privacy", "Terms", "Support"]
            }
        }
    ],
}


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
    design_default = {
        "primaryColor": "#6366f1",
        "secondaryColor": "#0f172a",
        "borderRadius": "lg",
        "font": "Inter"
    }

    if "food" in prompt_lower or "restaurant" in prompt_lower or "cafe" in prompt_lower:
        return {
            "page": "landing",
            "design": design_default,
            "components": [
                {"id": "nav-1", "type": "navbar", "variant": "standard", "style": {"theme": "light", "align": "center", "padding": "medium"}, "layout": {"desktop": "flex", "tablet": "flex", "mobile": "stack"}, "animation": {"type": "fade-in", "duration": 0.3}, "props": {"logo": "FreshBites", "links": ["Menu", "About", "Locations", "Contact"]}, "actions": [{"type": "navigate", "target": "/menu"}]},
                {"id": "hero-1", "type": "hero", "variant": "split-image", "image": {"url": "https://images.unsplash.com/photo-1504674900247-0877df9cc836", "alt": "Gourmet food"}, "style": {"theme": "dark", "align": "left", "padding": "large"}, "layout": {"desktop": "grid-2", "tablet": "stack", "mobile": "stack"}, "animation": {"type": "fade-up", "duration": 0.5}, "props": {"title": "Delicious meals delivered fast", "subtitle": "Fresh ingredients, bold flavors."}, "actions": [{"type": "navigate", "target": "/order"}], "children": [{"id": "badge-1", "type": "text", "props": {"value": "Free delivery on first order!"}}]},
                {"id": "cards-1", "type": "cards", "variant": "grid", "style": {"theme": "light", "align": "left", "padding": "medium"}, "layout": {"desktop": "grid-3", "tablet": "grid-2", "mobile": "stack"}, "animation": {"type": "slide-right", "duration": 0.5}, "props": {"items": [{"title": "Seasonal Specials", "description": "Try our chef-curated dishes."}, {"title": "Online Ordering", "description": "Easy pickup."}, {"title": "Loyalty Rewards", "description": "Earn points."}]}},
                {"id": "footer-1", "type": "footer", "variant": "simple", "style": {"theme": "dark", "align": "center", "padding": "small"}, "layout": {"desktop": "flex", "tablet": "flex", "mobile": "stack"}, "animation": {"type": "fade-in", "duration": 0.3}, "props": {"copyright": "© 2026 FreshBites", "links": ["Privacy", "Terms"]}}
            ]
        }
    if "portfolio" in prompt_lower or "freelance" in prompt_lower or "designer" in prompt_lower:
        return {
            "page": "portfolio",
            "design": {"primaryColor": "#ec4899", "secondaryColor": "#1f2937", "borderRadius": "full", "font": "Manrope"},
            "components": [
                {"id": "hero-1", "type": "hero", "variant": "centered", "style": {"theme": "light", "align": "center", "padding": "large"}, "layout": {"desktop": "stack", "tablet": "stack", "mobile": "stack"}, "animation": {"type": "zoom-in", "duration": 0.6}, "props": {"title": "Crafting digital experiences", "subtitle": "Portfolio of a creative designer."}, "actions": [{"type": "navigate", "target": "/work"}]},
                {"id": "container-1", "type": "container", "variant": "grid", "layout": {"desktop": "grid-2", "tablet": "stack", "mobile": "stack"}, "props": {}, "children": [
                    {"id": "img-1", "type": "image", "image": {"url": "https://images.unsplash.com/photo-1541462608141-67571a670392", "alt": "Project 1"}, "props": {}},
                    {"id": "txt-1", "type": "text", "props": {"value": "Project alpha: A deep dive into branding."}}
                ]}
            ]
        }
    if "ecommerce" in prompt_lower or "shop" in prompt_lower or "store" in prompt_lower:
        return {
            "page": "ecommerce",
            "design": {"primaryColor": "#10b981", "secondaryColor": "#064e3b", "borderRadius": "md", "font": "Inter"},
            "components": [
                {"id": "nav-1", "type": "navbar", "variant": "sticky", "props": {"logo": "MarketLane", "links": ["Shop", "New Arrivals"]}, "actions": [{"type": "navigate", "target": "/cart"}]},
                {"id": "products-1", "type": "ecommerce-grid", "variant": "cards", "layout": {"desktop": "grid-4", "tablet": "grid-2", "mobile": "stack"}, "props": {"items": [{"title": "Classic Tee", "price": "$29", "image": "https://placehold.co/400x400"}]}}
            ]
        }
    if "dashboard" in prompt_lower or "admin" in prompt_lower or "panel" in prompt_lower:
        return {
            "page": "dashboard",
            "design": {"primaryColor": "#3b82f6", "secondaryColor": "#1e3a8a", "borderRadius": "sm", "font": "Roboto"},
            "components": [
                {"id": "stats-1", "type": "cards", "variant": "stats", "layout": {"desktop": "grid-4", "tablet": "grid-2", "mobile": "stack"}, "props": {"items": [{"title": "Revenue", "value": "$45,231"}]}},
                {"id": "modal-trigger", "type": "button", "props": {"label": "Quick Action"}, "actions": [{"type": "open-modal", "target": "action-modal"}]}
            ]
        }
    if "blog" in prompt_lower or "article" in prompt_lower or "news" in prompt_lower:
        return {
            "page": "blog",
            "design": design_default,
            "components": [
                {"id": "hero-1", "type": "hero", "variant": "minimal", "props": {"title": "Future of AI"}},
                {"id": "post-1", "type": "section", "children": [{"id": "post-content", "type": "text", "props": {"value": "Long form content here..."}}]}
            ]
        }

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
        if "page" not in parsed or "components" not in parsed or "design" not in parsed:
            raise ValueError("JSON response missing required fields (page, components, or design)")
        return parsed
    except Exception as exc:
        logger.error("UI generation failed: %s", exc, exc_info=True)
        return generate_ui_from_prompt(user_text)
