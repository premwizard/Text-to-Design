"""
agents/tools.py
ADK tool implementations registered in the ToolRegistry.
Each tool wraps a specific capability (DB, screenshot, compiler, etc.).
"""
import logging
from backend.app.agents.tool_registry import BaseADKTool, get_tool_registry

logger = logging.getLogger("backend.app.agents.tools")


class ChromaTool(BaseADKTool):
    """
    Tool for interacting with the ChromaDB vector database.
    Supports querying similarity, adding entries, and saving successful generations.
    """
    def __init__(self):
        super().__init__("ChromaDB search")

    def validate_input(self, **kwargs):
        """Validates that the required 'action' parameter is present."""
        if "action" not in kwargs:
            raise ValueError("Parameter 'action' is required (query | add | save_success)")

    async def execute(self, **kwargs) -> any:
        """
        Executes vector database operations based on the specified action.
        Actions:
          - query: Search collection for similar items.
          - add: Insert a new document entry with metadata into ChromaDB.
          - save_success: Save a successful design generation summary and critic score.
        """
        from backend.app.repositories.chroma_service import ChromaService, save_successful_generation
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


class CompilerTool(BaseADKTool):
    """
    Tool for compiling and writing project files into the sandbox environment.
    """
    def __init__(self):
        super().__init__("Sandbox compiler")

    def validate_input(self, **kwargs):
        """Validates that the 'files' parameter mapping paths to code is provided."""
        if "files" not in kwargs:
            raise ValueError("Parameter 'files' (dict of path -> code) is required")

    async def execute(self, **kwargs) -> any:
        """
        Writes files to the sandbox directory and compiles the project files.
        """
        from backend.project_runner import write_files
        files = kwargs.get("files")
        variation_id = kwargs.get("variation_id")
        bypass_validation = kwargs.get("bypass_validation", False)
        await write_files(files, variation_id=variation_id, bypass_validation=bypass_validation)
        return True


class FileWriterTool(BaseADKTool):
    """
    Tool for writing generated source files to disk.
    """
    def __init__(self):
        super().__init__("File writer")

    def validate_input(self, **kwargs):
        """Validates that the 'files' parameter is present."""
        if "files" not in kwargs:
            raise ValueError("Parameter 'files' is required")

    async def execute(self, **kwargs) -> any:
        """
        Writes specified file contents to disk.
        """
        from backend.project_runner import write_files
        await write_files(kwargs.get("files"), variation_id=kwargs.get("variation_id"))
        return True


class JSXValidatorTool(BaseADKTool):
    """
    Tool for validating and repairing generated JSX code or JSON strings.
    """
    def __init__(self):
        super().__init__("JSX validator")

    def validate_input(self, **kwargs):
        """Validates that either 'code' or 'json_str' parameter is provided."""
        if "code" not in kwargs and "json_str" not in kwargs:
            raise ValueError("Parameter 'code' or 'json_str' is required")

    async def execute(self, **kwargs) -> any:
        """
        Parses and repairs broken/truncated JSX or escapes in JSON output.
        """
        from backend.app.utils.jsx_parser import repair_jsx, repair_json_escapes, repair_truncated_json

        if "code" in kwargs:
            return repair_jsx(kwargs.get("code"))

        if "json_str" in kwargs:
            raw_json = kwargs.get("json_str")
            try:
                return repair_json_escapes(raw_json)
            except Exception:
                return repair_truncated_json(raw_json)
        return None


class HistoryManagerTool(BaseADKTool):
    """
    Tool for managing edit history, session snapshots, and rollbacks.
    """
    def __init__(self):
        super().__init__("History manager")

    def validate_input(self, **kwargs):
        """Validates that 'action' is present and is one of load, save, or rollback."""
        if "action" not in kwargs:
            raise ValueError("Parameter 'action' is required (load | save | rollback)")

    async def execute(self, **kwargs) -> any:
        """
        Performs history operations (load history, save snapshot, or rollback).
        Actions:
          - load: Retrieve edit history for user and session.
          - save: Save a new project state snapshot.
          - rollback: Restore project state to a specific snapshot ID.
        """
        from backend.app.services.editing.history_service import EditHistoryService
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
registry.register_tool("compiler", CompilerTool())
registry.register_tool("file_writer", FileWriterTool())
registry.register_tool("jsx_validator", JSXValidatorTool())
registry.register_tool("history_manager", HistoryManagerTool())
