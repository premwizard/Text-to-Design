# ADK Framework package
# Agents and tools are now registered via backend.app.agents.*
# These imports trigger registration at startup
import backend.app.agents.wrapped_agents  # registers all ADK agents
import backend.app.agents.tools           # registers all ADK tools
