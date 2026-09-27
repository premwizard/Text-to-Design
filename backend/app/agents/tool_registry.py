"""
agents/tool_registry.py
Central registry for all ADK tools. Tools register themselves at module import.
"""
import logging

logger = logging.getLogger("backend.app.agents.tool_registry")


class BaseADKTool:
    """
    Abstract base class for all ADK tool implementations.
    Tools must define input validation and execution logic.
    """
    def __init__(self, name: str):
        self.name = name

    def validate_input(self, **kwargs):
        """Validates input arguments. Raises ValueError if validation fails."""
        pass

    async def execute(self, **kwargs) -> any:
        """Executes the tool logic asynchronously."""
        raise NotImplementedError("Tools must implement execute")


class ToolRegistry:
    """
    Singleton registry managing all active ADK tools in the system.
    """
    _instance = None

    @classmethod
    def get_instance(cls):
        """Returns the global ToolRegistry singleton instance."""
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def __init__(self):
        self._tools = {}

    def register_tool(self, name: str, tool_instance: BaseADKTool):
        """Registers a tool instance under a unique string name."""
        if name in self._tools:
            logger.debug(f"[ADK] Tool {name} is already registered. Skipping duplicate registration.")
            return
        logger.info(f"[ADK] Registering tool: {name}")
        self._tools[name] = tool_instance

    def get_tool(self, name: str) -> BaseADKTool:
        """Retrieves a registered tool by name, force-loading default tools if registry is empty."""
        if not self._tools:
            logger.info("[ADK] Registry empty. Force-loading tools...")
            import importlib
            import backend.app.agents.tools
            try:
                importlib.reload(backend.app.agents.tools)
            except Exception as e:
                logger.error(f"[ADK] Failed to reload tools module: {e}")
        tool = self._tools.get(name)
        if not tool:
            raise KeyError(f"Tool '{name}' is not registered. Registered tools: {self.list_tools()}")
        return tool

    def list_tools(self):
        """Returns a list of all registered tool names."""
        return list(self._tools.keys())


def get_tool_registry():
    """Helper function to obtain the central ToolRegistry singleton instance."""
    return ToolRegistry.get_instance()
