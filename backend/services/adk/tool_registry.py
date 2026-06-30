# Backward-compatibility shim — has moved to backend.agents.tool_registry
from backend.agents.tool_registry import (  # noqa: F401
    BaseADKTool, ToolRegistry, get_tool_registry
)
