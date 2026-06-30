from backend.app.core.config.ai_models import PROVIDERS_CONFIG, get_provider_fallback_order

def get_fallback_chain():
    """
    Returns an ordered list of (provider_name, model_name) tuples to try.
    It builds this based on the global PROVIDER_FALLBACK_ORDER and the PROVIDERS_CONFIG.
    """
    providers = get_provider_fallback_order()
    chain = []
    for provider in providers:
        if provider in PROVIDERS_CONFIG:
            for model in PROVIDERS_CONFIG[provider]:
                chain.append((provider, model))
    return chain

def get_models_for_task(task_type: str):
    """
    For backwards compatibility or specific task overrides if added later.
    Currently returns the global fallback chain for all tasks.
    """
    return get_fallback_chain()
