"""
config/model_config.py
AI provider model configurations and fallback order.
Previously in config/ai_models.py — that file is kept as a shim.
"""
import os

# Define the global provider configuration with models ordered by preference
PROVIDERS_CONFIG = {
    "gemini": [
        "gemini-2.5-flash",
        "gemini-2.5-flash-lite",
        "gemini-2.0-flash",
        "gemini-2.0-flash-lite",
        "gemini-1.5-flash",
        "gemini-1.5-pro"
    ],
    "groq": [
        "llama-3.3-70b-versatile",
        "llama-3.1-8b-instant"
    ],
    "openai": [
        "gpt-4o-mini",
        "gpt-4o"
    ],
    "openrouter": [
        "anthropic/claude-3.5-haiku",
        "anthropic/claude-3.5-sonnet",
        "google/gemini-2.5-flash"
    ]
}

DEFAULT_PROVIDER_FALLBACK_ORDER = "gemini,groq,openai,openrouter"


def get_provider_fallback_order() -> list[str]:
    """Return the provider fallback order from env or use default."""
    order_str = os.getenv("PROVIDER_FALLBACK_ORDER", DEFAULT_PROVIDER_FALLBACK_ORDER)
    return [p.strip().lower() for p in order_str.split(",") if p.strip()]
