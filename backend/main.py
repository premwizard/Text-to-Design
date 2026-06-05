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
if assets_dir.exists():
    app.mount("/preview/assets", StaticFiles(directory=str(assets_dir)), name="preview_assets")
else:
    logger.warning(f"Assets directory not found at {assets_dir}. Ensure 'npm run build' was run in sandbox.")

@app.get("/preview/{path:path}")
async def serve_preview(path: str):
    file_path = ROOT_DIR / "sandbox" / path
    if file_path.exists() and file_path.is_file():
        return FileResponse(file_path)
    return {"error": "Not Found", "details": "The requested file does not exist in the sandbox"}
