import json
import logging
import re
from typing import Optional
from backend.app.pipeline.models import DesignPlan, DesignContext
from backend.app.services.ai_router import generate_ai

logger = logging.getLogger(__name__)

DESIGN_PLANNING_SYSTEM_PROMPT = """
You are an expert AI software architect and UI/UX designer.
Your job is to take the user's intent and explicit requirements, and formulate a high-level structural blueprint.
You MUST respond with ONLY a valid JSON object matching this schema:

{
  "product_name": "string (e.g., 'NexusApp', generated if not provided)",
  "tagline": "string (a short, catchy tagline)",
  "layout_archetype": "string (e.g., 'centered-stack', 'left-sidebar', 'bento-grid', 'split-screen')",
  "content_flow": ["Hero", "Features", "Pricing", "Footer"] // Array of section names in order
}

Do not include any other text, markdown blocks, or explanations. Only the raw JSON object.
"""

class DesignPlanner:
    async def process(self, context: DesignContext) -> DesignContext:
        """
        Analyzes the context and updates it with the design structural plan.
        """
        logger.info("Starting Design Planning phase.")
        try:
            intent_dict = context.intent.model_dump() if context.intent else {}
            reqs_dict = context.requirements.model_dump() if context.requirements else {}
            
            prompt_payload = (
                f"User Prompt: {context.prompt}\n"
                f"Parsed Intent: {json.dumps(intent_dict)}\n"
                f"Extracted Requirements: {json.dumps(reqs_dict)}"
            )
            
            response = await generate_ai(
                task_type="design_planning",
                system_prompt=DESIGN_PLANNING_SYSTEM_PROMPT,
                user_prompt=prompt_payload,
                temperature=0.2,
                stream=False
            )
            
            content = response.choices[0].message.content.strip()
            
            # Clean up potential markdown blocks
            content = re.sub(r'^```(?:json)?\s*\n?', '', content, flags=re.IGNORECASE)
            content = re.sub(r'\n?```\s*$', '', content)
            
            parsed_json = json.loads(content)
            
            # If the user explicitly provided a brand name, override the generated one
            if context.requirements and context.requirements.brand_name:
                parsed_json["product_name"] = context.requirements.brand_name
                
            design_plan = DesignPlan(**parsed_json)
            context.design_plan = design_plan
            logger.info(f"Design Plan successfully created: {design_plan}")
            
        except Exception as e:
            logger.error(f"Failed to create design plan, using fallback. Error: {e}")
            # Fallback
            context.design_plan = DesignPlan(
                product_name="UI Studio",
                tagline="Innovate your workflow",
                layout_archetype="centered-stack",
                content_flow=["Navbar", "Hero", "Features", "Footer"]
            )
            
        return context
