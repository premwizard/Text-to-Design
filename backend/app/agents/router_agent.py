"""
agents/router_agent.py
Dynamic Router Agent that classifies user requests and dispatches them
to the correct orchestration pipeline.
"""
import logging
import json
from backend.app.agents.adk.adk_orchestrator import run_adk_orchestration_stream, run_adk_edit_orchestration_stream
from backend.app.agents.agent_registry import get_agent_registry
from backend.app.agents.evaluation_manager import get_evaluation_manager

logger = logging.getLogger("backend.app.agents.router_agent")


class RouterAgent:
    """
    Classifies user prompts and request context to route execution
    flows to appropriate multi-agent pipelines.
    """

    def __init__(self):
        pass

    async def route_request(self, request_data: dict):
        """
        Determines the request type (fresh_generate, edit_ui, analyze_design, rollback)
        and calls the matching orchestrator flow.
        """
        prompt = request_data.get("prompt", "")
        current_code = request_data.get("current_code")
        user_id = request_data.get("user_id")
        session_id = request_data.get("session_id")

        request_type = "fresh_generate"

        if request_data.get("action") == "rollback" or "rollback" in prompt.lower():
            request_type = "rollback"
        elif request_data.get("action") == "analyze" or "analyze design" in prompt.lower():
            request_type = "analyze_design"
        elif current_code or request_data.get("action") == "edit":
            request_type = "edit_ui"

        logger.info(f"[ADK Router] Request classified as: {request_type}")
        get_evaluation_manager().record_agent_run("router_agent", 0.02, "SUCCESS")

        if request_type == "edit_ui":
            try:
                parsed = json.loads(current_code)
                current_files = parsed.get("files", {})
            except Exception:
                current_files = {}

            async for event in run_adk_edit_orchestration_stream(
                user_id=user_id,
                session_id=session_id,
                edit_prompt=prompt,
                current_files=current_files,
                design_metadata=request_data.get("design_metadata")
            ):
                if isinstance(event, dict):
                    event["routing_decision"] = {
                        "pipeline": "Edit Pipeline",
                        "request_type": "edit_ui"
                    }
                yield event

        elif request_type == "analyze_design":
            yield {"type": "timeline", "step": "Vision Analysis"}
            yield {"type": "agent_start", "agent": "vision", "message": "Performing dedicated design review..."}

            from backend.app.agents.tool_registry import get_tool_registry
            screenshot_tool = get_tool_registry().get_tool("screenshot")
            paths = await screenshot_tool.execute()

            registry = get_agent_registry()
            vision_agent = registry.get_agent("vision")
            vision_feedback = await vision_agent.run({
                "screenshot_paths": paths,
                "metadata": {},
                "is_single_mode": True
            })

            yield {"type": "agent_complete", "agent": "vision", "output": vision_feedback}
            yield {"type": "timeline", "step": "Finalizing Project"}

        elif request_type == "rollback":
            snapshot_id = request_data.get("snapshot_id", 1)
            yield {"type": "timeline", "step": "History Rollback"}
            yield {"type": "agent_start", "agent": "history_manager", "message": f"Restoring code to snapshot #{snapshot_id}..."}

            from backend.app.agents.tool_registry import get_tool_registry
            history_tool = get_tool_registry().get_tool("history_manager")
            compiler_tool = get_tool_registry().get_tool("compiler")

            files = await history_tool.execute(
                action="rollback", user_id=user_id,
                session_id=session_id, snapshot_id=snapshot_id
            )
            await compiler_tool.execute(files=files)

            yield {"type": "agent_complete", "agent": "history_manager", "output": {"status": "reverted"}}
            yield {"type": "final_code", "code": json.dumps({"files": files}, indent=2)}
            yield {"type": "timeline", "step": "Finalizing Project"}

        else:
            generation_mode = request_data.get("generation_mode", "single_mode")
            variation_count = request_data.get("variation_count", 1)

            async for event in run_adk_orchestration_stream(
                user_prompt=prompt,
                user_id=user_id,
                generation_mode=generation_mode,
                variation_count=variation_count
            ):
                if isinstance(event, dict):
                    event["routing_decision"] = {
                        "pipeline": "Generate Pipeline",
                        "request_type": "fresh_generate"
                    }
                yield event
