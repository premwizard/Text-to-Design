# Backward-compatibility shim — ChromaDB service has moved to backend.db.chroma_service
from backend.db.chroma_service import ChromaService, save_successful_generation  # noqa: F401
