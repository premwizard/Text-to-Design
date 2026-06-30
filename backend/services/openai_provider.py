# Backward-compatibility shim — provider has moved to backend.providers.openai_provider
from backend.providers.openai_provider import generate_text, generate_stream  # noqa: F401
