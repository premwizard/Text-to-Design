"""
db/memory_store.py
File-based user memory persistence store.
Thin wrapper exposing read/write helpers used by the memory agent.
"""
import json
import logging
from pathlib import Path

logger = logging.getLogger("backend.db.memory_store")

MEMORY_DIR = Path(__file__).parent.parent / "data" / "user_memory"


def _get_user_file(user_id: str) -> Path:
    MEMORY_DIR.mkdir(parents=True, exist_ok=True)
    clean_id = user_id.replace("@", "_").replace(".", "_") if user_id else "default_user"
    return MEMORY_DIR / f"{clean_id}.json"


def load_memory(user_id: str) -> dict:
    """Load user memory from disk. Returns empty default if not found."""
    file_path = _get_user_file(user_id)
    if not file_path.exists():
        return {
            "userId": user_id or "default_user",
            "preferences": {
                "theme": {},
                "style": {},
                "borderRadius": {},
                "spacing": {},
                "favoriteColors": {},
                "preferredLayouts": {},
                "commonComponents": {}
            },
            "history": [],
            "settings": {"enabled": True}
        }
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            if "settings" not in data:
                data["settings"] = {"enabled": True}
            if "preferences" not in data:
                data["preferences"] = {}
            return data
    except Exception as e:
        logger.error(f"Error loading user memory for {user_id}: {e}")
        return {}


def save_memory(user_id: str, memory_data: dict) -> None:
    """Persist user memory data to disk."""
    file_path = _get_user_file(user_id)
    try:
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(memory_data, f, indent=2)
    except Exception as e:
        logger.error(f"Error saving user memory for {user_id}: {e}")
