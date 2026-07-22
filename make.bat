@echo off
set CMD=%1

if "%CMD%"=="" set CMD=help

if "%CMD%"=="help" (
    echo Available commands:
    echo   make dev           Start backend FastAPI server
    echo   make dev-backend   Start backend FastAPI server
    echo   make dev-client    Start Vite frontend server
    echo   make install       Install frontend and backend dependencies
    echo   make build         Build frontend for production
    echo   make lint          Run ESLint on frontend
    echo   make test          Run backend pytest suite
    echo   make clean         Clean build and cache artifacts
    exit /b 0
)

if "%CMD%"=="dev" (
    python -m uvicorn backend.app.main:app --reload --port 8000
) else if "%CMD%"=="dev-backend" (
    python -m uvicorn backend.app.main:app --reload --port 8000
) else if "%CMD%"=="dev-client" (
    npm --prefix client run dev
) else if "%CMD%"=="install" (
    call npm --prefix client install
    pip install -r backend/requirements.txt
) else if "%CMD%"=="build" (
    npm --prefix client run build
) else if "%CMD%"=="lint" (
    npm --prefix client run lint
) else if "%CMD%"=="test" (
    pytest backend/tests
) else if "%CMD%"=="clean" (
    python -c "import shutil, glob; [shutil.rmtree(p, ignore_errors=True) for p in ['client/dist', '.pytest_cache', '.ruff_cache'] + glob.glob('**/__pycache__', recursive=True)]"
) else (
    echo Unknown target "%CMD%". Run "make help" for available commands.
)
