import json
import logging
from backend.services.ai_router import generate_ai

logger = logging.getLogger("backend.agents.edit")

CLASSIFIER_SYSTEM_PROMPT = """You are an AI UI Edit Planner and Intent Classifier.
Analyze the user's natural language edit prompt relative to the current project components and design specifications, then classify the edit intent and plan which files must be patched.

Classify editType into one of these exact categories:
1. "theme_update": Dark/light mode flips, color systems, bg swaps.
2. "style_update": Aesthetics like glassmorphism, neo-brutalism, apple-style, minimal.
3. "layout_update": Spacing sizes, padding/margins, alignment, column counts, section ordering.
4. "component_update": Adding a new component (e.g. TestimonialsCarousel), removing a section, adding items.
5. "ux_improvement": Boosting CTA contrast, typography sizing, mobile wrapping accessibility.

Identify which files in the current project files list will be affected.
Output ONLY a valid JSON object matching this exact schema (no explanations, no markdown fences):
{
  "editType": "style_update",
  "affectedComponents": [
    "components/HeroSection.jsx",
    "App.jsx"
  ],
  "changes": [
    "Switch background to deep slate dark blue gradient",
    "Add border ring highlights to the main CTA button"
  ]
}

Output must start with { and end with }. No extra text.
"""

class EditAgent:
    """
    Classifies user conversational edits and plans patch scopes.
    """
    
    def __init__(self):
        pass

    async def plan_edit(self, edit_prompt: str, current_files: dict, design_metadata: dict = None) -> dict:
        logger.info(f"Classifying edit intent and planning patches for: '{edit_prompt}'")
        
        # Prepare list of existing files
        existing_filenames = list(current_files.keys())
        
        user_message = (
            f"User Edit Prompt: '{edit_prompt}'\n"
            f"Existing Project Files: {existing_filenames}\n"
            f"Current Design Metadata: {json.dumps(design_metadata or {})}\n"
        )
        
        try:
            response = await generate_ai(
                task_type="classifier",
                system_prompt=CLASSIFIER_SYSTEM_PROMPT,
                user_prompt=user_message,
                temperature=0.1,
                stream=False
            )
            output_text = response.choices[0].message.content.strip()
            
            if output_text.startswith("```"):
                output_text = output_text.strip("`").replace("json\n", "", 1).strip()
                
            start_idx = output_text.find('{')
            end_idx = output_text.rfind('}')
            if start_idx != -1 and end_idx != -1:
                json_str = output_text[start_idx:end_idx+1]
                parsed = json.loads(json_str)
                logger.info(f"Edit classification planned. Type: {parsed.get('editType')}. Affected files: {parsed.get('affectedComponents')}")
                return parsed
            else:
                raise ValueError("No JSON object found in classifier output")
                
        except Exception as exc:
            logger.error(f"Classifier planning failed: {exc}. Reverting to all files fallback.")
            return {
                "editType": "ux_improvement",
                "affectedComponents": existing_filenames,
                "changes": [f"Apply changes requested: {edit_prompt}"]
            }

async def run_edit_planning(edit_prompt: str, current_files: dict, design_metadata: dict = None) -> dict:
    agent = EditAgent()
    return await agent.plan_edit(edit_prompt, current_files, design_metadata)
