import re
import os

filepath = 'backend/routes/generate_ui.py'
with open(filepath, 'r', encoding='utf-8') as f:
    code = f.read()

# We want to replace the `if request.current_code: ... else: ...` block
# Let's locate the entire planner block and replace it.

search_pattern = r'            if request\.current_code:(.*?)            yield "data: \[DONE\]\\n\\n"'

# The new logic needs to handle both edit mode (request.current_code) and variations mode.

new_logic = """            if request.current_code:
                # EDIT MODE (Single Variation)
                try:
                    parsed = json.loads(request.current_code)
                    meta_str = json.dumps(parsed.get("meta", {}), indent=2)
                except Exception:
                    meta_str = "{}"

                system_instructions = (
                    EDIT_SYSTEM_PROMPT
                    .replace('{meta}', meta_str)
                    .replace('{current_files}', request.current_code)
                    .replace('{edit_prompt}', request.prompt)
                )
                user_message = f"Edit request: {request.prompt}"
                
                response = generate_ai(
                    task_type="editor",
                    system_prompt=system_instructions,
                    user_prompt=user_message,
                    temperature=1.0,
                    stream=True
                )
                
                full_code = ""
                async for chunk in response:
                    if isinstance(chunk, dict):
                        if chunk.get("type") == "fallback":
                            full_code = ""
                            yield f"data: {json.dumps({'type': 'fallback', 'message': chunk.get('message')})}\\n\\n"
                            continue
                        elif chunk.get("type") == "emergency":
                            yield f"data: {json.dumps({'error': chunk.get('message')})}\\n\\n"
                            continue
                    
                    content = chunk.choices[0].delta.content if hasattr(chunk, "choices") else None
                    if content:
                        full_code += content
                        yield f"data: {json.dumps({'chunk': content})}\\n\\n"

                # Parse and write files
                cleaned = full_code.strip()
                cleaned = re.sub(r'^```(?:json|jsx|javascript|js|react|tsx|ts)?\s*\\n?', '', cleaned, flags=re.IGNORECASE)
                cleaned = re.sub(r'\\n?```\s*$', '', cleaned)
                cleaned = re.sub(r'^<!--.*?-->\s*', '', cleaned, flags=re.DOTALL)
                cleaned = re.sub(r'\s*<!--.*?-->$', '', cleaned, flags=re.DOTALL)
                cleaned = cleaned.strip()

                start_idx = cleaned.find('{')
                end_idx = cleaned.rfind('}')
                if start_idx != -1 and end_idx != -1:
                    json_str = cleaned[start_idx:end_idx+1]
                    try:
                        parsed_data = json.loads(json_str)
                    except json.JSONDecodeError as first_err:
                        repaired = _repair_json_escapes(json_str)
                        try:
                            parsed_data = json.loads(repaired)
                        except json.JSONDecodeError as second_err:
                            truncation_repaired = _repair_truncated_json(repaired)
                            parsed_data = json.loads(truncation_repaired)
                else:
                    raise ValueError("No valid JSON object found in response")
                
                files = parsed_data.get("files", {})
                from backend.project_runner import cleanGeneratedCode, write_files, start_vite, vite_is_running
                cleaned_files = {k: cleanGeneratedCode(v) for k, v in files.items()}
                
                # Single variation defaults to root or varA (if the UI expects a var)
                # But for backwards compatibility, just use the variation_id from frontend if passed. 
                # Actually, edits don't need a variation loop, but they do need to be written to the correct folder.
                # In Edit mode, frontend handles save_files itself usually, but backend `/stream-jsx` does it too.
                # We'll just write it to root for now, or we can skip writing in `/stream-jsx` entirely and let frontend call `/save-files`!
                write_files(cleaned_files)
                if not vite_is_running():
                    await start_vite()
                    
            else:
                # ─── GENERATE VARIATIONS ────────────────────────
                planner_prompt = PLANNER_PROMPT.format(user_prompt=request.prompt)
                
                try:
                    yield f"data: {json.dumps({'type': 'timeline', 'step': 'Understanding Prompt'})}\\n\\n"
                    await anyio.sleep(0.2)
                    yield f"data: {json.dumps({'type': 'timeline', 'step': 'Determining Page Type'})}\\n\\n"
                    await anyio.sleep(0.2)
                    yield f"data: {json.dumps({'type': 'timeline', 'step': 'Building 4 Distinct Design Plans'})}\\n\\n"

                    planner_resp = await generate_ai(
                        task_type="planner",
                        system_prompt=None,
                        user_prompt=planner_prompt,
                        temperature=1.0,
                        stream=False
                    )
                    planner_output = planner_resp.choices[0].message.content.strip()
                    
                    start_idx = planner_output.find('[')
                    end_idx = planner_output.rfind(']')
                    if start_idx != -1 and end_idx != -1:
                        plans = json.loads(planner_output[start_idx:end_idx+1])
                        if not isinstance(plans, list):
                            plans = [plans]
                        plans = plans[:4] # limit to 4
                    else:
                        raise ValueError("No JSON array found in planner output")
                        
                    yield f"data: {json.dumps({'type': 'plans', 'plans': plans})}\\n\\n"
                    await anyio.sleep(0.5)
                except Exception as e:
                    logging.error(f"Planner failed: {e}")
                    raise e
                
                for i, plan in enumerate(plans):
                    variation_id = plan.get("id", f"var{i}")
                    
                    yield f"data: {json.dumps({'type': 'timeline', 'variation_id': variation_id, 'step': f'Building Variation {i+1}'})}\\n\\n"
                    
                    font_heading = plan.get("font_heading", "Inter")
                    font_body = plan.get("font_body", "Inter")
                    sections = plan.get("sections", [])
                    if not sections:
                        sections = ["Navbar", "Hero", "Footer"]
                    
                    sections_numbered = "1. App.jsx\\n"
                    for j, sec in enumerate(sections, start=2):
                        sections_numbered += f"{j}. components/{sec}.jsx\\n"

                    system_instructions = BUILDER_PROMPT.format(
                        page_type=plan.get("page_type", "landing"),
                        product_name=plan.get("product_name", "App"),
                        tagline=plan.get("tagline", ""),
                        design_archetype=plan.get("design_archetype", "apple"),
                        layout_system=plan.get("layout_system", "centered-stack"),
                        visual_style=plan.get("visual_style", "glassmorphism"),
                        interaction_style=plan.get("interaction_style", "hover-reveal"),
                        design_seed=plan.get("design_seed", 1234),
                        aesthetic=plan.get("aesthetic", "minimal"),
                        font_heading=font_heading,
                        font_body=font_body,
                        font_heading_url=font_heading.replace(" ", "+"),
                        font_body_url=font_body.replace(" ", "+"),
                        bg_color=plan.get("bg_color", "bg-white"),
                        primary_color=plan.get("primary_color", "blue-500"),
                        text_color=plan.get("text_color", "text-slate-900"),
                        layout_notes=plan.get("layout_notes", ""),
                        sections_numbered=sections_numbered,
                        user_prompt=request.prompt
                    )
                    
                    response = generate_ai(
                        task_type="builder",
                        system_prompt=system_instructions,
                        user_prompt="Generate the code.",
                        temperature=1.0,
                        stream=True
                    )
                    
                    full_code = ""
                    async for chunk in response:
                        if isinstance(chunk, dict):
                            continue
                        content = chunk.choices[0].delta.content if hasattr(chunk, "choices") else None
                        if content:
                            full_code += content
                            yield f"data: {json.dumps({'chunk': content, 'variation_id': variation_id})}\\n\\n"
                    
                    # Instead of parsing and writing files on backend, we will just send variation_complete.
                    # The frontend already accumulates the code and can call /save-files!
                    yield f"data: {json.dumps({'type': 'variation_complete', 'variation_id': variation_id})}\\n\\n"
                    await anyio.sleep(0.5)

            yield "data: [DONE]\\n\\n"
"""

match = re.search(search_pattern, code, flags=re.DOTALL)
if match:
    code = code.replace(match.group(0), new_logic)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(code)
    print("Successfully replaced block in generate_ui.py")
else:
    print("Could not find block to replace.")
