import logging
from backend.services.agents.memory_agent import run_memory_retrieval, update_user_memory
from backend.services.agents.rag_retrieval_agent import run_rag_retrieval

logger = logging.getLogger("backend.services.adk.memory_manager")

class MemoryManager:
    _instance = None

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def __init__(self):
        self._session_memories = {}

    def get_session_memory(self, session_id: str) -> dict:
        if not session_id:
            return {}
        return self._session_memories.setdefault(session_id, {})

    def update_session_memory(self, session_id: str, data: dict):
        if not session_id:
            return
        session_mem = self.get_session_memory(session_id)
        session_mem.update(data)

    async def get_user_preferences(self, user_id: str, prompt: str) -> dict:
        """Retrieves user style preferences using statistical frequency and semantic memory."""
        try:
            return await run_memory_retrieval(user_id, prompt)
        except Exception as e:
            logger.error(f"Failed to fetch user preferences from MemoryAgent: {e}")
            return {}

    def save_user_preferences(self, user_id: str, prompt: str, design_plan: dict):
        """Updates count logs and vector database entries."""
        try:
            update_user_memory(user_id, prompt, design_plan)
        except Exception as e:
            logger.error(f"Failed to save preferences in MemoryAgent: {e}")

    async def retrieve_rag_patterns(self, intent_json: dict, prompt: str) -> dict:
        """Queries the design knowledge database for similar design archetypes."""
        try:
            return await run_rag_retrieval(intent_json, prompt)
        except Exception as e:
            logger.error(f"Failed to run RAG design retrieval: {e}")
            return {}

def get_memory_manager():
    return MemoryManager.get_instance()
