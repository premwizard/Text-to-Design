"""
config/settings.py
Centralized application settings from environment variables.
All env access should go through this module.
"""
from backend.app.utils.env import get_env


class Settings:
    """Application-wide configuration settings."""

    # API Keys
    GEMINI_API_KEY: str = get_env("GEMINI_API_KEY")
    GROQ_API_KEY: str = get_env("GROQ_API_KEY")
    OPENROUTER_API_KEY: str = get_env("OPENROUTER_API_KEY")

    # Provider fallback order (comma-separated)
    PROVIDER_FALLBACK_ORDER: str = get_env("PROVIDER_FALLBACK_ORDER", "gemini,groq,openrouter")

    # Server configuration
    HOST: str = get_env("HOST", "0.0.0.0")
    PORT: int = int(get_env("PORT", "8000"))
    DEBUG: bool = get_env("DEBUG", "false").lower() == "true"

    # CORS
    CORS_ORIGINS: list = ["*"]

    @classmethod
    def has_any_ai_key(cls) -> bool:
        """Return True if at least one AI API key is configured."""
        return any([cls.GEMINI_API_KEY, cls.GROQ_API_KEY, cls.OPENROUTER_API_KEY])


settings = Settings()
