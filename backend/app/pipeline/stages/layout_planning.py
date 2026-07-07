import json
import logging
import re
from backend.app.pipeline.models import LayoutPlan, DesignContext
from backend.app.services.ai_router import generate_ai

logger = logging.getLogger(__name__)

LAYOUT_PLANNING_SYSTEM_PROMPT = """
You are an expert Frontend Architect.
Your job is to determine the exact grid, layout, and spacing systems for a web page based on the structural Design Blueprint.
You MUST respond with ONLY a valid JSON object matching this schema:

{
  "navbar": "string ('top', 'side', or 'none')",
  "sidebar": "string ('left', 'right', or 'none')",
  "grid_system": "string (e.g., '12-column CSS grid', 'flex-column stack', 'asymmetrical bento grid')",
  "spacing_rules": "string (e.g., 'spacious', 'compact', 'standard Tailwind spacing')"
}

Do not include any other text, markdown blocks, or explanations. Only the raw JSON object.
"""

class LayoutPlanner:
    async def process(self, context: DesignContext) -> DesignContext:
        """
        Analyzes the context and updates it with a specific LayoutPlan.
        """
        logger.info("Starting Layout Planning phase.")
        try:
            design_dict = context.design_plan.model_dump() if context.design_plan else {}
            reqs_dict = context.requirements.model_dump() if context.requirements else {}
            
            prompt_payload = (
                f"Design Blueprint: {json.dumps(design_dict)}\n"
                f"Extracted Requirements: {json.dumps(reqs_dict)}\n"
            )
            
            response = await generate_ai(
                task_type="layout_planning",
                system_prompt=LAYOUT_PLANNING_SYSTEM_PROMPT,
                user_prompt=prompt_payload,
                temperature=0.2,
                stream=False
            )
            
            content = response.choices[0].message.content.strip()
            
            # Clean up potential markdown blocks
            content = re.sub(r'^```(?:json)?\s*\n?', '', content, flags=re.IGNORECASE)
            content = re.sub(r'\n?```\s*$', '', content)
            
            parsed_json = json.loads(content)
            layout_plan = LayoutPlan(**parsed_json)
            context.layout_plan = layout_plan
            logger.info(f"Layout Plan successfully created: {layout_plan}")
            
        except Exception as e:
            logger.error(f"Failed to create layout plan, using fallback. Error: {e}")
            # Fallback
            context.layout_plan = LayoutPlan(
                navbar="top",
                sidebar="none",
                grid_system="flex-column stack",
                spacing_rules="standard Tailwind spacing"
            )
            
        return context
