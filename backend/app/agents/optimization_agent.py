import json
import logging
from backend.app.services.ai_router import generate_ai

logger = logging.getLogger("backend.app.agents.optimization")

SYSTEM_PROMPT = """You are a React + Tailwind CSS Optimization Agent.
You take existing code files and a list of design issues identified by a UI Critic (including code reviews and visual/screenshot feedback from a Vision Agent), then output optimized, polished, and bug-free versions of all files.

Your changes must:
1. Fix every visual issue listed by the critic (increase padding/margins for spacing issues, adjust text colors for contrast/accessibility issues, fix responsive breakpoints for element overflows, reposition sections for visual hierarchy).
2. Enhance UI premium details (add hover scale effects, glassmorphic shadows, smooth transitions: 'transition-all duration-300').
3. Keep the file names and structure identical.
4. Do NOT import or use 'lucide-react-native'. Use standard 'lucide-react' for web icons.
5. Allowed packages are: react, react-dom, lucide-react, react-router-dom. Do NOT import or use 'framer-motion', 'recharts', 'chart.js', or any external packages.

Output ONLY a single JSON object containing all modified and unmodified files with this exact schema (no markdown formatting, no descriptions):
{
  "files": {
    "App.jsx": "...",
    "components/Navbar.jsx": "...",
    "components/HeroSection.jsx": "..."
  }
}

Output must start with { and end with }. No extra text.
"""

async def run_optimization(files: dict[str, str], critic_feedback: dict, is_single_mode: bool = False) -> dict:
    logger.info("Running Optimization Agent to fix critic and vision issues")
    
    # Construct the query payload
    files_payload = json.dumps({"files": files}, indent=2)
    critic_issues = json.dumps(critic_feedback, indent=2)
    
    user_prompt = f"Original Files:\n{files_payload}\n\nCritic & Visual Issues:\n{critic_issues}\n\nOptimize all files and output the full updated JSON object."
    
    sys_prompt = SYSTEM_PROMPT
    if is_single_mode:
        sys_prompt += "\nSince this is a high-priority premium run, you MUST perform an extremely thorough, aggressive optimization. Carefully inspect every layout parameter: ensure spacing is perfectly consistent, apply beautiful hover micro-interactions, add smooth transitions, enhance colors for visual prestige, and make sure responsive design breakpoints are handled flawlessly with zero truncation or text overlap."
        
    try:
        response = await generate_ai(
            task_type="optimization",
            system_prompt=sys_prompt,
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
                logger.warning(f"Optimization JSON parsing failed: {parse_err}. Attempting auto-repairs...")
                from backend.app.utils.jsx_parser import _repair_json_escapes, _repair_truncated_json
                try:
                    repaired = _repair_json_escapes(json_str)
                    parsed = json.loads(repaired)
                except json.JSONDecodeError:
                    try:
                        truncation_repaired = _repair_truncated_json(repaired)
                        parsed = json.loads(truncation_repaired)
                    except json.JSONDecodeError as final_err:
                        logger.error(f"JSON repair failed to restore a valid object: {final_err}")
                        raise final_err

            if "files" in parsed:
                from backend.project_runner import cleanGeneratedCode
                result = {}
                for k, v in parsed["files"].items():
                    orig_content = files.get(k, "")
                    if not v:
                        logger.warning(f"Optimization Agent returned empty code for '{k}'. Falling back to original content.")
                        result[k] = orig_content
                        continue
                    cleaned = cleanGeneratedCode(v)
                    if len(cleaned.strip()) < 30 or ("export default" not in cleaned and orig_content):
                        logger.warning(f"Optimization Agent returned malformed/incomplete code for '{k}'. Falling back to original content.")
                        result[k] = orig_content
                    else:
                        result[k] = cleaned
                # Preserve any original files omitted from the parsed result
                for k, orig_content in files.items():
                    if k not in result:
                        result[k] = orig_content
                return result
            else:
                return files
        else:
            raise ValueError("No JSON object found in optimization output")
            
    except Exception as exc:
        logger.error(f"Optimization Agent failed: {exc}. Returning original files unchanged.")
        return files

