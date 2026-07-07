import json
import logging
import re
from backend.app.pipeline.models import ComponentPlan, ComponentSpec, DesignContext
from backend.app.services.ai_router import generate_ai

logger = logging.getLogger(__name__)

COMPONENT_PLANNING_SYSTEM_PROMPT = """
You are an expert React UI Component Architect.
Based on the high-level content flow and layout plan, map out the exact list of components that must be built.
You MUST respond with ONLY a valid JSON object matching this schema:

{
  "components": [
    {
      "name": "string (PascalCase name, e.g., 'HeroSection')",
      "role": "string (What this component does)",
      "assets_needed": ["string (images or icons needed)"]
    }
  ],
  "global_assets": ["string (e.g., 'company logo', 'background pattern')"]
}

Ensure you output every necessary section from the content flow as a discrete component.
Do not include any other text, markdown blocks, or explanations. Only the raw JSON object.
"""

class ComponentPlanner:
    async def process(self, context: DesignContext) -> DesignContext:
        """
        Analyzes the context and updates it with a specific ComponentPlan.
        """
        logger.info("Starting Component Planning phase.")
        try:
            design_dict = context.design_plan.model_dump() if context.design_plan else {}
            layout_dict = context.layout_plan.model_dump() if context.layout_plan else {}
            
            prompt_payload = (
                f"Design Blueprint (Content Flow): {json.dumps(design_dict.get('content_flow', []))}\n"
                f"Layout Plan: {json.dumps(layout_dict)}\n"
            )
            
            response = await generate_ai(
                task_type="component_planning",
                system_prompt=COMPONENT_PLANNING_SYSTEM_PROMPT,
                user_prompt=prompt_payload,
                temperature=0.2,
                stream=False
            )
            
            content = response.choices[0].message.content.strip()
            
            # Clean up potential markdown blocks
            content = re.sub(r'^```(?:json)?\s*\n?', '', content, flags=re.IGNORECASE)
            content = re.sub(r'\n?```\s*$', '', content)
            
            parsed_json = json.loads(content)
            
            # Validate component specs
            components = []
            for comp in parsed_json.get("components", []):
                components.append(ComponentSpec(**comp))
                
            component_plan = ComponentPlan(
                components=components,
                global_assets=parsed_json.get("global_assets", [])
            )
            
            context.component_plan = component_plan
            logger.info(f"Component Plan successfully created with {len(components)} components.")
            
        except Exception as e:
            logger.error(f"Failed to create component plan, using fallback. Error: {e}")
            # Fallback
            fallback_components = [
                ComponentSpec(name="HeroSection", role="Main intro", assets_needed=[]),
                ComponentSpec(name="FeaturesSection", role="List features", assets_needed=[])
            ]
            context.component_plan = ComponentPlan(
                components=fallback_components,
                global_assets=[]
            )
            
        return context
