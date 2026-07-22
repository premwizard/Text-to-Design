import os
import logging
import sys
import asyncio
from pathlib import Path
from dotenv import load_dotenv

if sys.platform == 'win32':
    asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())

BACKEND_DIR = Path(__file__).resolve().parent.parent
ROOT_DIR = BACKEND_DIR.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

# Early load environment variables based on ENVIRONMENT setting
app_env = os.getenv("ENVIRONMENT") or os.getenv("APP_ENV") or os.getenv("ENV_MODE") or "development"
env_filename = f".env.{app_env.lower()}"

for env_dir in [ROOT_DIR, BACKEND_DIR, Path.cwd()]:
    env_file = env_dir / env_filename
    if env_file.exists():
        load_dotenv(dotenv_path=env_file, override=True)

for env_dir in [ROOT_DIR, BACKEND_DIR, Path.cwd()]:
    env_file = env_dir / ".env"
    if env_file.exists():
        load_dotenv(dotenv_path=env_file, override=False)
load_dotenv()

from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import mimetypes

# Ensure .jsx files are served with the correct JavaScript MIME type
mimetypes.add_type("application/javascript", ".jsx")
mimetypes.add_type("application/javascript", ".js")

from backend.app.api.routes.generate_routes import router as generate_routes_router
from backend.app.api.routes.memory_routes import router as memory_routes_router
from backend.app.api.routes.preview_routes import router as preview_routes_router
from backend.app.api.routes.metrics_routes import router as metrics_routes_router

from backend.app.services.logger import setup_logging
from backend.app.rag.manager import setup_rag

setup_logging()
logger = logging.getLogger("backend")

is_debug = os.getenv("DEBUG", "true").lower() in ("true", "1", "t")
app_environment = os.getenv("ENVIRONMENT", "development").lower()

app = FastAPI(
    title="Text to UI Design API",
    version="1.0.0",
    debug=is_debug
)

allowed_origins_raw = os.getenv("ALLOWED_ORIGINS", "*")
if allowed_origins_raw.strip() == "*":
    allow_origins = ["*"]
else:
    allow_origins = [origin.strip() for origin in allowed_origins_raw.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    logger.error(f"Validation error: {exc.errors()}")
    return JSONResponse(
        status_code=422,
        content={"status": "error", "message": "Validation error", "details": exc.errors()}
    )

@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"status": "error", "message": exc.detail}
    )

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": f"Internal server error: {type(exc).__name__}",
            "details": str(exc)
        }
    )
async def log_requests(request: Request, call_next):
    logger.info(f"Incoming Request: {request.method} {request.url.path}")
    response = await call_next(request)
    logger.info(f"Response Status: {response.status_code} for {request.url.path}")
    return response


@app.on_event("startup")
async def startup_event():
    logger.info("Starting backend and initializing resources")
    
    try:
        logger.info("Preloading tool registry...")
        from backend.app.agents.tool_registry import get_tool_registry
        registry = get_tool_registry()
        # Getting a tool forces the dynamic import if not already loaded
        registry.get_tool("compiler")
        logger.info(f"Tool registry preloaded successfully. Available tools: {registry.list_tools()}")
    except Exception as e:
        logger.error(f"Failed to preload tool registry: {e}")
    
    # Initialize Vector DB & ML Models Eagerly
    from backend.app.repositories.chroma_service import ChromaService
    try:
        logger.info("Eagerly loading SentenceTransformer and ChromaDB...")
        chroma = ChromaService.get_instance()
        app.state.embedding_model = chroma.model
        app.state.chroma_client = chroma.client
        logger.info("Models loaded successfully to app.state.")
    except Exception as e:
        logger.error(f"Failed to preload models: {e}")

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
        if hasattr(route, 'path'):
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


# New clean architecture routes
app.include_router(generate_routes_router)
app.include_router(memory_routes_router)
app.include_router(preview_routes_router)
app.include_router(metrics_routes_router)

# Alias API routes under /preview to support preview-hosted frontend paths
app.include_router(generate_routes_router, prefix="/preview")
app.include_router(metrics_routes_router, prefix="/preview")

# --- Static Sandbox File Serving ---
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

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
