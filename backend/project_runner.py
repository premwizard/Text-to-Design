"""
project_runner.py
Manages the single Vite sandbox process.
- Writes generated files to sandbox/src/
- Starts / restarts the Vite dev server
- Streams stdout so the caller can forward status to the frontend
"""

import asyncio
import os
import shutil
import subprocess
import signal
import sys
from pathlib import Path

# Absolute path to the sandbox project (sibling of backend/)
BACKEND_DIR = Path(__file__).parent
SANDBOX_DIR = (BACKEND_DIR / "../sandbox").resolve()
SRC_DIR = SANDBOX_DIR / "src"

_vite_process: asyncio.subprocess.Process | None = None

# Determine correct npm command name on Windows vs Unix
NPM_CMD = "npm.cmd" if os.name == "nt" else "npm"

# ─── File writing ─────────────────────────────────────────────────────────────

def write_files(files: dict[str, str]) -> list[str]:
    """
    Write a dict of { "relative/path.jsx": "file content" } into sandbox/src/.
    Returns list of written paths for logging.
    Clears old generated component files first (keeps main.jsx, index.css).
    """
    components_dir = SRC_DIR / "components"
    # Clear old generated components so stale files don't linger
    if components_dir.exists():
        shutil.rmtree(components_dir)
    components_dir.mkdir(parents=True, exist_ok=True)

    written = []
    for rel_path, content in files.items():
        # Normalise: strip leading slash or src/
        rel_path = rel_path.lstrip("/")
        if rel_path.startswith("src/"):
            rel_path = rel_path[4:]

        dest = SRC_DIR / rel_path
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(content, encoding="utf-8")
        written.append(str(dest.relative_to(SANDBOX_DIR)))

    return written


# ─── npm install ─────────────────────────────────────────────────────────────

async def ensure_deps(log_cb=None):
    """Run npm install if node_modules doesn't exist."""
    nm = SANDBOX_DIR / "node_modules"
    if nm.exists():
        return
    if log_cb:
        await log_cb("Installing dependencies (first run — ~30s)...")

    proc = await asyncio.create_subprocess_exec(
        NPM_CMD, "install",
        cwd=str(SANDBOX_DIR),
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.STDOUT,
    )
    stdout, _ = await proc.communicate()
    if proc.returncode != 0:
        raise RuntimeError(f"npm install failed:\n{stdout.decode(errors='replace')}")

    if log_cb:
        await log_cb("Dependencies installed.")


# ─── Vite server ─────────────────────────────────────────────────────────────

async def start_vite(log_cb=None):
    """
    Kill any existing Vite process and start a fresh one.
    Yields log lines via log_cb until the server is ready.
    """
    global _vite_process
    await stop_vite()

    # Ensure dependencies are installed before starting
    await ensure_deps(log_cb)

    if log_cb:
        await log_cb("Starting Vite dev server on port 5174...")

    _vite_process = await asyncio.create_subprocess_exec(
        NPM_CMD, "run", "dev",
        cwd=str(SANDBOX_DIR),
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.STDOUT,
    )

    # Read output until "Local:" line appears (server is ready)
    ready = False
    async for raw in _vite_process.stdout:
        line = raw.decode(errors="replace").rstrip()
        if log_cb:
            await log_cb(f"[vite] {line}")
        # Support various readiness flags
        if "Local:" in line or "localhost" in line or "ready" in line.lower() or "port" in line:
            ready = True
            break

    return ready


async def stop_vite():
    """Gracefully terminate the existing Vite process."""
    global _vite_process
    if _vite_process and _vite_process.returncode is None:
        try:
            if os.name == 'nt':
                # On Windows, terminating the shell wrapper (npm.cmd) leaves node processes orphaned.
                # Taskkill /T /F forces all children in the tree to die.
                subprocess.run(
                    ["taskkill", "/F", "/T", "/PID", str(_vite_process.pid)],
                    stdout=subprocess.DEVNULL,
                    stderr=subprocess.DEVNULL
                )
            else:
                _vite_process.terminate()
            await asyncio.wait_for(_vite_process.wait(), timeout=5)
        except Exception:
            try:
                _vite_process.kill()
            except Exception:
                pass
    _vite_process = None


def vite_is_running() -> bool:
    return _vite_process is not None and _vite_process.returncode is None
