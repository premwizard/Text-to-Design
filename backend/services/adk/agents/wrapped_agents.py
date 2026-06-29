import logging
from backend.services.adk.base_agent import BaseADKAgent
from backend.services.adk.agent_registry import register_adk_agent

logger = logging.getLogger("backend.services.adk.agents.wrapped_agents")

@register_adk_agent("memory")
class MemoryADKAgent(BaseADKAgent):
    def __init__(self):
        super().__init__("memory")

    async def _execute(self, input_data: dict, **kwargs) -> dict:
        user_id = input_data.get("user_id")
        prompt = input_data.get("prompt")
        
        from backend.services.adk.memory_manager import get_memory_manager
        return await get_memory_manager().get_user_preferences(user_id, prompt)


@register_adk_agent("understanding")
class PromptUnderstandingADKAgent(BaseADKAgent):
    def __init__(self):
        super().__init__("understanding")

    async def _execute(self, input_data: dict, **kwargs) -> dict:
        prompt = input_data.get("prompt")
        memory_prefs = input_data.get("memory_prefs", {})
        
        from backend.services.agents.prompt_understanding_agent import run_prompt_understanding
        res = await run_prompt_understanding(prompt, memory_prefs)
        
        # Evaluate classification schema completeness
        from backend.services.adk.evaluation.evaluation_manager import get_evaluation_manager
        has_required = isinstance(res, dict) and all(k in res for k in ["pageType", "industry", "theme", "components", "style"])
        get_evaluation_manager().record_prompt_accuracy(matched=has_required)
        
        return res


@register_adk_agent("retrieval")
class RetrievalADKAgent(BaseADKAgent):
    def __init__(self):
        super().__init__("retrieval")

    async def _execute(self, input_data: dict, **kwargs) -> dict:
        intent_json = input_data.get("intent_json")
        prompt = input_data.get("prompt")
        
        from backend.services.adk.memory_manager import get_memory_manager
        return await get_memory_manager().retrieve_rag_patterns(intent_json, prompt)


@register_adk_agent("planning")
class PlanningADKAgent(BaseADKAgent):
    def __init__(self):
        super().__init__("planning")

    async def _execute(self, input_data: dict, **kwargs) -> dict:
        intent_json = input_data.get("intent_json")
        rag_json = input_data.get("rag_json")
        prompt = input_data.get("prompt")
        
        from backend.services.agents.design_planning_agent import run_design_planning
        return await run_design_planning(intent_json, rag_json, prompt)


@register_adk_agent("generating")
class GenerationADKAgent(BaseADKAgent):
    def __init__(self):
        super().__init__("generating")

    async def _execute(self, input_data: dict, **kwargs) -> dict:
        design_plan = input_data.get("design_plan")
        rag_json = input_data.get("rag_json")
        event_callback = input_data.get("event_callback")
        
        layout = design_plan.get("layout", {})
        main_sections = layout.get("mainSections", [])
        
        # Validate and reject empty sections
        main_sections = [sec for sec in main_sections if sec and sec.strip()]
        if not main_sections:
            raise ValueError("Generator rejected: mainSections is empty. Cannot generate a page with no sections.")
        
        planned_components = []
        if layout.get("navbar") == "top":
            planned_components.append("Navbar")
        if layout.get("sidebar") in ["left", "right"]:
            planned_components.append("Sidebar")
            
        for sec in main_sections:
            if sec not in planned_components:
                planned_components.append(sec)
                
        # Validate and reject empty planned components
        if not planned_components:
            raise ValueError("Generator rejected: planned components list is empty. Cannot generate a blank project.")
                
        logger.info(f"Planned components: {planned_components}")
        generated_files = {}
        
        from backend.services.agents.component_generation_agent import (
            generate_component_stream,
            generate_app_stream
        )
        
        for i, comp_name in enumerate(planned_components):
            filename = f"components/{comp_name}.jsx"
            if event_callback:
                await event_callback({
                    "type": "agent_timeline", 
                    "step": "Generating Components", 
                    "message": f"Creating {filename}..."
                })
            
            comp_code = ""
            async for chunk in generate_component_stream(comp_name, design_plan, rag_json, generated_files):
                comp_code += chunk
                if event_callback:
                    await event_callback({"chunk": chunk, "component": comp_name})
                
            # Automation Fallback in case of rate limits or failures
            if not comp_code or len(comp_code.strip()) < 50:
                logger.warning(f"Empty code for {comp_name}, using fallback template.")
                comp_code = f"""import React from 'react';
 
export default function {comp_name}() {{
  return (
    <div className="py-20 text-center bg-zinc-900 border border-zinc-800 rounded-xl my-4 px-4">
      <h3 className="text-xl font-bold text-zinc-200">{comp_name}</h3>
      <p className="text-sm text-zinc-400 mt-2">Placeholder component generated automatically due to provider rate limit/network timeout.</p>
    </div>
  );
}}
"""
            generated_files[filename] = comp_code
            
        if event_callback:
            await event_callback({
                "type": "agent_timeline", 
                "step": "Generating Components", 
                "message": "Creating root App.jsx layout..."
            })
            
        app_code = ""
        async for chunk in generate_app_stream(design_plan, planned_components):
            app_code += chunk
            if event_callback:
                await event_callback({"chunk": chunk, "component": "App"})
            
        if not app_code or len(app_code.strip()) < 50:
            logger.warning("Empty root App.jsx, using fallback template.")
            imports = ""
            renders = ""
            for comp in planned_components:
                imports += f"import {comp} from './components/{comp}';\n"
                renders += f"      <{comp} />\n"
            app_code = f"""import React from 'react';
{imports}
 
export default function App() {{
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col p-4 sm:p-6 lg:p-8">
{renders}
    </div>
  );
}}
"""
        # Validate generated App.jsx
        if not app_code or "export default" not in app_code or len(app_code.strip()) < 50:
            raise ValueError("Generator rejected: generated App.jsx is blank or invalid.")
            
        generated_files["App.jsx"] = app_code
        return {"files": generated_files}


@register_adk_agent("critic")
class CriticADKAgent(BaseADKAgent):
    def __init__(self):
        super().__init__("critic")

    async def _execute(self, input_data: dict, **kwargs) -> dict:
        files = input_data.get("files")
        vision_feedback = input_data.get("vision_feedback")
        is_single_mode = input_data.get("is_single_mode", False)
        
        from backend.services.agents.ui_critic_agent import run_ui_critic
        res = await run_ui_critic(files, vision_feedback, is_single_mode)
        
        from backend.services.adk.evaluation.evaluation_manager import get_evaluation_manager
        if isinstance(res, dict) and "score" in res:
            get_evaluation_manager().record_critic_score(res["score"])
        
        return res


@register_adk_agent("vision")
class VisionADKAgent(BaseADKAgent):
    def __init__(self):
        super().__init__("vision")

    async def _execute(self, input_data: dict, **kwargs) -> dict:
        screenshot_paths = input_data.get("screenshot_paths")
        metadata = input_data.get("metadata")
        is_single_mode = input_data.get("is_single_mode", False)
        
        from backend.services.agents.vision_agent import run_vision_agent
        res = await run_vision_agent(screenshot_paths, metadata, is_single_mode)
        
        from backend.services.adk.evaluation.evaluation_manager import get_evaluation_manager
        if isinstance(res, dict):
            score = res.get("overallScore")
            if score is not None:
                get_evaluation_manager().record_vision_score(score)
                
        return res


@register_adk_agent("optimizing")
class OptimizationADKAgent(BaseADKAgent):
    def __init__(self):
        super().__init__("optimizing")

    async def _execute(self, input_data: dict, **kwargs) -> dict:
        files = input_data.get("files")
        critic_feedback = input_data.get("critic_feedback")
        is_single_mode = input_data.get("is_single_mode", False)
        
        from backend.services.agents.optimization_agent import run_optimization
        return await run_optimization(files, critic_feedback, is_single_mode)


@register_adk_agent("edit_planning")
class EditADKAgent(BaseADKAgent):
    def __init__(self):
        super().__init__("edit_planning")

    async def _execute(self, input_data: dict, **kwargs) -> dict:
        edit_prompt = input_data.get("edit_prompt")
        current_files = input_data.get("current_files")
        design_metadata = input_data.get("design_metadata")
        
        from backend.services.agents.edit_agent import run_edit_planning
        return await run_edit_planning(edit_prompt, current_files, design_metadata)

@register_adk_agent("sanitizer")
class SanitizerADKAgent(BaseADKAgent):
    def __init__(self):
        super().__init__("sanitizer")
        
    async def _execute(self, input_data: dict, **kwargs) -> dict:
        files = input_data.get("files")
        
        from backend.services.agents.sanitizer_agent import run_code_sanitization
        sanitized_files = await run_code_sanitization(files)
        return {"files": sanitized_files}

@register_adk_agent("code_validator")
class ValidatorADKAgent(BaseADKAgent):
    def __init__(self):
        super().__init__("code_validator")
        
    async def _execute(self, input_data: dict, **kwargs) -> dict:
        files = input_data.get("files")
        
        from backend.services.agents.code_validator_agent import run_code_validation
        return await run_code_validation(files)
        
@register_adk_agent("auto_fixer")
class FixerADKAgent(BaseADKAgent):
    def __init__(self):
        super().__init__("auto_fixer")
        
    async def _execute(self, input_data: dict, **kwargs) -> dict:
        files = input_data.get("files")
        errors = input_data.get("errors")
        
        from backend.services.agents.auto_fixer_agent import run_auto_fixer
        fixed_files = await run_auto_fixer(files, errors)
        return {"files": fixed_files}