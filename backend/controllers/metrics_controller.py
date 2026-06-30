"""
controllers/metrics_controller.py
Handles ADK metrics and debug event logging requests.
"""
import logging

logger = logging.getLogger("backend.controllers.metrics")


async def get_adk_metrics_handler() -> dict:
    """Return ADK pipeline performance dashboard metrics."""
    from backend.agents.evaluation_manager import get_evaluation_manager
    return get_evaluation_manager().get_dashboard_metrics()


async def log_debug_event_handler(session_id: str, stage: str, status: str, message: str) -> dict:
    """Log a structured debug event from the frontend or pipeline."""
    try:
        from backend.services.debug.debug_logger import DebugLogger
        db_logger = DebugLogger(session_id)
        db_logger.log(stage, status, message)
        return {"status": "ok"}
    except Exception as e:
        logger.error(f"Failed to log debug event: {e}")
        return {"status": "error", "message": str(e)}
