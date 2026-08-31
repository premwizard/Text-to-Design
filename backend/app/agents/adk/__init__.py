# ADK Framework package
# Agents and tools are now registered via backend.app.agents.*
# These imports trigger registration at startup
import backend.app.agents.wrapped_agents  # noqa: F401  # registers all ADK agents
