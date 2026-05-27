from fastapi import APIRouter, Response

from backend.models.ui_request import GenerateUIRequest
from backend.models.ui_response import UIResponse
from backend.services.llm_service import generate_ui_design

router = APIRouter()


@router.post("/generate-ui", response_model=UIResponse)
async def generate_ui(request: GenerateUIRequest, response: Response):
    print("Incoming prompt:", request.text)
    response.headers["Cache-Control"] = "no-cache"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"

    data = await generate_ui_design(request.text)
    print("Outgoing UI payload:", data)
    return data
