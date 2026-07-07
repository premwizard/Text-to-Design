import json
import logging
import re
from typing import Optional
from backend.app.pipeline.models import UserIntent, DesignContext
from backend.app.services.ai_router import generate_ai

logger = logging.getLogger(__name__)

INTENT_DETECTION_SYSTEM_PROMPT = """
You are an expert AI designer's intent classification module.
Your job is to analyze the user's prompt and extract their core intent.
You MUST respond with ONLY a valid JSON object matching this schema:

{
  "primary_industry": "string (e.g., 'e-commerce', 'portfolio', 'saas', 'blog', 'general')",
  "page_type": "string (e.g., 'landing page', 'dashboard', 'pricing page', 'contact page')",
  "theme": "string (e.g., 'minimalist', 'dark mode', 'playful', 'professional')"
}

Do not include any other text, markdown blocks, or explanations. Only the raw JSON object.
"""

class IntentDetector:
    async def process(self, context: DesignContext) -> DesignContext:
        """
        Analyzes the prompt and updates the context with the user intent.
        """
        logger.info("Starting Intent Detection phase.")
        try:
            response = await generate_ai(
                task_type="intent_detection",
                system_prompt=INTENT_DETECTION_SYSTEM_PROMPT,
                user_prompt=context.prompt,
                temperature=0.1,
                stream=False
            )
            
            content = response.choices[0].message.content.strip()
            
            # Clean up potential markdown blocks
            content = re.sub(r'^```(?:json)?\s*\n?', '', content, flags=re.IGNORECASE)
            content = re.sub(r'\n?```\s*$', '', content)
            
            parsed_json = json.loads(content)
            intent = UserIntent(**parsed_json)
            context.intent = intent
            logger.info(f"Intent successfully detected: {intent}")
            
        except Exception as e:
            logger.error(f"Failed to detect intent, using fallback. Error: {e}")
            # Fallback
            context.intent = UserIntent(
                primary_industry="general",
                page_type="landing page",
                theme="modern"
            )
            
        return context
