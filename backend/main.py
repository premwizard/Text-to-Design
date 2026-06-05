import logging
import sys
import asyncio
from pathlib import Path

if sys.platform == 'win32':
    asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())

ROOT_DIR = Path(__file__).resolve().parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from dotenv import load_dotenv
from fastapi import FastAPI, Request, WebSocket
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import httpx
import websockets
import mimetypes

# Ensure .jsx files are served with the correct JavaScript MIME type
mimetypes.add_type("application/javascript", ".jsx")
mimetypes.add_type("application/javascript", ".js")

from backend.routes.generate_ui import router as generate_router
from backend.routes.fix_jsx import router as fix_jsx_router
from backend.services.logger import setup_logging
from backend.rag.manager import setup_rag

load_dotenv()
setup_logging()
logger = logging.getLogger("backend")

app = FastAPI(title="Text to UI Design API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    logger.info("Starting backend and initializing RAG resources")
    try:
        setup_rag()
        logger.info("RAG initialization complete")
    except Exception as exc:
        logger.error("RAG initialization failed: %s", exc)
        logger.warning("Continuing startup without RAG retrieval")


@app.get("/health")
async def health_check():
    return {"status": "ok"}


app.include_router(generate_router)
app.include_router(fix_jsx_router)

# --- Static Sandbox File Serving ---
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

assets_dir = ROOT_DIR / "sandbox" / "dist" / "assets"
src_dir = ROOT_DIR / "sandbox" / "src"

if src_dir.exists():
    app.mount("/src", StaticFiles(directory=str(src_dir)), name="src")

@app.get("/preview/assets/{filename}")
async def serve_preview_assets(filename: str):
    if not assets_dir.exists():
        return {"error": "Not Found", "details": "Assets directory missing"}
        
    file_path = assets_dir / filename
    if file_path.exists() and file_path.is_file():
        return FileResponse(file_path)
    
    # Fallback to whatever hash is currently built if the HTML is requesting an old hash
    if filename.endswith(".js"):
        js_files = list(assets_dir.glob("*.js"))
        if js_files:
            return FileResponse(js_files[0])
    elif filename.endswith(".css"):
        css_files = list(assets_dir.glob("*.css"))
        if css_files:
            return FileResponse(css_files[0])
            
    return {"error": "Not Found"}

@app.get("/preview/{path:path}")
async def serve_preview(path: str):
    file_path = ROOT_DIR / "sandbox" / path
    if file_path.exists() and file_path.is_file():
        return FileResponse(file_path)
    return {"error": "Not Found", "details": "The requested file does not exist in the sandbox"}
