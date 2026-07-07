import json
import logging
import re
from typing import Optional
from backend.app.pipeline.models import ThemePlan, DesignContext
from backend.app.services.ai_router import generate_ai

logger = logging.getLogger(__name__)

THEME_PLANNING_SYSTEM_PROMPT = """
You are an expert AI visual designer.
Your job is to determine the optimal color palette, typography, and visual style for the website based on the user's intent, explicit requirements, and structural blueprint.
You MUST respond with ONLY a valid JSON object matching this schema:

{
  "font_heading": "string (e.g., 'Inter', 'Space Grotesk', 'Playfair Display')",
  "font_body": "string (e.g., 'Roboto', 'Inter', 'Open Sans')",
  "primary_color": "string (e.g., 'indigo-500', '#3b82f6')",
  "secondary_color": "string (e.g., 'fuchsia-500', '#ec4899')",
  "bg_color": "string (e.g., 'bg-white', 'bg-slate-950')",
  "text_color": "string (e.g., 'text-slate-900', 'text-slate-50')",
  "visual_style": "string (e.g., 'glassmorphism', 'flat', 'neumorphism', 'brutalism', 'minimal')"
}

Ensure colors align with Tailwind CSS conventions where possible.
Do not include any other text, markdown blocks, or explanations. Only the raw JSON object.
"""

class ThemePlanner:
    async def process(self, context: DesignContext) -> DesignContext:
        """
        Analyzes the context and updates it with the visual theme plan.
        """
        logger.info("Starting Theme Planning phase.")
        try:
            intent_dict = context.intent.model_dump() if context.intent else {}
            reqs_dict = context.requirements.model_dump() if context.requirements else {}
            design_dict = context.design_plan.model_dump() if context.design_plan else {}
            
            prompt_payload = (
                f"User Prompt: {context.prompt}\n"
                f"Parsed Intent: {json.dumps(intent_dict)}\n"
                f"Extracted Requirements: {json.dumps(reqs_dict)}\n"
                f"Design Blueprint: {json.dumps(design_dict)}"
            )
            
            response = await generate_ai(
                task_type="theme_planning",
                system_prompt=THEME_PLANNING_SYSTEM_PROMPT,
                user_prompt=prompt_payload,
                temperature=0.3,
                stream=False
            )
            
            content = response.choices[0].message.content.strip()
            
            # Clean up potential markdown blocks
            content = re.sub(r'^```(?:json)?\s*\n?', '', content, flags=re.IGNORECASE)
            content = re.sub(r'\n?```\s*$', '', content)
            
            parsed_json = json.loads(content)
            theme_plan = ThemePlan(**parsed_json)
            context.theme_plan = theme_plan
            logger.info(f"Theme Plan successfully created: {theme_plan}")
            
        except Exception as e:
            logger.error(f"Failed to create theme plan, using fallback. Error: {e}")
            # Fallback
            context.theme_plan = ThemePlan(
                font_heading="Inter",
                font_body="Inter",
                primary_color="blue-600",
                secondary_color="indigo-500",
                bg_color="bg-white",
                text_color="text-slate-900",
                visual_style="minimal"
            )
            
        return context
