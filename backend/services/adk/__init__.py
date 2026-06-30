# ADK Framework package
# Agents and tools are now registered via backend.agents.*
# These imports trigger registration at startup
import backend.agents.wrapped_agents  # registers all ADK agents
import backend.agents.tools           # registers all ADK tools
