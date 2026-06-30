"""
controllers/memory_controller.py
Handles user memory retrieval and settings update requests.
"""
import logging
from backend.app.services.memory_service import (
    get_user_memory, get_memory_preferences,
    save_user_memory, reset_memory, set_memory_enabled
)

logger = logging.getLogger("backend.app.controllers.memory")


async def get_memory_handler(user_id: str = None) -> dict:
    """Return raw memory and resolved preferences for a user."""
    memory = get_user_memory(user_id)
    resolved = get_memory_preferences(user_id)
    return {"memory": memory, "resolved": resolved}


async def update_memory_settings_handler(user_id: str, enabled: bool = None, reset: bool = False) -> dict:
    """Update memory enabled flag or reset memory for a user."""
    if reset:
        memory = reset_memory(user_id)
        logger.info(f"Reset memory for {user_id}")
    else:
        memory = get_user_memory(user_id)

    if enabled is not None:
        memory = set_memory_enabled(user_id, enabled)
        logger.info(f"Set memory enabled={enabled} for {user_id}")

    return {"status": "success", "memory": memory}
