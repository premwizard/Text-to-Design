# Backward-compatibility shim — ChromaDB service has moved to backend.app.repositories.chroma_service
from backend.app.repositories.chroma_service import ChromaService, save_successful_generation  # noqa: F401
