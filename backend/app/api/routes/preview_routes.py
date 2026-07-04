"""
routes/preview_routes.py
API routes for edit history and rollback.
Delegates all logic to preview_controller.
"""
from fastapi import APIRouter

from backend.app.controllers.preview_controller import (
    get_edit_history_handler, rollback_handler
)
from backend.app.models.requests import RollbackRequest

router = APIRouter()



@router.get("/edit-history")
async def get_edit_history(user_id: str, session_id: str):
    return await get_edit_history_handler(user_id, session_id)


@router.post("/edit-history/rollback")
async def rollback_history(request: RollbackRequest):
    return await rollback_handler(request.user_id, request.session_id, request.snapshot_id)
