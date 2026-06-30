import json
import logging
import asyncio
import re
from backend.app.agents.memory_agent import run_memory_retrieval, update_user_memory
from backend.app.agents.prompt_understanding_agent import run_prompt_understanding
from backend.app.agents.rag_retrieval_agent import run_rag_retrieval
from backend.app.agents.design_planning_agent import run_design_planning
from backend.app.agents.full_app_generation import (
    run_full_app_generation,
    run_auto_fix_generation
)
from backend.app.agents.sanitizer_agent import run_code_sanitization
from backend.app.agents.code_validator_agent import run_code_validation
from backend.app.agents.vision_agent import run_vision_agent
from backend.app.services.vision.screenshot_service import capture_sandbox_screenshots
from backend.app.agents.ui_critic_agent import run_ui_critic
from backend.app.agents.optimization_agent import run_optimization
from backend.app.repositories.chroma_service import save_successful_generation

from backend.app.agents.edit_agent import run_edit_planning
from backend.app.services.editing.jsx_patch_engine import JSXPatchEngine
from backend.app.services.editing.history_service import EditHistoryService

logger = logging.getLogger("backend.app.agents.orchestrator")

async def run_orchestration_stream(user_prompt: str, user_id: str = None, generation_mode: str = "single_mode", variation_count: int = 1):
    """
    Executes the multi-agent pipeline for initial generation.
    Supports single_mode and variation_mode.
    """
    import time
    from backend.app.services.debug.debug_logger import session_id_var, DebugLogger
    session_id = f"session_{int(time.time())}"
    session_id_var.set(session_id)
    db_logger = DebugLogger(session_id)
    db_logger.log("GENERATION", "START", f"User Prompt: {user_prompt}\nGeneration Mode: {generation_mode}\nVariation Count: {variation_count}\nUser ID: {user_id}")
    
    yield {"type": "session_created", "session_id": session_id}
    
    try:
        # ==========================================
        # STEP 1: USER MEMORY RETRIEVAL
        # ==========================================
        logger.info(f"Executing Agent 1: Memory Retrieval for user: {user_id}")
        yield {"type": "timeline", "step": "Analyzing Prompt"}
        yield {"type": "agent_start", "agent": "memory", "message": "Loading personalized design profile and settings..."}
        
        try:
            memory_prefs = await run_memory_retrieval(user_id, user_prompt)
        except Exception as mem_err:
            logger.error(f"Memory retrieval failed: {mem_err}. Continuing with empty preferences.")
            memory_prefs = {}
            
        yield {"type": "agent_complete", "agent": "memory", "output": memory_prefs}
        await asyncio.sleep(0.3)

        # ==========================================
        # STEP 2: PROMPT UNDERSTANDING
        # ==========================================
        logger.info("Executing Agent 2: Prompt Understanding")
        yield {"type": "timeline", "step": "Understanding Prompt"}
        yield {"type": "agent_start", "agent": "understanding", "message": "Analyzing prompt requirements and blending design memory..."}
        
        intent_json = await run_prompt_understanding(user_prompt, memory_prefs)
        
        yield {"type": "agent_complete", "agent": "understanding", "output": intent_json}
        await asyncio.sleep(0.3)

        if generation_mode == "variation_mode":
            # ==========================================================
            # VARIATION MODE BRANCH
            # ==========================================================
            logger.info(f"Executing variations planner for {variation_count} variations")
            yield {"type": "timeline", "step": f"Building {variation_count} Distinct Design Plans"}
            yield {"type": "agent_start", "agent": "planning", "message": f"Formulating {variation_count} distinct layout and style concepts..."}
            
            from backend.app.core.prompts import PLANNER_PROMPT, BUILDER_PROMPT
            from backend.app.services.ai_router import generate_ai
            
            planner_prompt = PLANNER_PROMPT.format(user_prompt=user_prompt)
            
            planner_resp = await generate_ai(
                task_type="planner",
                system_prompt=None,
                user_prompt=planner_prompt,
                temperature=1.0,
                stream=False
            )
            planner_output = planner_resp.choices[0].message.content.strip()
            
            # Clean any backticks
            if planner_output.startswith("```"):
                planner_output = re.sub(r'^```(?:json)?\s*\n?', '', planner_output, flags=re.IGNORECASE)
                planner_output = re.sub(r'\n?```\s*$', '', planner_output)
                planner_output = planner_output.strip()
                
            start_idx = planner_output.find('[')
            end_idx = planner_output.rfind(']')
            if start_idx != -1 and end_idx != -1:
                plans = json.loads(planner_output[start_idx:end_idx+1])
                if not isinstance(plans, list):
                    plans = [plans]
                # Limit to the requested variation count
                plans = plans[:variation_count]
            else:
                raise ValueError("No JSON array found in planner output")
                
            yield {"type": "plans", "plans": plans}
            yield {"type": "agent_complete", "agent": "planning", "output": {"plan_count": len(plans)}}
            await asyncio.sleep(0.3)
            
            # Loop through each plan, run Builder and stream code
            for i, plan in enumerate(plans):
                variation_id = plan.get("id", f"var{i}")
                
                yield {"type": "timeline", "variation_id": variation_id, "step": f"Building Variation {i+1}"}
                yield {"type": "agent_start", "agent": "generating", "variation_id": variation_id, "message": f"Creating code for Variation {i+1} ({plan.get('name', 'Design')})..."}
                
                font_heading = plan.get("font_heading", "Inter")
                font_body = plan.get("font_body", "Inter")
                sections = plan.get("sections", [])
                if not sections:
                    sections = ["Navbar", "Hero", "Footer"]
                
                sections_numbered = "1. App.jsx\n"
                for j, sec in enumerate(sections, start=2):
                    sections_numbered += f"{j}. components/{sec}.jsx\n"

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
                    user_prompt=user_prompt
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
                        yield {"chunk": content, "variation_id": variation_id}
                
                yield {"type": "agent_complete", "agent": "generating", "variation_id": variation_id, "output": {"variation_id": variation_id, "status": "code_generated"}}
                
                # Write files to sandbox so esbuild bundles it
                yield {"type": "timeline", "variation_id": variation_id, "step": "Sandbox Render"}
                yield {"type": "agent_start", "agent": "render", "variation_id": variation_id, "message": f"Compiling Variation {i+1} in Vite sandbox..."}
                
                try:
                    # Clean the generated code
                    cleaned = full_code.strip()
                    cleaned = re.sub(r'^```(?:json|jsx|javascript|js|react|tsx|ts)?\s*\n?', '', cleaned, flags=re.IGNORECASE)
                    cleaned = re.sub(r'\n?```\s*$', '', cleaned)
                    cleaned = cleaned.strip()
                    
                    from backend.app.api.routes.generate_ui import parse_json_robust
                    parsed_data = parse_json_robust(cleaned)
                    if not parsed_data:
                        raise ValueError("No JSON object found in response")
                    
                    files = parsed_data.get("files", {})
                    from backend.project_runner import write_files
                    await write_files(files, variation_id=variation_id)
                    yield {"type": "agent_complete", "agent": "render", "variation_id": variation_id, "output": {"variation_id": variation_id, "status": "compiled"}}
                except Exception as write_err:
                    logger.error(f"Failed to write variation {variation_id}: {write_err}")
                    yield {"type": "agent_complete", "agent": "render", "variation_id": variation_id, "output": {"variation_id": variation_id, "status": "failed", "error": str(write_err)}}
                    
                yield {"type": "variation_complete", "variation_id": variation_id}
                await asyncio.sleep(0.5)
            
            return

        # ==========================================
        # STEP 3: DESIGN KNOWLEDGE RETRIEVAL (RAG)
        # ==========================================
        logger.info("Executing Agent 3: Design Knowledge Retrieval (RAG)")
        yield {"type": "timeline", "step": "Retrieving Design Knowledge"}
        yield {"type": "agent_start", "agent": "retrieval", "message": "Searching Design Knowledge Base using Hybrid JSON & Semantic retrieval..."}
        
        try:
            rag_json = await run_rag_retrieval(intent_json, user_prompt)
        except Exception as rag_err:
            logger.error(f"RAG Retrieval failed: {rag_err}. Using baseline fallback configurations.")
            rag_json = {
                "styleMatched": "minimal",
                "layoutPattern": "split-hero-bento-features",
                "designRules": {
                    "spacing": "comfortable",
                    "borderRadius": "xl",
                    "shadow": "medium",
                    "border": "none"
                },
                "styling": {
                    "font_heading": "Space Grotesk",
                    "font_body": "Inter",
                    "primary_color": "violet",
                    "bg_color": "bg-zinc-950",
                    "text_color": "text-zinc-100"
                },
                "retrievedPatterns": [],
                "jsonMatches": [],
                "semanticMatches": [],
                "finalResults": []
            }
            
        yield {"type": "agent_complete", "agent": "retrieval", "output": rag_json}
        await asyncio.sleep(0.3)

        # ==========================================
        # STEP 4: DESIGN PLANNING
        # ==========================================
        logger.info("Executing Agent 4: Design Planning")
        yield {"type": "timeline", "step": "Planning Design"}
        yield {"type": "agent_start", "agent": "planning", "message": "Structuring visual styles and component architecture blueprints..."}
        
        design_plan = await run_design_planning(intent_json, rag_json, user_prompt)
        
        # Inject design plan details to synchronize frontend panels
        plan_record = {
            "product_name": design_plan.get("productName", "App"),
            "tagline": design_plan.get("tagline", ""),
            "page_type": intent_json.get("pageType", "landing"),
            "design_archetype": rag_json.get("styleMatched", "modern"),
            "layout_system": design_plan.get("layout", {}).get("sidebar", "none") + "-sidebar" if design_plan.get("layout", {}).get("sidebar", "none") != "none" else "centered-stack",
            "visual_style": intent_json.get("style", {}).get("visualStyle", "modern"),
            "interaction_style": "hover-reveal",
            "aesthetic": intent_json.get("theme", "premium dark"),
            "font_heading": design_plan.get("styling", {}).get("font_heading", "Space Grotesk"),
            "font_body": design_plan.get("styling", {}).get("font_body", "Inter"),
            "bg_color": design_plan.get("styling", {}).get("bg_color", "bg-zinc-950"),
            "primary_color": design_plan.get("styling", {}).get("primary_color", "violet"),
            "text_color": design_plan.get("styling", {}).get("text_color", "text-zinc-100"),
            "sections": design_plan.get("layout", {}).get("mainSections", []),
            "layout_notes": f"Navbar: {design_plan.get('layout', {}).get('navbar', 'top')}, Sidebar: {design_plan.get('layout', {}).get('sidebar', 'none')}"
        }
        yield {"type": "plan", "plan": plan_record}
        
        yield {"type": "agent_complete", "agent": "planning", "output": design_plan}
        await asyncio.sleep(0.3)

        # ==========================================
        # STEP 5: COMPONENT GENERATION (INTERNAL ONLY - NO CHUNKS YIELDED)
        # ==========================================
        # STEP 5: FULL APP GENERATION
        # ==========================================
        logger.info("Executing Agent 5: Full App Generation")
        yield {"type": "timeline", "step": "Generating Application"}
        yield {"type": "agent_start", "agent": "generating", "message": "Generating all components and App.jsx in a single pass..."}
        
        try:
            args = (design_plan, rag_json)
            logger.info(f"Calling run_full_app_generation with {len(args)} args")
            logger.info(f"Arg types: {[type(arg).__name__ for arg in args]}")
            gen_response = await run_full_app_generation(*args)
            if not gen_response.get("success"):
                raise ValueError(f"Generation failed: {gen_response.get('errors')}")
            generated_files = gen_response.get("files", {})
        except Exception as e:
            logger.error(f"Full app generation failed: {e}")
            yield {"type": "agent_complete", "agent": "generating", "output": {"status": "failed", "error": str(e)}}
            return
            
        # Sanitize all files
        generated_files = await run_code_sanitization(generated_files)
        
        # Validate all files
        val_result = await run_code_validation(generated_files)
        
        if not val_result.get("valid", False):
            # Auto-Fix broken files
            broken_files = {}
            for err in val_result.get("errors", []):
                fname = err.get("file")
                if fname and fname in generated_files:
                    broken_files[fname] = generated_files[fname]
                    
            if broken_files:
                logger.info(f"Triggering auto-fix for {len(broken_files)} broken files.")
                yield {"type": "agent_timeline", "step": "Validation & Auto-Fix", "message": "Repairing syntax errors..."}
                try:
                    repaired_files = await run_auto_fix_generation(broken_files, val_result.get("errors", []))
                    # Merge repaired files
                    for fname, r_code in repaired_files.items():
                        generated_files[fname] = r_code
                        
                    # Re-sanitize and validate repaired files
                    generated_files = await run_code_sanitization(generated_files)
                    val_result = await run_code_validation(generated_files)
                except Exception as e:
                    logger.error(f"Auto-fix failed: {e}")
                    
        if not val_result.get("valid", False):
            logger.warning("Application still has validation errors after auto-fix. Proceeding anyway.")
            
        yield {"type": "agent_complete", "agent": "generating", "output": {"file_count": len(generated_files)}}
        await asyncio.sleep(0.3)

        # ==========================================
        # STEP 6: SANDBOX RENDER
        # ==========================================
        logger.info("Executing Sandbox Render")
        yield {"type": "timeline", "step": "Sandbox Render"}
        yield {"type": "agent_start", "agent": "screenshot", "message": "Compiling components to sandbox..."}
        
        from backend.project_runner import write_files
        try:
            await write_files(generated_files)
            logger.info("Successfully compiled and saved files to sandbox")
        except Exception as file_err:
            logger.error(f"Failed to compile files: {file_err}")
            
        yield {"type": "agent_complete", "agent": "screenshot", "output": {}}
        await asyncio.sleep(0.3)

        # VISION, CRITIC, and OPTIMIZATION are bypassed in this new architecture flow
        # to ensure speed and drastically reduce LLM calls.
        
        final_code_json = json.dumps({"files": generated_files}, indent=2)
        
        # Save preference signals to User Memory and Successful Generations logs
        try:
            update_user_memory(user_id, user_prompt, plan_record)
        except Exception as mem_up_err:
            logger.error(f"Failed to update user memory: {mem_up_err}")
            
        try:
            save_successful_generation(
                prompt=user_prompt,
                design_plan=plan_record,
                critic_score=critic_feedback.get("score", 8.0)
            )
        except Exception as gen_up_err:
            logger.error(f"Failed to save successful generation vector entry: {gen_up_err}")
        
        # Initialize history tracking for this project session
        history_service = EditHistoryService()
        history_service.save_snapshot(
            user_id=user_id,
            session_id=session_id,
            prompt=user_prompt,
            files=optimized_files,
            metadata={"critic_score": critic_feedback.get("score", 8.2), "session_id": session_id}
        )
        
        # Yield the final compiled code back so frontend code panes display the optimized code
        yield {"type": "final_code", "code": final_code_json}
        yield {"type": "timeline", "step": "Finalizing Project"}
        
    except Exception as exc:
        logger.exception("Error during orchestrator execution")
        try:
            from backend.app.services.debug.debug_logger import save_failure_snapshot
            built_files = locals().get("optimized_files") or locals().get("generated_files") or {}
            save_failure_snapshot(session_id, built_files, str(exc))
        except Exception as snap_err:
            logger.error(f"Failed to save failure snapshot: {snap_err}")
        yield {"error": str(exc)}

async def run_edit_orchestration_stream(
    user_id: str,
    session_id: str,
    edit_prompt: str,
    current_files: dict,
    design_metadata: dict = None
):
    """
    Executes the conversational Edit Mode pipeline.
    """
    from backend.app.services.debug.debug_logger import session_id_var, DebugLogger
    session_id_var.set(session_id)
    db_logger = DebugLogger(session_id)
    db_logger.log("EDIT", "START", f"User Edit Prompt: {edit_prompt}\nCurrent Files: {list(current_files.keys())}")
    
    try:
        patch_engine = JSXPatchEngine()
        history_service = EditHistoryService()
        
        # ==========================================
        # STEP 1: EDIT PROMPT ANALYSIS
        # ==========================================
        logger.info("Executing Edit Step 1: Prompt Analysis")
        yield {"type": "timeline", "step": "Edit Prompt Analysis"}
        yield {"type": "agent_start", "agent": "edit_planning", "message": "Analyzing natural language edit requests..."}
        
        edit_plan = await run_edit_planning(edit_prompt, current_files, design_metadata)
        
        yield {"type": "agent_complete", "agent": "edit_planning", "output": edit_plan}
        await asyncio.sleep(0.3)

        # ==========================================
        # STEP 2: INTENT CLASSIFICATION
        # ==========================================
        logger.info("Executing Edit Step 2: Intent Classification")
        yield {"type": "timeline", "step": "Intent Classification"}
        yield {"type": "agent_start", "agent": "intent_classification", "message": f"Classifying edit: {edit_plan.get('editType')}..."}
        
        # Send details to frontend
        yield {"type": "agent_complete", "agent": "intent_classification", "output": {
            "editType": edit_plan.get("editType"),
            "changes": edit_plan.get("changes"),
            "affected": edit_plan.get("affectedComponents")
        }}
        await asyncio.sleep(0.3)

        # ==========================================
        # STEP 3: JSX PATCH GENERATION
        # ==========================================
        logger.info("Executing Edit Step 3: JSX Patch Generation")
        yield {"type": "timeline", "step": "JSX Patch Generation"}
        yield {"type": "agent_start", "agent": "patch_generation", "message": "Generating minimal file modifications..."}
        
        patched_files = await patch_engine.apply_patches(current_files, edit_plan, design_metadata)
        
        yield {"type": "agent_complete", "agent": "patch_generation", "output": {"patched_count": len(edit_plan.get("affectedComponents", []))}}
        await asyncio.sleep(0.3)

        # ==========================================
        # STEP 4: SANDBOX RE-RENDER
        # ==========================================
        logger.info("Executing Edit Step 4: Sandbox Re-render")
        yield {"type": "timeline", "step": "Sandbox Re-render"}
        yield {"type": "agent_start", "agent": "render", "message": "Writing patches and compiling layout preview..."}
        
        from backend.project_runner import write_files, log_corrupted_run
        try:
            await write_files(patched_files)
        except Exception as write_err:
            logger.error(f"Patched compile write failed: {write_err}")
            
            # Revert to last valid snapshot in history
            history = history_service.load_history(user_id, session_id)
            last_valid_files = current_files
            if history:
                last_valid_files = history[-1].get("files", current_files)
                
            # Log the corrupted run to disk
            log_corrupted_run(patched_files, str(write_err))
            
            # Save failure snapshot
            try:
                from backend.app.services.debug.debug_logger import save_failure_snapshot
                save_failure_snapshot(session_id, patched_files, str(write_err))
            except Exception as snap_err:
                logger.error(f"Failed to save failure snapshot: {snap_err}")
            
            yield {"type": "error", "message": f"Compilation failed: {write_err}. Reverted to last valid snapshot."}
            
            try:
                # Write back last valid files, bypassing checks since they are known to compile
                await write_files(last_valid_files, bypass_validation=True)
            except Exception as restore_err:
                logger.error(f"Failed to restore last valid snapshot files: {restore_err}")
                
            # Yield final code as the last valid files so the frontend resets its state
            final_code_json = json.dumps({"files": last_valid_files}, indent=2)
            yield {"type": "final_code", "code": final_code_json}
            yield {"type": "timeline", "step": "Finalizing Project"}
            return
            
        yield {"type": "agent_complete", "agent": "render", "output": {"status": "compiled"}}
        await asyncio.sleep(0.3)

        # ==========================================
        # STEP 5: SCREENSHOT CAPTURE
        # ==========================================
        logger.info("Executing Edit Step 5: Screenshot Capture")
        yield {"type": "timeline", "step": "Screenshot Capture"}
        yield {"type": "agent_start", "agent": "screenshot", "message": "Capturing responsive viewport layout snapshots..."}
        
        try:
            screenshot_paths = await capture_sandbox_screenshots()
        except Exception as screen_err:
            logger.error(f"Edit screenshot capture failed: {screen_err}")
            screenshot_paths = {}
            
        yield {"type": "agent_complete", "agent": "screenshot", "output": screenshot_paths}
        await asyncio.sleep(0.3)

        # ==========================================
        # STEP 6: VISION RECHECK
        # ==========================================
        logger.info("Executing Edit Step 6: Vision Recheck")
        yield {"type": "timeline", "step": "Vision Recheck"}
        yield {"type": "agent_start", "agent": "vision_recheck", "message": "Re-auditing alignment and calculating score improvements..."}
        
        try:
            # Query Vision Agent on edited views
            vision_feedback = await run_vision_agent(screenshot_paths, design_metadata)
        except Exception as vision_err:
            logger.error(f"Vision recheck failed: {vision_err}")
            vision_feedback = {}
            
        # Compute quality rating improvement delta compared to the last history snapshot
        history = history_service.load_history(user_id, session_id)
        before_score = 8.3
        if history:
            before_score = history[-1].get("metadata", {}).get("critic_score", 8.3)
            
        after_score = float(vision_feedback.get("overallScore", 8.5))
        score_delta = round(after_score - before_score, 2)
        
        yield {"type": "agent_complete", "agent": "vision_recheck", "output": {
            "beforeScore": before_score,
            "afterScore": after_score,
            "improvementDelta": score_delta,
            "scores": vision_feedback.get("scores"),
            "issues": vision_feedback.get("issues")
        }}
        await asyncio.sleep(0.3)

        # ==========================================
        # STEP 7: OPTIMIZATION & HISTORY LOGGING
        # ==========================================
        logger.info("Executing Edit Step 7: Final Update")
        yield {"type": "timeline", "step": "Final Update"}
        yield {"type": "agent_start", "agent": "final_update", "message": "Polishing layout adjustments and committing snapshot..."}
        
        # Save snapshot
        history_service.save_snapshot(
            user_id=user_id,
            session_id=session_id,
            prompt=edit_prompt,
            files=patched_files,
            metadata={"critic_score": after_score, "session_id": session_id}
        )
        
        final_code_json = json.dumps({"files": patched_files}, indent=2)
        
        yield {"type": "agent_complete", "agent": "final_update", "output": {"status": "committed"}}
        yield {"type": "final_code", "code": final_code_json}
        yield {"type": "timeline", "step": "Finalizing Project"}
        
    except Exception as exc:
        logger.exception("Error during edit orchestration stream")
        try:
            from backend.app.services.debug.debug_logger import save_failure_snapshot
            built_files = locals().get("patched_files") or current_files or {}
            save_failure_snapshot(session_id, built_files, str(exc))
        except Exception as snap_err:
            logger.error(f"Failed to save failure snapshot: {snap_err}")
        yield {"error": str(exc)}
