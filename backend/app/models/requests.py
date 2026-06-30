from pydantic import BaseModel
from typing import Optional, Dict

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
    design_metadata: Optional[Dict] = None

class SaveFilesRequest(BaseModel):
    files: Dict[str, str]
    variation_id: Optional[str] = None

class FixRequest(BaseModel):
    broken_code: str
    error: str

class MemorySettingsRequest(BaseModel):
    userId: Optional[str] = None
    enabled: Optional[bool] = None
    reset: Optional[bool] = False

class RollbackRequest(BaseModel):
    user_id: str
    session_id: str
    snapshot_id: int

class LogEventRequest(BaseModel):
    session_id: str
    stage: str
    status: str
    message: str

class PromptRequest(BaseModel):
    prompt: str

class GenerateUIRequest(BaseModel):
    page: str
    design: Dict
    components: list
