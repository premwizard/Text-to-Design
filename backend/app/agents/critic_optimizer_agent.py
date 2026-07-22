import json
import logging
from backend.app.services.ai_router import generate_ai

logger = logging.getLogger("backend.app.agents.critic_optimizer")

CRITIC_SYSTEM_PROMPT = """You are a UI Evaluation Agent.
You will review the generated static web site files (index.html, style.css, script.js) and critique them based on strict Awwwards-quality professional UI/UX standards:
1. MUST contain complete semantic HTML5 structure with navigation, hero, features, pricing, testimonials, and footer.
2. MUST use real images or illustrations (from Unsplash or SVG) - reject empty whitespace/divs.
3. MUST use SVG or Unicode icons and CSS keyframes/animations.
4. MUST NOT use "Lorem Ipsum" - text must be realistic.
5. MUST contain CTAs, cards, visual density, gradients, glassmorphism, overlapping elements, and responsive layouts.
6. MUST NOT be simple linear vertical stacking. It MUST feature bento grids, grid layouts, or creative visual compositions.
7. MUST NOT use Tailwind/Bootstrap or external frameworks. Pure Vanilla CSS & Vanilla JS only.
If ANY of these conditions fail, you MUST return a score below 9.5 (e.g. 7.0). Only score 9.5-10.0 if the design is breathtakingly complex and beautiful.

You must ONLY return a JSON object with this exact schema (no markdown formatting, no explanations):
{
  "score": 8.5,
  "issues": ["List of identified issues..."],
  "recommendations": ["List of recommendations..."]
}

Output must start with { and end with }. No extra text.
"""

OPTIMIZATION_SYSTEM_PROMPT = """You are a UI Optimization Agent.
You will receive generated static web site files (index.html, style.css, script.js) and a Critic Report.
Your task is to fix all visual issues, improve spacing, colors, typography, hierarchy, and responsiveness based on the report.
Return the fully optimized code for ALL files.

Output ONLY a JSON object with this exact schema (no markdown formatting, no explanations):
{
  "files": {
    "index.html": "...",
    "style.css": "...",
    "script.js": "..."
  }
}

Output must start with { and end with }. No extra text.
"""

async def run_critic_agent(files: dict[str, str]) -> dict:
    logger.info("Running UI Critic Agent on generated files")
    
    files_content = ""
    for path, code in files.items():
        files_content += f"=== File: {path} ===\n{code}\n\n"
        
    user_prompt = f"Generated Files:\n{files_content}\n\nEvaluate the design and return the required JSON."
    
    try:
        response = await generate_ai(
            task_type="critic",
            system_prompt=CRITIC_SYSTEM_PROMPT,
            user_prompt=user_prompt,
            temperature=0.2,
            stream=False,
            max_tokens=4096
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
                logger.warning(f"JSON parsing failed in critic: {parse_err}. Attempting auto-repairs...")
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
            logger.info(f"UI Critic evaluated score: {score}")
            
            # Framework contamination check removed

            return {
                "score": score,
                "issues": parsed.get("issues", []),
                "recommendations": parsed.get("recommendations", [])
            }
        else:
            raise ValueError("No JSON object found in critic output")
            
    except Exception as exc:
        logger.error(f"Critic Agent failed: {exc}. Returning default score.")
        return {
            "score": 8.5,
            "issues": [],
            "recommendations": []
        }

async def run_optimization_agent(files: dict[str, str], critic_report: dict) -> dict[str, str]:
    logger.info("Running UI Optimization Agent")
    
    files_content = ""
    for path, code in files.items():
        files_content += f"=== File: {path} ===\n{code}\n\n"
        
    user_prompt = f"Generated Files:\n{files_content}\n\nCritic Report:\n{json.dumps(critic_report, indent=2)}\n\nFix the issues and return the optimized files."
    
    try:
        response = await generate_ai(
            task_type="optimizer",
            system_prompt=OPTIMIZATION_SYSTEM_PROMPT,
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
                logger.warning(f"JSON parsing failed in optimizer: {parse_err}. Attempting auto-repairs...")
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

            if "files" in parsed and parsed["files"]:
                from backend.project_runner import cleanGeneratedCode
                optimized_files = {}
                for k, v in parsed["files"].items():
                    orig_content = files.get(k, "")
                    if not v:
                        optimized_files[k] = orig_content
                        continue
                    cleaned = cleanGeneratedCode(v)
                    if len(cleaned.strip()) < 10:
                        optimized_files[k] = orig_content
                    else:
                        optimized_files[k] = cleaned
                
                # Preserve any files omitted
                for k, orig_content in files.items():
                    if k not in optimized_files:
                        optimized_files[k] = orig_content
                
                return optimized_files
            else:
                raise ValueError("No files returned by optimizer")
        else:
            raise ValueError("No JSON object found in optimizer output")
            
    except Exception as exc:
        logger.error(f"Optimization Agent failed: {exc}. Falling back to original files.")
        return files
