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
from backend.prompts import SYSTEM_PROMPT, EDIT_SYSTEM_PROMPT, FIX_SYSTEM_PROMPT


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


router = APIRouter()

class GenerateUIRequest(BaseModel):
    text: str

class StreamRequest(BaseModel):
    prompt: str
    current_code: Optional[str] = None

class FixRequest(BaseModel):
    broken_code: str
    error: str

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

@router.post("/save-files")
async def save_files(request: SaveFilesRequest):
    try:
        from backend.project_runner import write_files, start_vite, vite_is_running
        write_files(request.files)
        # Ensure Vite dev server is running
        if not vite_is_running():
            await start_vite()
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
            
            from backend.project_runner import write_files, start_vite, vite_is_running
            
            if not groq_api_key and not openai_api_key:
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
                write_files(parsed_data.get("files", {}))
                
                # Start Vite dev server if not running
                if not vite_is_running():
                    await start_vite()
                
                yield "data: [DONE]\n\n"
                return

            if groq_api_key:
                model = get_env("GROQ_MODEL", default="llama-3.3-70b-versatile")
                client = openai.AsyncOpenAI(
                    api_key=groq_api_key,
                    base_url="https://api.groq.com/openai/v1"
                )
            elif openai_api_key:
                model = get_env("OPENAI_MODEL", default="gpt-4o-mini")
                client = openai.AsyncOpenAI(
                    api_key=openai_api_key
                )
            else:
                return

            if request.current_code:
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
            else:
                system_instructions = SYSTEM_PROMPT
                user_message = request.prompt

            response = await client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": system_instructions},
                    {"role": "user", "content": user_message}
                ],
                temperature=0.2,
                stream=True
            )

            full_code = ""
            async for chunk in response:
                content = chunk.choices[0].delta.content
                if content:
                    full_code += content
                    yield f"data: {json.dumps({'chunk': content})}\n\n"

            # ── server-side cleanup ────────────────────────────────────────
            cleaned = full_code.strip()
            cleaned = re.sub(r'^```(?:json|jsx|javascript|js|react|tsx|ts)?\s*\n?', '', cleaned, flags=re.IGNORECASE)
            cleaned = re.sub(r'\n?```\s*$', '', cleaned)
            cleaned = cleaned.strip()

            # Parse and write files
            try:
                # Find the JSON start and end in case there is trailing/leading text
                start_idx = cleaned.find('{')
                end_idx = cleaned.rfind('}')
                if start_idx != -1 and end_idx != -1:
                    json_str = cleaned[start_idx:end_idx+1]
                    parsed_data = json.loads(json_str)
                else:
                    raise ValueError("No valid JSON object found in response")
                
                # Write files
                files = parsed_data.get("files", {})
                write_files(files)
                
                # Start Vite dev server if not running
                if not vite_is_running():
                    await start_vite()
            except Exception as e:
                logging.error(f"Error parsing or writing generated files: {e}")
                yield f"data: {json.dumps({'error': f'Failed to write files: {str(e)}'})}\n\n"

            yield "data: [DONE]\n\n"

        except Exception as e:
            logging.exception("Error streaming JSX")
            yield f"data: {json.dumps({'error': str(e)})}\n\n"
            yield "data: [DONE]\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")


@router.post("/fix-jsx")
async def fix_jsx(request: FixRequest):
    """Auto-fix a broken React sandbox component using FIX_SYSTEM_PROMPT."""
    async def event_generator():
        try:
            groq_api_key = get_env("GROQ_API_KEY")
            openai_api_key = get_env("OPENAI_API_KEY")

            if groq_api_key:
                model = get_env("GROQ_MODEL", default="llama-3.3-70b-versatile")
                client = openai.AsyncOpenAI(
                    api_key=groq_api_key,
                    base_url="https://api.groq.com/openai/v1"
                )
            elif openai_api_key:
                model = get_env("OPENAI_MODEL", default="gpt-4o-mini")
                client = openai.AsyncOpenAI(
                    api_key=openai_api_key
                )
            else:
                yield f"data: {json.dumps({'error': 'No API key configured. Set GROQ_API_KEY or OPENAI_API_KEY.'})}\n\n"
                yield "data: [DONE]\n\n"
                return

            system_instructions = FIX_SYSTEM_PROMPT.format(
                broken_code=request.broken_code,
                error=request.error
            )

            response = await client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": system_instructions},
                    {"role": "user", "content": f"Fix this component. The error is: {request.error}"}
                ],
                temperature=0.1,
                stream=True
            )

            full_code = ""
            async for chunk in response:
                content = chunk.choices[0].delta.content
                if content:
                    full_code += content

            # Server-side cleanup
            cleaned = full_code.strip()
            cleaned = re.sub(r'^```(?:jsx|javascript|js|react|tsx|ts)?\s*\n?', '', cleaned, flags=re.IGNORECASE)
            cleaned = re.sub(r'\n?```\s*$', '', cleaned)
            cleaned = cleaned.strip()

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
