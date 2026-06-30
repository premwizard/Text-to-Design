# Backward-compatibility shim — has moved to backend.app.agents.agent_registry
from backend.app.agents.agent_registry import (  # noqa: F401
    AgentRegistry, register_adk_agent, get_agent_registry
)
