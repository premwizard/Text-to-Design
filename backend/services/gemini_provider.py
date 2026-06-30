# Backward-compatibility shim — provider has moved to backend.providers.gemini_provider
from backend.providers.gemini_provider import generate_text, generate_stream  # noqa: F401
