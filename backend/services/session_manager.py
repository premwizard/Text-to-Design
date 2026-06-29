import json
from pathlib import Path
from backend.logger.logger import get_logger

logger = get_logger()

class SessionManager:
    def __init__(self, base_dir: str = None):
        if base_dir:
            self.base_dir = Path(base_dir)
        else:
            self.base_dir = Path(__file__).parent.parent / "sessions"
        self.base_dir.mkdir(parents=True, exist_ok=True)

    def create_session(self, session_id: str) -> Path:
        """Create a new session directory."""
        session_path = self.base_dir / session_id
        try:
            session_path.mkdir(parents=True, exist_ok=True)
            logger.info(f"Session created: {session_id}")
            return session_path
        except Exception as e:
            logger.error(f"Failed to create session {session_id}: {str(e)}")
            raise e

    def save_session_data(self, session_id: str, filename: str, data: dict | list):
        """Save JSON data to a session directory."""
        session_path = self.base_dir / session_id
        if not session_path.exists():
            self.create_session(session_id)
            
        file_path = session_path / filename
        try:
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)
            logger.debug(f"Saved session data to {filename}")
        except Exception as e:
            logger.error(f"Failed to save {filename} for session {session_id}: {str(e)}")
            raise e

    def get_session_data(self, session_id: str, filename: str) -> dict | list | None:
        """Read JSON data from a session directory."""
        file_path = self.base_dir / session_id / filename
        if not file_path.exists():
            return None
            
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            logger.error(f"Failed to read {filename} for session {session_id}: {str(e)}")
            return None

session_manager = SessionManager()
