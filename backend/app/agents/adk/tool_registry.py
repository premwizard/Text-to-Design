# Backward-compatibility shim — has moved to backend.app.agents.tool_registry
from backend.app.agents.tool_registry import (  # noqa: F401
    BaseADKTool, ToolRegistry, get_tool_registry
)
