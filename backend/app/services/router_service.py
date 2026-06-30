"""
services/router_service.py
AI model routing service — provider fallback, retry, and streaming.
Re-exports from the canonical ai_router module for backward compatibility.
"""
# Re-export public API from ai_router (canonical implementation stays there)
from backend.app.services.ai_router import (  # noqa: F401
    generate_ai,
    get_available_provider_order,
    mark_model_cooldown,
    is_model_available,
    is_rate_limited,
)
