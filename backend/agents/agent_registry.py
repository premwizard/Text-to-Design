"""
agents/agent_registry.py
Central registry for all ADK agents. Agents register themselves via decorator.
"""
import logging

logger = logging.getLogger("backend.agents.registry")


class AgentRegistry:
    _instance = None

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def __init__(self):
        self._agents = {}

    def register_agent(self, name: str, agent_class):
        logger.info(f"[ADK] Registering agent: {name}")
        self._agents[name] = agent_class

    def get_agent(self, name: str):
        if not self._agents:
            logger.info("[ADK] Registry empty. Force-loading agents...")
            import importlib
            import backend.agents.wrapped_agents
            try:
                importlib.reload(backend.agents.wrapped_agents)
            except Exception as e:
                logger.error(f"[ADK] Failed to reload agents module: {e}")
        agent_cls = self._agents.get(name)
        if not agent_cls:
            raise KeyError(f"Agent '{name}' is not registered. Registered agents: {self.list_agents()}")
        return agent_cls()

    def list_agents(self):
        return list(self._agents.keys())


def register_adk_agent(name: str):
    """Decorator to register an ADK Agent."""
    def decorator(cls):
        AgentRegistry.get_instance().register_agent(name, cls)
        return cls
    return decorator


def get_agent_registry():
    return AgentRegistry.get_instance()
