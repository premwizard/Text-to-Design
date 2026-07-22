import os
from pathlib import Path
from dotenv import load_dotenv

_env_loaded = False

def _ensure_env_loaded():
    global _env_loaded
    if not _env_loaded:
        app_env = os.getenv("ENVIRONMENT") or os.getenv("APP_ENV") or os.getenv("ENV_MODE") or "development"
        root_dir = Path(__file__).resolve().parent.parent.parent.parent
        backend_dir = Path(__file__).resolve().parent.parent.parent
        
        env_files = []
        if app_env.lower() == "production":
            env_files.extend([
                root_dir / ".env.production",
                backend_dir / ".env.production",
            ])
        else:
            env_files.extend([
                root_dir / ".env.development",
                backend_dir / ".env.development",
            ])
            
        env_files.extend([
            root_dir / ".env",
            backend_dir / ".env",
            Path.cwd() / ".env"
        ])
        
        for env_file in env_files:
            if env_file.exists():
                load_dotenv(dotenv_path=env_file, override=False)
        load_dotenv()
        _env_loaded = True

def get_env(key: str, default: str | None = None, required: bool = False) -> str | None:
    _ensure_env_loaded()
    value = os.getenv(key, default)
    if required and not value:
        raise EnvironmentError(f"Missing required environment variable: {key}")
    return value

