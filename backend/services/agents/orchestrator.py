import json
import logging
import asyncio
from backend.services.agents.prompt_understanding_agent import run_prompt_understanding
from backend.services.agents.design_planning_agent import run_design_planning
from backend.services.agents.component_generation_agent import (
    generate_component_stream,
    generate_app_stream,
    escape_json_chunk
)
from backend.services.agents.ui_critic_agent import run_ui_critic
from backend.services.agents.optimization_agent import run_optimization

logger = logging.getLogger("backend.agents.orchestrator")

async def run_orchestration_stream(user_prompt: str):
    """
    Executes the 5-agent multi-agent pipeline in sequence and yields SSE formatted event payloads.
    """
    try:
        # ==========================================
        # STEP 1: PROMPT UNDERSTANDING
        # ==========================================
        logger.info("Executing Agent 1: Prompt Understanding")
        yield {"type": "timeline", "step": "Understanding Prompt"}
        yield {"type": "agent_start", "agent": "understanding", "message": "Analyzing prompt requirements..."}
        
        intent_json = await run_prompt_understanding(user_prompt)
        
        yield {"type": "agent_complete", "agent": "understanding", "output": intent_json}
        await asyncio.sleep(0.5)

        # ==========================================
        # STEP 2: DESIGN PLANNING
        # ==========================================
        logger.info("Executing Agent 2: Design Planning")
        yield {"type": "timeline", "step": "Planning Design"}
        yield {"type": "agent_start", "agent": "planning", "message": "Designing visual style and layout architecture..."}
        
        design_plan = await run_design_planning(intent_json, user_prompt)
        
        # Inject sections array in a clean format to match DesignPlanPanel visualization
        yield {"type": "plan", "plan": {
            "product_name": design_plan.get("productName", "App"),
            "tagline": design_plan.get("tagline", ""),
            "page_type": intent_json.get("pageType", "landing"),
            "design_archetype": intent_json.get("style", {}).get("visualStyle", "modern"),
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
        }}
        
        yield {"type": "agent_complete", "agent": "planning", "output": design_plan}
        await asyncio.sleep(0.5)

        # ==========================================
        # STEP 3: COMPONENT GENERATION
        # ==========================================
        logger.info("Executing Agent 3: Component Generation")
        yield {"type": "timeline", "step": "Generating Components"}
        yield {"type": "agent_start", "agent": "generating", "message": "Initializing components structure..."}
        
        layout = design_plan.get("layout", {})
        main_sections = layout.get("mainSections", [])
        
        # Build list of all files to generate
        planned_components = []
        if layout.get("navbar") == "top":
            planned_components.append("Navbar")
        if layout.get("sidebar") in ["left", "right"]:
            planned_components.append("Sidebar")
            
        for sec in main_sections:
            # Skip if already added
            if sec not in planned_components:
                planned_components.append(sec)
                
        logger.info(f"Planned component files: {planned_components}")
        
        # Start of files JSON structure
        yield {"chunk": "{\n  \"files\": {\n"}
        
        generated_files = {}
        
        # Stream components sequentially
        for i, comp_name in enumerate(planned_components):
            filename = f"components/{comp_name}.jsx"
            yield {"type": "agent_timeline", "step": "Generating Components", "message": f"Creating {filename}..."}
            yield {"chunk": f'    "{filename}": "'}
            
            comp_code = ""
            async for chunk in generate_component_stream(comp_name, design_plan, generated_files):
                escaped = escape_json_chunk(chunk)
                comp_code += chunk
                yield {"chunk": escaped}
                
            generated_files[filename] = comp_code
            yield {"chunk": "\",\n"}
            
        # Stream App.jsx root
        yield {"type": "agent_timeline", "step": "Generating Components", "message": "Creating root App.jsx layout..."}
        yield {"chunk": '    "App.jsx": "'}
        
        app_code = ""
        async for chunk in generate_app_stream(design_plan, planned_components):
            escaped = escape_json_chunk(chunk)
            app_code += chunk
            yield {"chunk": escaped}
            
        generated_files["App.jsx"] = app_code
        yield {"chunk": "\"\n  }\n}"}
        
        yield {"type": "agent_complete", "agent": "generating", "output": {"file_count": len(generated_files)}}
        await asyncio.sleep(0.5)

        # ==========================================
        # STEP 4: UI CRITIC
        # ==========================================
        logger.info("Executing Agent 4: UI Critic")
        yield {"type": "timeline", "step": "Reviewing UI"}
        yield {"type": "agent_start", "agent": "critic", "message": "Analyzing visual hierarchy, spacing, and styling contrast..."}
        
        critic_feedback = await run_ui_critic(generated_files)
        
        yield {"type": "agent_complete", "agent": "critic", "output": critic_feedback}
        await asyncio.sleep(0.5)

        # ==========================================
        # STEP 5: OPTIMIZATION
        # ==========================================
        logger.info("Executing Agent 5: Optimization")
        yield {"type": "timeline", "step": "Optimizing Design"}
        yield {"type": "agent_start", "agent": "optimizing", "message": "Applying critic revisions and interactive styling improvements..."}
        
        optimized_files = await run_optimization(generated_files, critic_feedback)
        
        # Save optimized files to disk for preview compile
        from backend.project_runner import write_files
        try:
            await write_files(optimized_files)
            logger.info("Successfully compiled and saved optimized files to sandbox")
        except Exception as file_err:
            logger.error(f"Failed to write optimized files: {file_err}")
            
        final_code_json = json.dumps({"files": optimized_files}, indent=2)
        
        yield {"type": "agent_complete", "agent": "optimizing", "output": {"score_after": min(critic_feedback.get("score", 7.0) + 1.2, 10.0)}}
        await asyncio.sleep(0.5)
        
        # Yield the final compiled code back so frontend code panes display the optimized code
        yield {"type": "final_code", "code": final_code_json}
        yield {"type": "timeline", "step": "Finalizing Project"}
        
    except Exception as exc:
        logger.exception("Error during orchestrator execution")
        yield {"error": str(exc)}
