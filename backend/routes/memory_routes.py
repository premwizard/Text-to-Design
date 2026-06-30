"""
routes/memory_routes.py
API routes for user memory retrieval and settings management.
Delegates all logic to memory_controller.
"""
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

from backend.controllers.memory_controller import (
    get_memory_handler, update_memory_settings_handler
)

router = APIRouter()


class MemorySettingsRequest(BaseModel):
    userId: Optional[str] = None
    enabled: Optional[bool] = None
    reset: Optional[bool] = False


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
