# Backward-compatibility shim — tools have moved to backend.app.agents.tools
from backend.app.agents.tools import (  # noqa: F401
    ChromaTool, CompilerTool, FileWriterTool,
    JSXValidatorTool, HistoryManagerTool
)
