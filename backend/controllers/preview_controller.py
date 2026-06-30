"""
controllers/preview_controller.py
Handles preview file serving, edit history, and rollback requests.
"""
import logging
from backend.services.preview_service import write_files

logger = logging.getLogger("backend.controllers.preview")


async def get_edit_history_handler(user_id: str, session_id: str) -> dict:
    """Return edit history overview (without full file contents)."""
    from backend.services.editing.history_service import EditHistoryService
    service = EditHistoryService()
    history = service.load_history(user_id, session_id)
    history_overview = [
        {
            "id": h["id"],
            "timestamp": h["timestamp"],
            "prompt": h["prompt"],
            "metadata": h["metadata"]
        }
        for h in history
    ]
    return {"history": history_overview}


async def rollback_handler(user_id: str, session_id: str, snapshot_id: int) -> dict:
    """Rollback to a previous code snapshot and recompile the sandbox."""
    try:
        from backend.services.editing.history_service import EditHistoryService
        service = EditHistoryService()
        files = service.rollback_to_snapshot(user_id, session_id, snapshot_id)
        await write_files(files)
        return {"status": "success", "files": files}
    except Exception as e:
        logger.error(f"Rollback failed: {e}")
        return {"status": "error", "message": str(e)}
