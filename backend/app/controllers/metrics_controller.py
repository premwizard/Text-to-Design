"""
controllers/metrics_controller.py
Handles ADK metrics and debug event logging requests.
"""
import logging

logger = logging.getLogger("backend.app.controllers.metrics")


async def get_adk_metrics_handler() -> dict:
    """Return ADK pipeline performance dashboard metrics."""
    from backend.app.agents.evaluation_manager import get_evaluation_manager
    return get_evaluation_manager().get_dashboard_metrics()


async def log_debug_event_handler(session_id: str, stage: str, status: str, message: str) -> dict:
    """Log a structured debug event from the frontend or pipeline."""
    try:
        from backend.app.services.debug.debug_logger import DebugLogger
        db_logger = DebugLogger(session_id)
        db_logger.log(stage, status, message)
        return {"status": "ok"}
    except Exception as e:
        import traceback
        tb_str = traceback.format_exc()
        logger.exception("Failed to log debug event")
        return {"status": "error", "message": str(e), "traceback": tb_str}
