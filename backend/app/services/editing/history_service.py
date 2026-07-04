import json
import time
import logging
from pathlib import Path

logger = logging.getLogger("backend.editing.history_service")

HISTORY_DIR = Path(__file__).parent.parent.parent / "data" / "edit_history"

class EditHistoryService:
    """
    Manages session-level snapshot storage, history trails, and rollback triggers.
    """
    
    def __init__(self):
        HISTORY_DIR.mkdir(parents=True, exist_ok=True)
        
    def _get_history_file(self, user_id: str, session_id: str) -> Path:
        clean_user = user_id.replace("@", "_").replace(".", "_") if user_id else "default_user"
        clean_session = session_id.replace("/", "_").replace("\\", "_") if session_id else "default_session"
        user_dir = HISTORY_DIR / clean_user
        user_dir.mkdir(parents=True, exist_ok=True)
        return user_dir / f"{clean_session}.json"

    def load_history(self, user_id: str, session_id: str) -> list:
        file_path = self._get_history_file(user_id, session_id)
        if not file_path.exists():
            return []
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            logger.error(f"Error loading edit history for {user_id}/{session_id}: {e}")
            return []

    def save_history(self, user_id: str, session_id: str, history_data: list):
        file_path = self._get_history_file(user_id, session_id)
        try:
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(history_data, f, indent=2)
        except Exception as e:
            logger.error(f"Error saving edit history for {user_id}/{session_id}: {e}")

    def save_snapshot(self, user_id: str, session_id: str, prompt: str, files: dict, metadata: dict = None):
        """Creates and appends a new code snapshot to the history log."""
        history = self.load_history(user_id, session_id)
        snapshot_id = len(history) + 1
        
        snapshot = {
            "id": snapshot_id,
            "timestamp": int(time.time()),
            "prompt": prompt,
            "files": files,
            "metadata": metadata or {}
        }
        
        history.append(snapshot)
        self.save_history(user_id, session_id, history)
        logger.info(f"Saved edit snapshot #{snapshot_id} for {user_id}/{session_id}")
        return snapshot_id

    def rollback_to_snapshot(self, user_id: str, session_id: str, snapshot_id: int) -> dict:
        """Retrieves and restores the files state at snapshot_id."""
        history = self.load_history(user_id, session_id)
        
        target = next((snap for snap in history if snap["id"] == snapshot_id), None)
        if not target:
            raise ValueError(f"Snapshot with ID {snapshot_id} not found in history.")
            
        # Truncate history after this snapshot if desired, or keep as a new state.
        # To preserve future commits, we can just append a rollback record as a new snapshot!
        logger.info(f"Retrieved rollback target state for snapshot #{snapshot_id}")
        return target["files"]
