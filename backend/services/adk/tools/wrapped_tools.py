import logging
from backend.services.adk.tool_registry import BaseADKTool, get_tool_registry

logger = logging.getLogger("backend.services.adk.tools.wrapped_tools")

class ChromaTool(BaseADKTool):
    def __init__(self):
        super().__init__("ChromaDB search")

    def validate_input(self, **kwargs):
        if "action" not in kwargs:
            raise ValueError("Parameter 'action' is required (query | add | save_success)")

    async def execute(self, **kwargs) -> any:
        from backend.services.vector_db.chroma_service import ChromaService, save_successful_generation
        action = kwargs.get("action")
        db = ChromaService.get_instance()
        
        if action == "query":
            collection = kwargs.get("collection_name")
            text = kwargs.get("text")
            top_k = kwargs.get("top_k", 3)
            return db.query_similarity(collection, text, top_k)
        elif action == "add":
            collection = kwargs.get("collection_name")
            entry_id = kwargs.get("entry_id")
            text = kwargs.get("text")
            metadata = kwargs.get("metadata")
            db.add_entry(collection, entry_id, text, metadata)
            return True
        elif action == "save_success":
            prompt = kwargs.get("prompt")
            design_plan = kwargs.get("design_plan")
            critic_score = kwargs.get("critic_score")
            save_successful_generation(prompt, design_plan, critic_score)
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
        
        # Write files (which internally compiles Vite / esbuild and validates)
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
        files = kwargs.get("files")
        variation_id = kwargs.get("variation_id")
        await write_files(files, variation_id=variation_id)
        return True


class JSXValidatorTool(BaseADKTool):
    def __init__(self):
        super().__init__("JSX validator")

    def validate_input(self, **kwargs):
        if "code" not in kwargs and "json_str" not in kwargs:
            raise ValueError("Parameter 'code' or 'json_str' is required")

    async def execute(self, **kwargs) -> any:
        from backend.routes.generate_ui import _repair_jsx, _repair_json_escapes, _repair_truncated_json
        
        if "code" in kwargs:
            return _repair_jsx(kwargs.get("code"))
        
        if "json_str" in kwargs:
            raw_json = kwargs.get("json_str")
            try:
                # Attempt direct repair
                repaired = _repair_json_escapes(raw_json)
                return repaired
            except Exception:
                return _repair_truncated_json(raw_json)
        return None


class VisionAnalyzerTool(BaseADKTool):
    def __init__(self):
        super().__init__("Vision analyzer")

    def validate_input(self, **kwargs):
        if "screenshot_paths" not in kwargs:
            raise ValueError("Parameter 'screenshot_paths' is required")

    async def execute(self, **kwargs) -> any:
        from backend.services.agents.vision_agent import run_vision_agent
        paths = kwargs.get("screenshot_paths")
        metadata = kwargs.get("metadata")
        is_single_mode = kwargs.get("is_single_mode", False)
        return await run_vision_agent(paths, metadata, is_single_mode)


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
            prompt = kwargs.get("prompt")
            files = kwargs.get("files")
            metadata = kwargs.get("metadata")
            return service.save_snapshot(user_id, session_id, prompt, files, metadata)
        elif action == "rollback":
            snapshot_id = kwargs.get("snapshot_id")
            return service.rollback_to_snapshot(user_id, session_id, snapshot_id)
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
