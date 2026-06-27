import json
import logging
from backend.services.ai_router import generate_ai

logger = logging.getLogger("backend.agents.ui_critic")

SYSTEM_PROMPT = """You are a UI Critic Agent in a multi-agent AI design system.
You will review the generated React component code files and critique them.

Assess the files on the following dimensions:
1. Typography hierarchy (proper font sizes, weights, readability).
2. Spacing consistency (margins, paddings, alignment).
3. Color harmony (contrast ratio, accent color consistency, text readability on bg).
4. Responsiveness (correct breakpoints, flex/grid wraps).
5. Accessibility (labels, button accessibility details, semantic tags).
6. Visual hierarchy (clear focal point, CTA positioning).

Output ONLY a JSON object with this exact schema (do not output any explanation or markdown fences):
{
  "score": 8.5,
  "issues": [
    "Weak CTA visibility on mobile hero",
    "Missing hover transitions on secondary navbar buttons",
    "Insufficient color contrast for small text in footer",
    "Spacing is tight around card grid columns on tablets"
  ]
}

Output must start with { and end with }. No extra text.
"""

async def run_ui_critic(files: dict[str, str], vision_feedback: dict = None) -> dict:
    logger.info("Running UI Critic Agent on generated files")
    
    # 1. STEP 1: Text-Based Code Review (Text Score)
    files_content = ""
    for path, code in files.items():
        files_content += f"=== File: {path} ===\n{code}\n\n"
        
    text_score = 8.5
    text_issues = []
    
    try:
        response = await generate_ai(
            task_type="ui_critic",
            system_prompt=SYSTEM_PROMPT,
            user_prompt=f"Review these generated files:\n{files_content}",
            temperature=0.3,
            stream=False
        )
        output_text = response.choices[0].message.content.strip()
        
        if output_text.startswith("```"):
            output_text = output_text.strip("`").replace("json\n", "", 1).strip()
            
        start_idx = output_text.find('{')
        end_idx = output_text.rfind('}')
        if start_idx != -1 and end_idx != -1:
            json_str = output_text[start_idx:end_idx+1]
            parsed_text = json.loads(json_str)
            text_score = float(parsed_text.get("score", 8.5))
            text_issues = parsed_text.get("issues", [])
        else:
            raise ValueError("No JSON object found in critic output")
            
    except Exception as exc:
        logger.error(f"Text UI Critic failed: {exc}. Using fallback values.")
        text_score = 8.5
        text_issues = ["Ensure padding offsets are consistent", "Check small font weights for accessibility"]

    # 2. STEP 2: Vision-Based Review Integration
    if vision_feedback and isinstance(vision_feedback, dict):
        logger.info("Merging Vision Agent feedback into UI Critic report...")
        vision_score = float(vision_feedback.get("overallScore", 8.0))
        vision_issues = vision_feedback.get("issues", [])
        
        # Calculate combined score: 40% text, 60% vision
        final_score = round((0.4 * text_score) + (0.6 * vision_score), 2)
        combined_issues = list(set(text_issues + vision_issues))
        
        logger.info(f"Hybrid Score calculated: {final_score} (Text: {text_score}, Vision: {vision_score})")
        return {
            "score": final_score,
            "issues": combined_issues,
            "textScore": text_score,
            "visionScore": vision_score,
            "optimizationTargets": combined_issues
        }
    else:
        logger.warning("Vision feedback missing. Reverting to 100% text-based UI Critic scores.")
        return {
            "score": text_score,
            "issues": text_issues,
            "textScore": text_score,
            "visionScore": text_score,
            "optimizationTargets": text_issues
        }
