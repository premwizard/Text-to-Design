"""
routes/memory_routes.py
API routes for user memory retrieval and settings management.
Delegates all logic to memory_controller.
"""
from fastapi import APIRouter
from typing import Optional

from backend.app.controllers.memory_controller import (
    get_memory_handler, update_memory_settings_handler
)
from backend.app.models.requests import MemorySettingsRequest

router = APIRouter()



@router.get("/user-memory")
async def get_user_memory(userId: Optional[str] = None):
    return await get_memory_handler(user_id=userId)


@router.post("/user-memory/settings")
async def update_memory_settings(request: MemorySettingsRequest):
    return await update_memory_settings_handler(
        user_id=request.userId,
        enabled=request.enabled,
        reset=request.reset
    )
