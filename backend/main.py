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
    allow_origins=[
        "https://synapseai-ebon.vercel.app",
        "http://localhost:5173",
        "https://text-to-design.vercel.app",
        "https://text-to-design.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "Cache-Control", "Pragma"],
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
dist_dir = ROOT_DIR / "sandbox" / "dist"

# Ensure directories exist so they can be successfully mounted statically
logger.info("Initializing static directories...")
logger.info(f"Source directory: {src_dir} (exists: {src_dir.exists()})")
logger.info(f"Dist directory: {dist_dir} (exists: {dist_dir.exists()})")
src_dir.mkdir(parents=True, exist_ok=True)
dist_dir.mkdir(parents=True, exist_ok=True)

logger.info("Mounting /src and /dist static directories unconditionally")
app.mount("/src", StaticFiles(directory=str(src_dir)), name="src")
app.mount("/dist", StaticFiles(directory=str(dist_dir)), name="dist")

@app.get("/preview/assets/{filename}")
async def serve_preview_assets(filename: str):
    logger.info(f"Requested preview asset: {filename}")
    if not assets_dir.exists():
        logger.warning(f"Assets directory missing: {assets_dir}")
        return {"error": "Not Found", "details": "Assets directory missing"}
        
    file_path = assets_dir / filename
    logger.info(f"Checking physical asset path: {file_path}")
    if file_path.exists() and file_path.is_file():
        logger.info(f"Serving asset file: {file_path}")
        return FileResponse(file_path)
    
    # Fallback to whatever hash is currently built if the HTML is requesting an old hash
    stem = Path(filename).stem.split('-')[0] # get base name without hash
    logger.info(f"Asset file not found directly. Falling back using stem: {stem}")
    if filename.endswith(".js"):
        js_files = list(assets_dir.glob(f"{stem}*.js"))
        if js_files:
            logger.info(f"Fallback found JS file: {js_files[0]}")
            return FileResponse(js_files[0])
    elif filename.endswith(".css"):
        css_files = list(assets_dir.glob(f"{stem}*.css"))
        if css_files:
            logger.info(f"Fallback found CSS file: {css_files[0]}")
            return FileResponse(css_files[0])
            
    logger.warning(f"Preview asset not found: {filename}")
    return {"error": "Not Found"}

@app.get("/preview/{path:path}")
async def serve_preview(path: str):
    logger.info(f"Requested preview path: {path}")
    file_path = ROOT_DIR / "sandbox" / path
    logger.info(f"Checking physical preview path: {file_path}")
    if file_path.exists() and file_path.is_file():
        logger.info(f"Serving preview file: {file_path}")
        return FileResponse(file_path)
    logger.warning(f"Preview file not found: {file_path}")
    return {"error": "Not Found", "details": "The requested file does not exist in the sandbox"}
