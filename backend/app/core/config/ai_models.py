# Backward-compatibility shim — model config has moved to backend.app.core.config.model_config
from backend.app.core.config.model_config import (  # noqa: F401
    PROVIDERS_CONFIG, DEFAULT_PROVIDER_FALLBACK_ORDER, get_provider_fallback_order
)
