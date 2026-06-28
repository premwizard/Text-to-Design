import os
import time
import shutil
import logging
import contextvars
from pathlib import Path

DEBUG_LOGS_DIR = Path(__file__).parent.parent.parent / "data" / "debug_logs"
SNAPSHOT_DIR = Path(__file__).parent.parent.parent / "data" / "failure_snapshots"

session_id_var = contextvars.ContextVar("session_id", default="global_debug")

class DebugLogger:
    def __init__(self, session_id: str = None):
        if session_id:
            self.session_id = session_id
        else:
            self.session_id = session_id_var.get()
        self.session_id = self.session_id or "default_session"
        DEBUG_LOGS_DIR.mkdir(parents=True, exist_ok=True)
        self.log_file = DEBUG_LOGS_DIR / f"{self.session_id}.log"
        
    def log(self, stage: str, status: str, message: str):
        timestamp = time.strftime("%H:%M:%S")
        log_line = f"[{timestamp}] [{stage}] [{status}]\n{message}\n\n"
        try:
            with open(self.log_file, "a", encoding="utf-8") as f:
                f.write(log_line)
        except Exception as e:
            logging.error(f"Failed to write to debug log {self.log_file}: {e}")

def save_failure_snapshot(session_id: str, files: dict, compile_output: str, screenshot_paths: dict = None):
    try:
        session_id = session_id or "default_session"
        target_dir = SNAPSHOT_DIR / session_id
        target_dir.mkdir(parents=True, exist_ok=True)
        
        # 1. Save generated files
        files_dir = target_dir / "files"
        files_dir.mkdir(parents=True, exist_ok=True)
        for path, content in files.items():
            safe_name = path.replace("/", "_").replace("\\", "_")
            (files_dir / safe_name).write_text(content, encoding="utf-8")
            
        # 2. Save compile output
        (target_dir / "compile_output.txt").write_text(compile_output or "", encoding="utf-8")
        
        # 3. Copy logs if available
        log_file = DEBUG_LOGS_DIR / f"{session_id}.log"
        if log_file.exists():
            shutil.copy2(log_file, target_dir / "session.log")
            
        # 4. Copy screenshots if available
        if screenshot_paths:
            screenshot_dir = target_dir / "screenshots"
            screenshot_dir.mkdir(parents=True, exist_ok=True)
            for key, path in screenshot_paths.items():
                if path and os.path.exists(path):
                    shutil.copy2(path, screenshot_dir / f"{key}.png")
                    
        logging.info(f"Successfully saved failure snapshot for session {session_id} in {target_dir}")
    except Exception as e:
        logging.error(f"Failed to save failure snapshot for session {session_id}: {e}")
