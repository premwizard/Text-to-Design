from pydantic import BaseModel, Field


class GenerateUIRequest(BaseModel):
    text: str = Field(..., min_length=1, description="Natural language description of the page or UI layout")
