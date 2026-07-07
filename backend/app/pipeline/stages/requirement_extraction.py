import json
import logging
import re
from typing import Optional
from backend.app.pipeline.models import ExtractedRequirements, DesignContext
from backend.app.services.ai_router import generate_ai

logger = logging.getLogger(__name__)

REQUIREMENT_EXTRACTION_SYSTEM_PROMPT = """
You are an expert AI designer's requirement extraction module.
Your job is to analyze the user's prompt (and their overarching intent) and extract explicitly mentioned requirements.
You MUST respond with ONLY a valid JSON object matching this schema:

{
  "explicit_colors": ["color1", "color2"], // List of exact colors mentioned
  "required_sections": ["section1", "section2"], // E.g., 'navbar', 'hero', 'footer', 'testimonials'
  "special_features": ["feature1"], // E.g., 'animations', 'parallax', 'dark mode toggle'
  "brand_name": "string or null" // The name of the brand/product if mentioned, otherwise null
}

If a field is not explicitly mentioned or implied strongly, leave it empty/null.
Do not include any other text, markdown blocks, or explanations. Only the raw JSON object.
"""

class RequirementExtractor:
    async def process(self, context: DesignContext) -> DesignContext:
        """
        Analyzes the prompt and updates the context with extracted requirements.
        """
        logger.info("Starting Requirement Extraction phase.")
        try:
            intent_str = f"Intent Context: Industry: {context.intent.primary_industry}, Page Type: {context.intent.page_type}, Theme: {context.intent.theme}" if context.intent else "Intent Context: None"
            
            prompt_payload = f"{intent_str}\n\nUser Prompt: {context.prompt}"
            
            response = await generate_ai(
                task_type="requirement_extraction",
                system_prompt=REQUIREMENT_EXTRACTION_SYSTEM_PROMPT,
                user_prompt=prompt_payload,
                temperature=0.1,
                stream=False
            )
            
            content = response.choices[0].message.content.strip()
            
            # Clean up potential markdown blocks
            content = re.sub(r'^```(?:json)?\s*\n?', '', content, flags=re.IGNORECASE)
            content = re.sub(r'\n?```\s*$', '', content)
            
            parsed_json = json.loads(content)
            requirements = ExtractedRequirements(**parsed_json)
            context.requirements = requirements
            logger.info(f"Requirements successfully extracted: {requirements}")
            
        except Exception as e:
            logger.error(f"Failed to extract requirements, using fallback. Error: {e}")
            # Fallback
            context.requirements = ExtractedRequirements(
                explicit_colors=[],
                required_sections=[],
                special_features=[],
                brand_name=None
            )
            
        return context
