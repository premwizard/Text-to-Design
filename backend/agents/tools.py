"""
agents/tools.py
ADK tool implementations registered in the ToolRegistry.
Each tool wraps a specific capability (DB, screenshot, compiler, etc.).
"""
import logging
from backend.agents.tool_registry import BaseADKTool, get_tool_registry

logger = logging.getLogger("backend.agents.tools")


class ChromaTool(BaseADKTool):
    def __init__(self):
        super().__init__("ChromaDB search")

    def validate_input(self, **kwargs):
        if "action" not in kwargs:
            raise ValueError("Parameter 'action' is required (query | add | save_success)")

    async def execute(self, **kwargs) -> any:
        from backend.db.chroma_service import ChromaService, save_successful_generation
        action = kwargs.get("action")
        db = ChromaService.get_instance()

        if action == "query":
            return db.query_similarity(kwargs.get("collection_name"), kwargs.get("text"), kwargs.get("top_k", 3))
        elif action == "add":
            db.add_entry(kwargs.get("collection_name"), kwargs.get("entry_id"), kwargs.get("text"), kwargs.get("metadata"))
            return True
        elif action == "save_success":
            save_successful_generation(kwargs.get("prompt"), kwargs.get("design_plan"), kwargs.get("critic_score"))
            return True
        return None


class ScreenshotTool(BaseADKTool):
    def __init__(self):
        super().__init__("Screenshot capture")

    async def execute(self, **kwargs) -> any:
        from backend.services.vision.screenshot_service import capture_sandbox_screenshots
        return await capture_sandbox_screenshots()


class CompilerTool(BaseADKTool):
    def __init__(self):
        super().__init__("Sandbox compiler")

    def validate_input(self, **kwargs):
        if "files" not in kwargs:
            raise ValueError("Parameter 'files' (dict of path -> code) is required")

    async def execute(self, **kwargs) -> any:
        from backend.project_runner import write_files
        files = kwargs.get("files")
        variation_id = kwargs.get("variation_id")
        bypass_validation = kwargs.get("bypass_validation", False)
        await write_files(files, variation_id=variation_id, bypass_validation=bypass_validation)
        return True


class FileWriterTool(BaseADKTool):
    def __init__(self):
        super().__init__("File writer")

    def validate_input(self, **kwargs):
        if "files" not in kwargs:
            raise ValueError("Parameter 'files' is required")

    async def execute(self, **kwargs) -> any:
        from backend.project_runner import write_files
        await write_files(kwargs.get("files"), variation_id=kwargs.get("variation_id"))
        return True


class JSXValidatorTool(BaseADKTool):
    def __init__(self):
        super().__init__("JSX validator")

    def validate_input(self, **kwargs):
        if "code" not in kwargs and "json_str" not in kwargs:
            raise ValueError("Parameter 'code' or 'json_str' is required")

    async def execute(self, **kwargs) -> any:
        from backend.utils.jsx_parser import repair_jsx, repair_json_escapes, repair_truncated_json

        if "code" in kwargs:
            return repair_jsx(kwargs.get("code"))

        if "json_str" in kwargs:
            raw_json = kwargs.get("json_str")
            try:
                return repair_json_escapes(raw_json)
            except Exception:
                return repair_truncated_json(raw_json)
        return None


class VisionAnalyzerTool(BaseADKTool):
    def __init__(self):
        super().__init__("Vision analyzer")

    def validate_input(self, **kwargs):
        if "screenshot_paths" not in kwargs:
            raise ValueError("Parameter 'screenshot_paths' is required")

    async def execute(self, **kwargs) -> any:
        from backend.services.agents.vision_agent import run_vision_agent
        return await run_vision_agent(
            kwargs.get("screenshot_paths"),
            kwargs.get("metadata"),
            kwargs.get("is_single_mode", False)
        )


class HistoryManagerTool(BaseADKTool):
    def __init__(self):
        super().__init__("History manager")

    def validate_input(self, **kwargs):
        if "action" not in kwargs:
            raise ValueError("Parameter 'action' is required (load | save | rollback)")

    async def execute(self, **kwargs) -> any:
        from backend.services.editing.history_service import EditHistoryService
        service = EditHistoryService()
        action = kwargs.get("action")
        user_id = kwargs.get("user_id")
        session_id = kwargs.get("session_id")

        if action == "load":
            return service.load_history(user_id, session_id)
        elif action == "save":
            return service.save_snapshot(user_id, session_id, kwargs.get("prompt"), kwargs.get("files"), kwargs.get("metadata"))
        elif action == "rollback":
            return service.rollback_to_snapshot(user_id, session_id, kwargs.get("snapshot_id"))
        return None


# Register all tools into the central tool registry
registry = get_tool_registry()
registry.register_tool("chroma", ChromaTool())
registry.register_tool("screenshot", ScreenshotTool())
registry.register_tool("compiler", CompilerTool())
registry.register_tool("file_writer", FileWriterTool())
registry.register_tool("jsx_validator", JSXValidatorTool())
registry.register_tool("vision_analyzer", VisionAnalyzerTool())
registry.register_tool("history_manager", HistoryManagerTool())
