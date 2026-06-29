import logging

logger = logging.getLogger("backend.services.adk.agent_registry")

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
        agent_cls = self._agents.get(name)
        if not agent_cls:
            raise KeyError(f"Agent '{name}' is not registered.")
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
