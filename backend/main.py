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

# --- Vite Sandbox Proxy ---
proxy_client = httpx.AsyncClient(base_url="http://127.0.0.1:5174/", timeout=httpx.Timeout(60.0))

from backend.project_runner import start_vite, vite_is_running

@app.api_route("/preview/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH"])
async def proxy_preview(request: Request, path: str):
    if not vite_is_running():
        logger.info("Vite not running. Starting Vite dev server automatically before proxying...")
        await start_vite()

    url = httpx.URL(path=f"/preview/{path}", query=request.url.query.encode("utf-8"))
    headers = dict(request.headers)
    headers.pop("host", None)
    
    # Forward the request to the local Vite dev server
    req = proxy_client.build_request(
        request.method,
        url,
        headers=headers,
        content=request.stream()
    )
    
    try:
        r = await proxy_client.send(req, stream=True)
        return StreamingResponse(
            r.aiter_raw(),
            status_code=r.status_code,
            headers=r.headers
        )
    except httpx.RequestError as e:
        logger.error(f"Proxy request error: {e}")
        return {"error": "Sandbox not ready", "details": str(e)}

@app.websocket("/preview/{path:path}")
async def proxy_websocket(websocket: WebSocket, path: str):
    await websocket.accept()
    try:
        async with websockets.connect(f"ws://127.0.0.1:5174/preview/{path}") as ws_target:
            async def forward_to_target():
                try:
                    async for message in websocket.iter_text():
                        await ws_target.send(message)
                except Exception:
                    pass
            async def forward_to_client():
                try:
                    async for message in ws_target:
                        await websocket.send_text(message)
                except Exception:
                    pass
            await asyncio.gather(forward_to_target(), forward_to_client())
    except Exception as e:
        logger.error(f"WebSocket proxy error: {e}")
