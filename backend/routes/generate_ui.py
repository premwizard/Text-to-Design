from fastapi import APIRouter, Response
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional
import json
import logging
import re
import openai
import anyio
from backend.utils.env import get_env
from backend.prompts import PLANNER_PROMPT, BUILDER_PROMPT, EDIT_SYSTEM_PROMPT, FIX_SYSTEM_PROMPT


def _repair_json_escapes(raw: str) -> str:
    r"""
    Walk the raw JSON string character-by-character and, inside string literals,
    double-escape any backslash that is NOT already part of a valid JSON escape
    sequence.  Valid sequences: \", \\, \/, \b, \f, \n, \r, \t, \uXXXX.

    This fixes the common LLM mistake of emitting literal Python/JS escape
    sequences (\n, \t, \d, \., \s, ...) inside JSON strings without doubling
    them, which causes json.loads() to raise 'Invalid \escape'.
    """
    VALID_ESCAPES = set('"\\/' 'bfnrtu')
    result = []
    in_string = False
    i = 0
    length = len(raw)
    while i < length:
        ch = raw[i]
        if in_string:
            if ch == '\\':
                # Look at the next character
                if i + 1 < length:
                    nxt = raw[i + 1]
                    if nxt in VALID_ESCAPES:
                        # Legal escape — copy both chars unchanged
                        result.append(ch)
                        result.append(nxt)
                        i += 2
                        continue
                    else:
                        # Invalid bare backslash — double it
                        result.append('\\\\')
                        i += 1
                        continue
                else:
                    # Trailing backslash at end of input — double it
                    result.append('\\\\')
                    i += 1
                    continue
            elif ch == '"':
                in_string = False
                result.append(ch)
                i += 1
                continue
            else:
                result.append(ch)
                i += 1
                continue
        else:
            if ch == '"':
                in_string = True
            result.append(ch)
            i += 1
    return ''.join(result)


def _repair_truncated_json(raw: str) -> str:
    """
    Attempt to close an LLM response that was truncated mid-stream.
    Handles:
      - Unterminated string literals  → closes the open quote
      - Unbalanced arrays / objects   → appends matching ] or } closers

    This is a best-effort repair and is only called after both the
    initial parse and the escape-repair pass have already failed.
    """
    result = []
    in_string = False
    escaped = False
    stack = []  # tracks '{' and '[' nesting

    for ch in raw:
        result.append(ch)
        if escaped:
            escaped = False
            continue
        if ch == '\\' and in_string:
            escaped = True
            continue
        if ch == '"':
            in_string = not in_string
            continue
        if not in_string:
            if ch == '{' or ch == '[':
                stack.append(ch)
            elif ch == '}':
                if stack and stack[-1] == '{':
                    stack.pop()
            elif ch == ']':
                if stack and stack[-1] == '[':
                    stack.pop()

    # Close any open string first
    if in_string:
        result.append('"')

    # Close remaining open containers in LIFO order
    for opener in reversed(stack):
        result.append('}' if opener == '{' else ']')

    return ''.join(result)


def _repair_jsx(code: str) -> str:
    """
    Post-process LLM JSX output to ensure it is complete and balanced:
    1. Truncate at the last clean closing tag/brace if output was cut short.
    2. Close unbalanced curly braces so Babel can parse the file.
    3. Ensure the GeneratedPage function body and return() are both closed.
    """
    if not code:
        return code

    # ── 1. Find the last clean closing boundary ────────────────────────────
    # A clean boundary is a line that ends a JSX block: ), }, );, };, or />
    clean_boundary_re = re.compile(
        r'^\s*(?:\);?|};?|/>|<\/\w[\w.]*>)\s*$', re.MULTILINE
    )

    lines = code.split('\n')

    # Find last line that looks like a valid closing
    last_clean = len(lines) - 1
    for i in range(len(lines) - 1, -1, -1):
        stripped = lines[i].strip()
        if clean_boundary_re.match(lines[i]) or stripped in ('}', ')', '};', ');', '/>'):
            last_clean = i
            break

    # Truncate to last clean boundary
    lines = lines[:last_clean + 1]
    code = '\n'.join(lines)

    # ── 2. Balance curly braces ────────────────────────────────────────────
    open_braces = code.count('{') - code.count('}')
    if open_braces > 0:
        # Close any open blocks (JSX expressions, function body)
        code = code.rstrip()
        code += '\n' + '  ' * max(open_braces - 1, 0) + '\n'.join(['}'] * open_braces)

    # ── 3. Ensure GeneratedPage function closure ───────────────────────────
    # If the code ends without a bare closing `}` on its own line, add one
    last_meaningful = code.rstrip().splitlines()[-1].strip() if code.strip() else ''
    if last_meaningful not in ('}', '};'):
        code = code.rstrip() + '\n}'

    return code.strip()


from backend.services.ai_router import generate_ai

router = APIRouter()

class GenerateUIRequest(BaseModel):
    text: str

class StreamRequest(BaseModel):
    prompt: str
    current_code: Optional[str] = None
    user_id: Optional[str] = None

class FixRequest(BaseModel):
    broken_code: str
    error: str

class MemorySettingsRequest(BaseModel):
    userId: Optional[str] = None
    enabled: Optional[bool] = None
    reset: Optional[bool] = False

@router.get("/user-memory")
async def get_user_memory(userId: Optional[str] = None):
    from backend.services.agents.memory_agent import MemoryAgent
    agent = MemoryAgent()
    memory = agent.load_user_memory(userId)
    resolved = agent.get_memory_preferences(userId)
    return {
        "memory": memory,
        "resolved": resolved
    }

@router.post("/user-memory/settings")
async def update_memory_settings(request: MemorySettingsRequest):
    from backend.services.agents.memory_agent import MemoryAgent
    agent = MemoryAgent()
    memory = agent.load_user_memory(request.userId)
    
    if request.reset:
        memory["preferences"] = {
            "theme": {},
            "style": {},
            "borderRadius": {},
            "spacing": {},
            "favoriteColors": {},
            "preferredLayouts": {},
            "commonComponents": {}
        }
        memory["history"] = []
        logging.info(f"Reset memory preferences for {request.userId}")
        
    if request.enabled is not None:
        memory["settings"]["enabled"] = request.enabled
        logging.info(f"Set memory customization enabled to {request.enabled} for {request.userId}")
        
    agent.save_user_memory(request.userId, memory)
    return {"status": "success", "memory": memory}

@router.post("/generate-ui")
async def generate_ui(request: GenerateUIRequest, response: Response):
    # Backward compatibility endpoint
    response.headers["Cache-Control"] = "no-cache"
    return {
        "page": "landing",
        "design": {
            "primaryColor": "#6366f1",
            "secondaryColor": "#0f172a",
            "borderRadius": "lg",
            "font": "Outfit"
        },
        "components": [
            {
                "id": "nav-1",
                "type": "navbar",
                "variant": "standard",
                "props": {
                    "logo": "UI Studio",
                    "links": ["Home", "Features", "Pricing", "FAQ"]
                }
            }
        ]
    }

class SaveFilesRequest(BaseModel):
    files: dict[str, str]
    variation_id: Optional[str] = None

@router.post("/save-files")
async def save_files(request: SaveFilesRequest):
    try:
        from backend.project_runner import write_files, cleanGeneratedCode
        # STEP 8: Print the exact code passed into LivePreview/Vite
        logging.warning("=" * 80)
        logging.warning("STEP 8: SaveFilesRequest payload (passed to Vite)")
        for fname, fcontent in request.files.items():
            logging.warning(f"File: {fname} (length: {len(fcontent)})")
            logging.warning(fcontent[:300] + ("..." if len(fcontent) > 300 else ""))
        logging.warning("=" * 80)

        # Clean every file after receiving/parsing JSON
        cleaned_files = {k: cleanGeneratedCode(v) for k, v in request.files.items()}
        await write_files(cleaned_files, variation_id=request.variation_id)
        return {"status": "success"}
    except Exception as e:
        logging.error(f"Error saving files: {e}")
        return {"status": "error", "message": str(e)}

@router.post("/stream-jsx")
async def stream_jsx(request: StreamRequest):
    async def event_generator():
        try:
            groq_api_key = get_env("GROQ_API_KEY")
            openai_api_key = get_env("OPENAI_API_KEY")
            gemini_api_key = get_env("GEMINI_API_KEY")
            openrouter_api_key = get_env("OPENROUTER_API_KEY")
            
            from backend.project_runner import write_files
            
            if not any([groq_api_key, openai_api_key, gemini_api_key, openrouter_api_key]):
                # No key fallback: stream a mock React+Tailwind multi-file JSON structure
                mock_json = """{
  "files": {
    "App.jsx": "import Navbar from './components/Navbar';\\nimport HeroSection from './components/HeroSection';\\nimport FeatureCard from './components/FeatureCard';\\n\\nexport default function App() {\\n  return (\\n    <div className=\\"min-h-screen bg-zinc-950 text-white font-sans\\">\\n      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'); body { font-family: 'Plus Jakarta Sans', sans-serif; }`}</style>\\n      <Navbar />\\n      <HeroSection />\\n      <div className=\\"max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-6\\">\\n        <FeatureCard title=\\"Real React Compiler\\" description=\\"Compiled via Vite dev server, allowing real imports and actual package resolving.\\" />\\n        <FeatureCard title=\\"Vite Hot Module Reloading\\" description=\\"Changes inside the source code panel immediately hot-reload the live iframe preview.\\" />\\n        <FeatureCard title=\\"Multi-File Projects\\" description=\\"Generates custom navbar, hero sections, and cards in clean individual components.\\" />\\n      </div>\\n    </div>\\n  );\\n}",
    "components/Navbar.jsx": "import { useState } from 'react';\\nimport { Sparkles } from 'lucide-react';\\n\\nexport default function Navbar() {\\n  return (\\n    <nav className=\\"border-b border-zinc-900 bg-zinc-950/40 backdrop-blur-md px-8 py-4 flex items-center justify-between\\">\\n      <div className=\\"flex items-center gap-2\\">\\n        <Sparkles className=\\"text-sky-400\\" size={18} />\\n        <span className=\\"font-bold text-sm tracking-tight\\">Vite Sandbox Workspace</span>\\n      </div>\\n      <div className=\\"flex gap-6 text-xs text-zinc-400\\">\\n        <span className=\\"hover:text-zinc-200 cursor-pointer\\">Preview</span>\\n        <span className=\\"hover:text-zinc-200 cursor-pointer\\">Components</span>\\n        <span className=\\"hover:text-zinc-200 cursor-pointer\\">Docs</span>\\n      </div>\\n    </nav>\\n  );\\n}",
    "components/HeroSection.jsx": "import { ArrowRight, Sparkles } from 'lucide-react';\\n\\nexport default function HeroSection() {\\n  return (\\n    <div className=\\"relative flex flex-col items-center justify-center max-w-4xl mx-auto px-6 py-20 text-center\\">\\n      <div className=\\"inline-flex items-center gap-1.5 bg-sky-500/10 border border-sky-500/20 text-[10px] uppercase font-bold tracking-widest px-3.5 py-1 rounded-full text-sky-400 mb-6\\">\\n        <Sparkles size={12} /> Live Vite Compilation\\n      </div>\\n      <h1 className=\\"text-5xl sm:text-6xl font-black tracking-tight leading-none\\">\\n        Real-Time React Multi-File <br />\\n        <span className=\\"text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500\\">Vite Sandbox Engine</span>\\n      </h1>\\n      <p className=\\"mt-6 text-base text-zinc-400 max-w-xl leading-relaxed\\">\\n        The server is running offline or has no API keys loaded. Set GROQ_API_KEY or OPENAI_API_KEY in your environment to stream live layout code.\\n      </p>\\n    </div>\\n  );\\n}",
    "components/FeatureCard.jsx": "import { Check } from 'lucide-react';\\n\\nexport default function FeatureCard({ title, description }) {\\n  return (\\n    <div className=\\"bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition\\">\\n      <Check className=\\"text-emerald-450 mb-3\\" size={20} />\\n      <h3 className=\\"font-semibold text-white\\">{title}</h3>\\n      <p className=\\"text-xs text-zinc-400 mt-2 leading-relaxed\\">{description}</p>\\n    </div>\\n  );\\n}"
  }
}"""
                # Stream the mockup code progressively in SSE format
                chunk_size = 60
                for i in range(0, len(mock_json), chunk_size):
                    chunk = mock_json[i:i+chunk_size]
                    yield f"data: {json.dumps({'chunk': chunk})}\n\n"
                    await anyio.sleep(0.01)
                
                # Write files to sandbox
                parsed_data = json.loads(mock_json)
                from backend.project_runner import cleanGeneratedCode
                files = parsed_data.get("files", {})
                cleaned_files = {k: cleanGeneratedCode(v) for k, v in files.items()}
                await write_files(cleaned_files)
                
                
                yield "data: [DONE]\n\n"
                return

            # AI Router handles client initialization based on env keys internally

            if request.current_code:
                # EDIT MODE (Single Variation)
                try:
                    parsed = json.loads(request.current_code)
                    meta_str = json.dumps(parsed.get("meta", {}), indent=2)
                except Exception:
                    meta_str = "{}"

                system_instructions = (
                    EDIT_SYSTEM_PROMPT
                    .replace('{meta}', meta_str)
                    .replace('{current_files}', request.current_code)
                    .replace('{edit_prompt}', request.prompt)
                )
                user_message = f"Edit request: {request.prompt}"
                
                response = generate_ai(
                    task_type="editor",
                    system_prompt=system_instructions,
                    user_prompt=user_message,
                    temperature=1.0,
                    stream=True
                )
                
                full_code = ""
                async for chunk in response:
                    if isinstance(chunk, dict):
                        if chunk.get("type") == "fallback":
                            full_code = ""
                            yield f"data: {json.dumps({'type': 'fallback', 'message': chunk.get('message')})}\n\n"
                            continue
                        elif chunk.get("type") == "emergency":
                            yield f"data: {json.dumps({'error': chunk.get('message')})}\n\n"
                            yield "data: [DONE]\n\n"
                            return
                    
                    content = chunk.choices[0].delta.content if hasattr(chunk, "choices") else None
                    if content:
                        full_code += content
                        yield f"data: {json.dumps({'chunk': content})}\n\n"

                # Parse and write files
                cleaned = full_code.strip()
                cleaned = re.sub(r'^```(?:json|jsx|javascript|js|react|tsx|ts)?\s*\n?', '', cleaned, flags=re.IGNORECASE)
                cleaned = re.sub(r'\n?```\s*$', '', cleaned)
                cleaned = re.sub(r'^<!--.*?-->\s*', '', cleaned, flags=re.DOTALL)
                cleaned = re.sub(r'\s*<!--.*?-->$', '', cleaned, flags=re.DOTALL)
                cleaned = cleaned.strip()

                start_idx = cleaned.find('{')
                end_idx = cleaned.rfind('}')
                if start_idx != -1 and end_idx != -1:
                    json_str = cleaned[start_idx:end_idx+1]
                    try:
                        parsed_data = json.loads(json_str)
                    except json.JSONDecodeError as first_err:
                        repaired = _repair_json_escapes(json_str)
                        try:
                            parsed_data = json.loads(repaired)
                        except json.JSONDecodeError as second_err:
                            truncation_repaired = _repair_truncated_json(repaired)
                            parsed_data = json.loads(truncation_repaired)
                else:
                    raise ValueError("No valid JSON object found in response")
                
                files = parsed_data.get("files", {})
                from backend.project_runner import cleanGeneratedCode, write_files
                cleaned_files = {k: cleanGeneratedCode(v) for k, v in files.items()}
                
                # Single variation defaults to root or varA (if the UI expects a var)
                # But for backwards compatibility, just use the variation_id from frontend if passed. 
                # Actually, edits don't need a variation loop, but they do need to be written to the correct folder.
                # In Edit mode, frontend handles save_files itself usually, but backend `/stream-jsx` does it too.
                # We'll just write it to root for now, or we can skip writing in `/stream-jsx` entirely and let frontend call `/save-files`!
                await write_files(cleaned_files)

            else:
                # ─── GENERATE MULTI-AGENT PIPELINE ────────────────────────
                from backend.services.agents.orchestrator import run_orchestration_stream
                
                async for event in run_orchestration_stream(request.prompt, request.user_id):
                    yield f"data: {json.dumps(event)}\n\n"

            yield "data: [DONE]\n\n"


        except Exception as e:
            logging.exception("Error streaming JSX")
            yield f"data: {json.dumps({'error': str(e)})}\n\n"
            yield "data: [DONE]\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")


class EditUIRequest(BaseModel):
    user_id: str
    session_id: str
    edit_prompt: str
    current_code: str
    design_metadata: Optional[dict] = None

class RollbackRequest(BaseModel):
    user_id: str
    session_id: str
    snapshot_id: int

@router.post("/edit-ui")
async def edit_ui(request: EditUIRequest):
    async def edit_event_generator():
        try:
            # Parse current_code (which contains {"files": {...}})
            try:
                parsed = json.loads(request.current_code)
                current_files = parsed.get("files", {})
            except Exception:
                current_files = {}

            from backend.services.agents.orchestrator import run_edit_orchestration_stream
            async for event in run_edit_orchestration_stream(
                user_id=request.user_id,
                session_id=request.session_id,
                edit_prompt=request.edit_prompt,
                current_files=current_files,
                design_metadata=request.design_metadata
            ):
                yield f"data: {json.dumps(event)}\n\n"

            yield "data: [DONE]\n\n"
        except Exception as e:
            logging.exception("Error streaming edit updates")
            yield f"data: {json.dumps({'error': str(e)})}\n\n"
            yield "data: [DONE]\n\n"

    return StreamingResponse(edit_event_generator(), media_type="text/event-stream")

@router.get("/edit-history")
async def get_edit_history(user_id: str, session_id: str):
    from backend.services.editing.history_service import EditHistoryService
    service = EditHistoryService()
    history = service.load_history(user_id, session_id)
    # Return brief overview (omit full files contents to save network bandwidth)
    history_overview = [
        {
            "id": h["id"],
            "timestamp": h["timestamp"],
            "prompt": h["prompt"],
            "metadata": h["metadata"]
        }
        for h in history
    ]
    return {"history": history_overview}

@router.post("/edit-history/rollback")
async def rollback_history(request: RollbackRequest):
    try:
        from backend.services.editing.history_service import EditHistoryService
        from backend.project_runner import write_files
        service = EditHistoryService()
        files = service.rollback_to_snapshot(request.user_id, request.session_id, request.snapshot_id)
        
        # Write back to sandbox to compile and refresh preview
        await write_files(files)
        return {"status": "success", "files": files}
    except Exception as e:
        logging.error(f"Rollback failed: {e}")
        return {"status": "error", "message": str(e)}




