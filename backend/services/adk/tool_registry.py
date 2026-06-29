import logging

logger = logging.getLogger("backend.services.adk.tool_registry")

class BaseADKTool:
    def __init__(self, name: str):
        self.name = name

    def validate_input(self, **kwargs):
        """Validates input arguments. Should raise exceptions if validation fails."""
        pass

    async def execute(self, **kwargs) -> any:
        """Executes the tool logic."""
        raise NotImplementedError("Tools must implement execute")

class ToolRegistry:
    _instance = None

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def __init__(self):
        self._tools = {}

    def register_tool(self, name: str, tool_instance: BaseADKTool):
        logger.info(f"[ADK] Registering tool: {name}")
        self._tools[name] = tool_instance

    def get_tool(self, name: str) -> BaseADKTool:
        tool = self._tools.get(name)
        if not tool:
            raise KeyError(f"Tool '{name}' is not registered.")
        return tool

    def list_tools(self):
        return list(self._tools.keys())

def get_tool_registry():
    return ToolRegistry.get_instance()
