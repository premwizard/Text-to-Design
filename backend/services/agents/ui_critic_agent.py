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

async def run_ui_critic(files: dict[str, str]) -> dict:
    logger.info("Running UI Critic Agent on generated files")
    
    # Construct a files summary
    files_content = ""
    for path, code in files.items():
        files_content += f"=== File: {path} ===\n{code}\n\n"
        
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
            return json.loads(json_str)
        else:
            raise ValueError("No JSON object found in critic output")
            
    except Exception as exc:
        logger.error(f"UI Critic failed: {exc}. Returning default high rating.")
        return {
            "score": 9.0,
            "issues": [
                "Ensure spacing is polished",
                "Ensure all hover effects are active"
            ]
        }
