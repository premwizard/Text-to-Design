import json
import logging
from backend.app.services.ai_router import generate_ai

logger = logging.getLogger("backend.app.agents.critic_optimizer")

SYSTEM_PROMPT = """You are a Unified UI Evaluation & Optimization Agent.
You will review the generated React component code files and critique them based on:
1. Typography hierarchy, Spacing consistency, Color harmony, Responsiveness, Accessibility, Visual hierarchy.
2. Framework compatibility (only allowed: react, lucide-react, react-router-dom).

First, assign a score out of 10.0 based on these dimensions.
If the score is > 8.0, the UI is acceptable. You must ONLY return the score and issues.
If the score is <= 8.0, you must ALSO fix all visual issues, enhance premium details (hover effects, shadows, transitions), and output the fully optimized code for ALL files.

Output ONLY a JSON object with this exact schema (no markdown formatting, no explanations):
{
  "score": 8.5,
  "issues": ["List of identified issues..."],
  "files": {
    "App.jsx": "...",
    "components/Navbar.jsx": "..."
  }
}

NOTE: Omit the "files" key entirely if the score is strictly greater than 8.0.
Output must start with { and end with }. No extra text.
"""

async def run_critic_optimizer(files: dict[str, str], vision_feedback: dict = None) -> dict:
    logger.info("Running Unified Critic & Optimizer Agent on generated files")
    
    files_content = ""
    for path, code in files.items():
        files_content += f"=== File: {path} ===\n{code}\n\n"
        
    user_prompt = f"Generated Files:\n{files_content}\n\n"
    if vision_feedback:
        user_prompt += f"Vision Agent Feedback (Consider these strongly in your score and fixes):\n{json.dumps(vision_feedback, indent=2)}\n\n"
        
    user_prompt += "Evaluate the design and optionally optimize all files if the score is <= 8.0."
    
    try:
        response = await generate_ai(
            task_type="critic_optimizer",
            system_prompt=SYSTEM_PROMPT,
            user_prompt=user_prompt,
            temperature=0.3,
            stream=False,
            max_tokens=8192
        )
        output_text = response.choices[0].message.content.strip()
        
        if output_text.startswith("```"):
            output_text = output_text.strip("`").replace("json\n", "", 1).strip()
            
        start_idx = output_text.find('{')
        end_idx = output_text.rfind('}')
        if start_idx != -1 and end_idx != -1:
            json_str = output_text[start_idx:end_idx+1]
            try:
                parsed = json.loads(json_str)
            except json.JSONDecodeError as parse_err:
                logger.warning(f"JSON parsing failed: {parse_err}. Attempting auto-repairs...")
                from backend.app.utils.jsx_parser import _repair_json_escapes, _repair_truncated_json
                try:
                    repaired = _repair_json_escapes(json_str)
                    parsed = json.loads(repaired)
                except json.JSONDecodeError:
                    try:
                        truncation_repaired = _repair_truncated_json(repaired)
                        parsed = json.loads(truncation_repaired)
                    except json.JSONDecodeError as final_err:
                        raise final_err

            score = float(parsed.get("score", 8.5))
            logger.info(f"Unified Critic evaluated score: {score}")
            
            # Framework contamination check
            from backend.app.services.validators.import_validator import validate_imports
            for path, code in files.items():
                is_valid, _ = validate_imports(code, path)
                if not is_valid:
                    score = min(score, 5.0)
                    logger.warning(f"Framework contamination detected in {path}! Forcing optimization.")

            result = {
                "score": score,
                "issues": parsed.get("issues", []),
                "files": files # Default to original files
            }
            
            # If the LLM returned files (presumably because score <= 8.0 or it found severe issues)
            if "files" in parsed and parsed["files"] and score <= 8.0:
                logger.info("Applying optimized files from LLM...")
                from backend.project_runner import cleanGeneratedCode
                optimized_files = {}
                for k, v in parsed["files"].items():
                    orig_content = files.get(k, "")
                    if not v:
                        optimized_files[k] = orig_content
                        continue
                    cleaned = cleanGeneratedCode(v)
                    if len(cleaned.strip()) < 30 or ("export default" not in cleaned and orig_content):
                        optimized_files[k] = orig_content
                    else:
                        optimized_files[k] = cleaned
                
                # Preserve any files omitted
                for k, orig_content in files.items():
                    if k not in optimized_files:
                        optimized_files[k] = orig_content
                
                result["files"] = optimized_files
                
            return result
        else:
            raise ValueError("No JSON object found in output")
            
    except Exception as exc:
        logger.error(f"Critic/Optimizer Agent failed: {exc}. Returning original files.")
        return {
            "score": 8.5,
            "issues": [],
            "files": files
        }
