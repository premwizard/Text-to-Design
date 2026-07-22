.PHONY: help install install-client install-backend dev-client dev-backend dev build lint test clean

.DEFAULT_GOAL := help

help: ## Display available Makefile commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-18s %s\n", $$1, $$2}'

install: install-client install-backend ## Install dependencies for both client and backend

install-client: ## Install client npm packages
	cd client && npm install

install-backend: ## Install backend Python dependencies
	pip install -r backend/requirements.txt

dev-client: ## Start Vite frontend development server
	npm --prefix client run dev

dev-backend: ## Start FastAPI backend development server
	python -m uvicorn backend.app.main:app --reload --port 8000

dev: ## Alias for dev-backend
	python -m uvicorn backend.app.main:app --reload --port 8000

build: ## Build frontend application for production
	npm --prefix client run build

lint: ## Run ESLint code checks for frontend
	npm --prefix client run lint

test: ## Run backend unit tests with pytest
	pytest backend/tests

clean: ## Remove build artifacts, distribution files, and cache directories
	python -c "import shutil, glob; [shutil.rmtree(p, ignore_errors=True) for p in ['client/dist', '.pytest_cache', '.ruff_cache'] + glob.glob('**/__pycache__', recursive=True)]"