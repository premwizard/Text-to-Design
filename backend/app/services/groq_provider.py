# Backward-compatibility shim — provider has moved to backend.app.services.providers.groq_provider
from backend.app.services.providers.groq_provider import generate_text, generate_stream  # noqa: F401
