"""
services/memory_service.py
User memory retrieval and persistence service.
Provides a clean interface for controllers to interact with user preferences.
"""
import logging

logger = logging.getLogger("backend.app.services.memory")


def get_user_memory(user_id: str) -> dict:
    """Load raw user memory dict from disk."""
    from backend.app.agents.memory_agent import MemoryAgent
    agent = MemoryAgent()
    return agent.load_user_memory(user_id)


def get_memory_preferences(user_id: str) -> dict:
    """Get resolved/compiled user design preferences."""
    from backend.app.agents.memory_agent import MemoryAgent
    agent = MemoryAgent()
    return agent.get_memory_preferences(user_id)


def save_user_memory(user_id: str, memory_data: dict) -> None:
    """Persist updated user memory data to disk."""
    from backend.app.agents.memory_agent import MemoryAgent
    agent = MemoryAgent()
    agent.save_user_memory(user_id, memory_data)


def reset_memory(user_id: str) -> dict:
    """Reset all user preferences and history, return fresh memory object."""
    memory = get_user_memory(user_id)
    memory["preferences"] = {
        "theme": {}, "style": {}, "borderRadius": {},
        "spacing": {}, "favoriteColors": {},
        "preferredLayouts": {}, "commonComponents": {}
    }
    memory["history"] = []
    save_user_memory(user_id, memory)
    return memory


def set_memory_enabled(user_id: str, enabled: bool) -> dict:
    """Enable or disable personalized memory for a user."""
    memory = get_user_memory(user_id)
    memory.setdefault("settings", {})["enabled"] = enabled
    save_user_memory(user_id, memory)
    return memory
