"""
routes/generate_routes.py
Clean API route definitions for generation, editing, and file saving.
Delegates all logic to generate_controller.
"""
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional

from backend.controllers.generate_controller import (
    stream_generation, save_files_handler, fix_jsx_stream
)

router = APIRouter()


class StreamRequest(BaseModel):
    prompt: str
    current_code: Optional[str] = None
    user_id: Optional[str] = None
    generation_mode: Optional[str] = "single_mode"
    variation_count: Optional[int] = 1


class EditUIRequest(BaseModel):
    user_id: str
    session_id: str
    edit_prompt: str
    current_code: str
    design_metadata: Optional[dict] = None


class SaveFilesRequest(BaseModel):
    files: dict[str, str]
    variation_id: Optional[str] = None


class FixRequest(BaseModel):
    broken_code: str
    error: str


@router.post("/stream-jsx")
async def stream_jsx(request: StreamRequest):
    request_data = {
        "prompt": request.prompt,
        "current_code": request.current_code,
        "user_id": request.user_id,
        "generation_mode": request.generation_mode,
        "variation_count": request.variation_count,
    }
    return await stream_generation(request_data)


@router.post("/edit-ui")
async def edit_ui(request: EditUIRequest):
    request_data = {
        "prompt": request.edit_prompt,
        "current_code": request.current_code,
        "user_id": request.user_id,
        "session_id": request.session_id,
        "design_metadata": request.design_metadata,
        "action": "edit",
    }
    return await stream_generation(request_data)


@router.post("/save-files")
async def save_files(request: SaveFilesRequest):
    return await save_files_handler(request.files, variation_id=request.variation_id)


@router.post("/fix-jsx")
async def fix_jsx(request: FixRequest):
    return await fix_jsx_stream(request.broken_code, request.error)


@router.post("/generate-ui")
async def generate_ui_compat():
    """Backward compatibility stub for legacy /generate-ui endpoint."""
    return {
        "page": "landing",
        "design": {"primaryColor": "#6366f1", "secondaryColor": "#0f172a", "borderRadius": "lg", "font": "Outfit"},
        "components": [{"id": "nav-1", "type": "navbar", "variant": "standard", "props": {"logo": "UI Studio", "links": ["Home", "Features", "Pricing", "FAQ"]}}]
    }
