from fastapi import APIRouter, Response
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import json
import logging
import re
import anyio
from backend.services.ai_router import generate_ai
from backend.prompts import FIX_SYSTEM_PROMPT
from backend.routes.generate_ui import _repair_jsx

router = APIRouter()

class FixRequest(BaseModel):
    broken_code: str
    error: str

@router.post("/fix-jsx")
async def fix_jsx(request: FixRequest):
    """Auto-fix a broken React sandbox component using FIX_SYSTEM_PROMPT."""
    async def event_generator():
        try:
            system_instructions = FIX_SYSTEM_PROMPT.format(
                broken_code=request.broken_code,
                error=request.error
            )

            response = generate_ai(
                task_type="fix",
                system_prompt=system_instructions,
                user_prompt=f"Fix this component. The error is: {request.error}",
                temperature=0.1,
                stream=True
            )

            full_code = ""
            async for chunk in response:
                if isinstance(chunk, dict):
                    if chunk.get("type") == "fallback":
                        full_code = ""
                        continue
                    elif chunk.get("type") == "emergency":
                        yield f"data: {json.dumps({'error': chunk.get('message')})}\n\n"
                        continue
                
                content = chunk.choices[0].delta.content if hasattr(chunk, "choices") else None
                if content:
                    full_code += content

            # Server-side cleanup
            cleaned = full_code.strip()
            cleaned = re.sub(r'^```(?:jsx|javascript|js|react|tsx|ts)?\s*\n?', '', cleaned, flags=re.IGNORECASE)
            cleaned = re.sub(r'\n?```\s*$', '', cleaned)
            cleaned = cleaned.strip()

            from backend.project_runner import cleanGeneratedCode
            cleaned = cleanGeneratedCode(cleaned)

            # JSX completeness repair
            cleaned = _repair_jsx(cleaned)

            # Stream cleaned code in chunks
            chunk_size = 60
            for i in range(0, len(cleaned), chunk_size):
                yield f"data: {json.dumps({'chunk': cleaned[i:i+chunk_size]})}\n\n"
                await anyio.sleep(0.005)

            yield "data: [DONE]\n\n"

        except Exception as e:
            logging.error(f"Error fixing JSX: {e}")
            yield f"data: {json.dumps({'error': str(e)})}\n\n"
            yield "data: [DONE]\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")
