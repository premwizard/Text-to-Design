# Backward-compatibility shim — provider has moved to backend.app.services.providers.openai_provider
from backend.app.services.providers.openai_provider import generate_text, generate_stream  # noqa: F401
