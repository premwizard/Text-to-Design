# Backward-compatibility shim — provider has moved to backend.providers.groq_provider
from backend.providers.groq_provider import generate_text, generate_stream  # noqa: F401
