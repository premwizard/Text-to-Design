"""
agents/wrapped_agents.py
ADK agent implementations wrapping the underlying agent functions.
Each agent has a single responsibility and is registered in the AgentRegistry.
"""
import logging
from backend.agents.base_agent import BaseADKAgent
from backend.agents.agent_registry import register_adk_agent

logger = logging.getLogger("backend.agents.wrapped_agents")


@register_adk_agent("memory")
class MemoryADKAgent(BaseADKAgent):
    def __init__(self):
        super().__init__("memory")

    async def _execute(self, input_data: dict, **kwargs) -> dict:
        user_id = input_data.get("user_id")
        prompt = input_data.get("prompt")
        from backend.agents.memory_manager import get_memory_manager
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
        from backend.agents.evaluation_manager import get_evaluation_manager
        has_required = isinstance(res, dict) and all(
            k in res for k in ["pageType", "industry", "theme", "components", "style"]
        )
        get_evaluation_manager().record_prompt_accuracy(matched=has_required)
        return res


@register_adk_agent("retrieval")
class RetrievalADKAgent(BaseADKAgent):
    def __init__(self):
        super().__init__("retrieval")

    async def _execute(self, input_data: dict, **kwargs) -> dict:
        intent_json = input_data.get("intent_json")
        prompt = input_data.get("prompt")
        from backend.agents.memory_manager import get_memory_manager
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

        if not main_sections:
            logger.warning("[ADK GenerationAgent] Empty mainSections — aborting generation.")
            return {"error": "Empty design plan sections. Cannot generate."}

        from backend.services.agents.full_app_generation import run_full_app_generation
        return await run_full_app_generation(design_plan, rag_json, event_callback)


@register_adk_agent("critic")
class CriticADKAgent(BaseADKAgent):
    def __init__(self):
        super().__init__("critic")

    async def _execute(self, input_data: dict, **kwargs) -> dict:
        design_plan = input_data.get("design_plan")
        files = input_data.get("files")
        from backend.services.agents.ui_critic_agent import run_ui_critic
        return await run_ui_critic(design_plan, files)


@register_adk_agent("vision")
class VisionADKAgent(BaseADKAgent):
    def __init__(self):
        super().__init__("vision")

    async def _execute(self, input_data: dict, **kwargs) -> dict:
        screenshot_paths = input_data.get("screenshot_paths", [])
        metadata = input_data.get("metadata", {})
        is_single_mode = input_data.get("is_single_mode", False)
        from backend.services.agents.vision_agent import run_vision_agent
        return await run_vision_agent(screenshot_paths, metadata, is_single_mode)


@register_adk_agent("optimization")
class OptimizationADKAgent(BaseADKAgent):
    def __init__(self):
        super().__init__("optimization")

    async def _execute(self, input_data: dict, **kwargs) -> dict:
        files = input_data.get("files")
        design_plan = input_data.get("design_plan")
        critic_output = input_data.get("critic_output")
        from backend.services.agents.optimization_agent import run_optimization
        return await run_optimization(files, design_plan, critic_output)


@register_adk_agent("edit")
class EditADKAgent(BaseADKAgent):
    def __init__(self):
        super().__init__("edit")

    async def _execute(self, input_data: dict, **kwargs) -> dict:
        edit_prompt = input_data.get("edit_prompt")
        current_files = input_data.get("current_files", {})
        design_metadata = input_data.get("design_metadata")
        from backend.services.agents.edit_agent import run_edit_planning
        return await run_edit_planning(edit_prompt, current_files, design_metadata)
