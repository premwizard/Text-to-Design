# Backward-compatibility shim — has moved to backend.agents.agent_registry
from backend.agents.agent_registry import (  # noqa: F401
    AgentRegistry, register_adk_agent, get_agent_registry
)
