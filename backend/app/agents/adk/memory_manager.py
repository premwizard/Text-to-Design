# Backward-compatibility shim — has moved to backend.app.agents.memory_manager
from backend.app.agents.memory_manager import (  # noqa: F401
    MemoryManager, get_memory_manager
)
