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
from fastapi import FastAPI, Request, WebSocket, HTTPException
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

# Ensure ADK agents and tools are registered at startup
import backend.services.adk.agents
import backend.services.adk.tools

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
        "http://localhost:8000",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "Cache-Control", "Pragma"],
)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Incoming Request: {request.method} {request.url.path}")
    response = await call_next(request)
    logger.info(f"Response Status: {response.status_code} for {request.url.path}")
    return response


@app.on_event("startup")
async def startup_event():
    logger.info("Starting backend and initializing RAG resources")
    try:
        setup_rag()
        logger.info("RAG initialization complete")
    except Exception as exc:
        logger.error("RAG initialization failed: %s", exc)
        logger.warning("Continuing startup without RAG retrieval")
        
    # Print all registered FastAPI routes at startup
    logger.info("=" * 80)
    logger.info("REGISTERED API ROUTES:")
    for route in app.routes:
        methods = getattr(route, 'methods', None)
        logger.info(f"Route Path: {route.path} | Methods: {methods}")
    logger.info("=" * 80)


@app.get("/")
async def root():
    return {
        "status": "active",
        "service": "Text-to-Design Backend",
        "message": "Welcome to the Text-to-Design API. Live endpoints are active.",
        "documentation": "/docs"
    }


@app.get("/health")
async def health_check():
    return {"status": "ok"}


@app.post("/log-debug-event")
async def log_debug_event_direct(request: Request):
    try:
        data = await request.json()
        session_id = data.get("session_id")
        stage = data.get("stage", "UNKNOWN")
        status = data.get("status", "INFO")
        message = data.get("message", "")
        
        from backend.services.debug.debug_logger import DebugLogger
        logger = DebugLogger(session_id)
        logger.log(stage, status, message)
        return {"status": "ok"}
    except Exception as e:
        logger.error(f"Failed to log debug event direct: {e}")
        return {"status": "error", "message": str(e)}


@app.post("/preview/log-debug-event")
async def log_debug_event_preview_direct(request: Request):
    return await log_debug_event_direct(request)


app.include_router(generate_router)
app.include_router(fix_jsx_router)

# Alias API routes under /preview to support preview-hosted frontend paths
app.include_router(generate_router, prefix="/preview")
app.include_router(fix_jsx_router, prefix="/preview")

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

screenshots_dir = ROOT_DIR / "backend" / "data" / "screenshots"
screenshots_dir.mkdir(parents=True, exist_ok=True)
app.mount("/screenshots", StaticFiles(directory=str(screenshots_dir)), name="screenshots")

@app.get("/preview/assets/{filename}")
async def serve_preview_assets(filename: str):
    logger.info(f"Requested preview asset: {filename}")
    if not assets_dir.exists():
        logger.warning(f"Assets directory missing: {assets_dir}")
        raise HTTPException(status_code=404, detail="Assets directory missing")
        
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
    raise HTTPException(status_code=404, detail="Asset not found")

@app.get("/preview/{path:path}")
async def serve_preview(path: str):
    logger.info(f"Requested preview path: {path}")
    
    # Standardise empty or index paths
    if not path or path.strip("/") == "" or path.strip("/") == "index.html":
        # Check dist first, then root sandbox index.html
        dist_index = ROOT_DIR / "sandbox" / "dist" / "index.html"
        root_index = ROOT_DIR / "sandbox" / "index.html"
        if dist_index.exists() and dist_index.is_file():
            logger.info(f"Serving preview index file from dist: {dist_index}")
            return FileResponse(dist_index)
        elif root_index.exists() and root_index.is_file():
            logger.info(f"Serving preview index file from sandbox root: {root_index}")
            return FileResponse(root_index)
            
    file_path = ROOT_DIR / "sandbox" / path
    logger.info(f"Checking physical preview path: {file_path}")
    if file_path.exists() and file_path.is_file():
        logger.info(f"Serving preview file: {file_path}")
        return FileResponse(file_path)
        
    # Check if maybe it's in the dist directory
    dist_file_path = ROOT_DIR / "sandbox" / "dist" / path
    if dist_file_path.exists() and dist_file_path.is_file():
        logger.info(f"Serving preview file from dist: {dist_file_path}")
        return FileResponse(dist_file_path)
        
    logger.warning(f"Preview file not found: {file_path}")
    raise HTTPException(status_code=404, detail="The requested file does not exist in the sandbox")
