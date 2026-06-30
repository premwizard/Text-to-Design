"""
controllers/generate_controller.py
Handles generation, editing, and file-saving requests.
Calls generation_service and preview_service — no business logic here.
"""
import json
import logging
from fastapi import Response
from fastapi.responses import StreamingResponse

from backend.services.generation_service import run_generation
from backend.services.preview_service import write_files
from backend.project_runner import cleanGeneratedCode

logger = logging.getLogger("backend.controllers.generate")


async def stream_generation(request_data: dict) -> StreamingResponse:
    """Stream SSE events from the generation/edit pipeline."""
    async def _event_generator():
        try:
            async for event in run_generation(request_data):
                yield f"data: {json.dumps(event)}\n\n"
            yield "data: [DONE]\n\n"
        except Exception as e:
            logger.exception("Error in generation stream")
            yield f"data: {json.dumps({'error': str(e)})}\n\n"
            yield "data: [DONE]\n\n"

    return StreamingResponse(_event_generator(), media_type="text/event-stream")


async def save_files_handler(files: dict, variation_id: str = None) -> dict:
    """
    Validate, sanitize, and write generated files to the sandbox.
    Returns a status dict.
    """
    try:
        cleaned_files = {k: cleanGeneratedCode(v) for k, v in files.items()}
        await write_files(cleaned_files, variation_id=variation_id)
        return {"status": "success"}
    except Exception as e:
        logger.error(f"Error saving files: {e}")
        return {"status": "error", "message": str(e)}


async def fix_jsx_stream(broken_code: str, error: str) -> StreamingResponse:
    """Stream AI-fixed JSX code for a broken component."""
    import anyio
    import re
    from backend.services.ai_router import generate_ai
    from backend.prompts import FIX_SYSTEM_PROMPT
    from backend.utils.jsx_parser import repair_jsx

    async def _event_generator():
        try:
            system_instructions = FIX_SYSTEM_PROMPT.format(
                broken_code=broken_code, error=error
            )
            response = generate_ai(
                task_type="fix",
                system_prompt=system_instructions,
                user_prompt=f"Fix this component. The error is: {error}",
                temperature=0.1,
                stream=True
            )

            full_code = ""
            async for chunk in response:
                if isinstance(chunk, dict):
                    if chunk.get("type") in ("fallback", "emergency"):
                        continue
                content = chunk.choices[0].delta.content if hasattr(chunk, "choices") else None
                if content:
                    full_code += content

            # Clean and repair
            cleaned = re.sub(r'^```(?:jsx|javascript|js|react|tsx|ts)?\s*\n?', '', full_code.strip(), flags=re.IGNORECASE)
            cleaned = re.sub(r'\n?```\s*$', '', cleaned).strip()
            cleaned = cleanGeneratedCode(cleaned)
            cleaned = repair_jsx(cleaned)

            chunk_size = 60
            for i in range(0, len(cleaned), chunk_size):
                yield f"data: {json.dumps({'chunk': cleaned[i:i+chunk_size]})}\n\n"
                await anyio.sleep(0.005)

            yield "data: [DONE]\n\n"
        except Exception as e:
            logger.error(f"Error fixing JSX: {e}")
            yield f"data: {json.dumps({'error': str(e)})}\n\n"
            yield "data: [DONE]\n\n"

    return StreamingResponse(_event_generator(), media_type="text/event-stream")
