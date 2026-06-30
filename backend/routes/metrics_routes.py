"""
routes/metrics_routes.py
API routes for ADK metrics dashboard and debug event logging.
Delegates all logic to metrics_controller.
"""
from fastapi import APIRouter, Request
from pydantic import BaseModel

from backend.controllers.metrics_controller import (
    get_adk_metrics_handler, log_debug_event_handler
)

router = APIRouter()


class LogEventRequest(BaseModel):
    session_id: str
    stage: str
    status: str
    message: str


@router.get("/adk-metrics")
async def get_adk_metrics():
    return await get_adk_metrics_handler()


@router.post("/log-debug-event")
async def log_debug_event(request: LogEventRequest):
    return await log_debug_event_handler(
        session_id=request.session_id,
        stage=request.stage,
        status=request.status,
        message=request.message
    )
