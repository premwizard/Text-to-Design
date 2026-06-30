import logging
import anyio
import time
import os
from backend.app.services.prompt_optimizer import optimize_prompt
from backend.app.core.config.ai_models import PROVIDERS_CONFIG, get_provider_fallback_order

# Load providers from the canonical providers/ package
import backend.app.services.providers.groq_provider as groq_provider
import backend.app.services.providers.gemini_provider as gemini_provider
import backend.app.services.providers.openai_provider as openai_provider
import backend.app.services.providers.openrouter_provider as openrouter_provider

PROVIDERS = {
    "groq": groq_provider,
    "gemini": gemini_provider,
    "openai": openai_provider,
    "openrouter": openrouter_provider
}

FALLBACK_KEYWORDS = [
    "429",
    "rate_limit",
    "quota",
    "capacity",
    "busy",
    "timeout",
    "temporarily unavailable",
    "service unavailable",
    "too many requests",
    "resource_exhausted",
    "rate limit exceeded",
    "connection reset",
    "connection aborted"
]

MODEL_COOLDOWNS = {}

def is_rate_limited(error: Exception) -> bool:
    error_text = str(error).lower()
    return any(token in error_text for token in FALLBACK_KEYWORDS)

def mark_model_cooldown(model_name: str, cooldown_minutes: int = 60) -> None:
    expiry = time.time() + (cooldown_minutes * 60)
    MODEL_COOLDOWNS[model_name] = expiry

def is_model_available(model_name: str) -> bool:
    if model_name in MODEL_COOLDOWNS:
        if time.time() < MODEL_COOLDOWNS[model_name]:
            return False
        else:
            del MODEL_COOLDOWNS[model_name]
    return True

def get_next_model(provider_name: str):
    models = PROVIDERS_CONFIG.get(provider_name.lower(), [])
    for model_name in models:
        if is_model_available(model_name):
            yield model_name

def _build_messages(system_prompt: str, user_prompt: str):
    messages = []
    if system_prompt:
        messages.append({"role": "system", "content": system_prompt})
    if user_prompt:
        messages.append({"role": "user", "content": user_prompt})
    return messages

def get_available_provider_order():
    provider_order = get_provider_fallback_order()
    available = []
    for p in provider_order:
        p_lower = p.lower()
        if p_lower == "openai" and not os.getenv("OPENAI_API_KEY"):
            logging.warning("[Router] Skipping OpenAI - OPENAI_API_KEY missing.")
            continue
        if p_lower == "openrouter" and not os.getenv("OPENROUTER_API_KEY"):
            logging.warning("[Router] Skipping OpenRouter - OPENROUTER_API_KEY missing.")
            continue
        available.append(p)
    return available

async def _stream_ai(task_type: str, system_prompt: str, user_prompt: str, temperature: float = 0.7, max_tokens: int = None):
    sys_p, usr_p = optimize_prompt(system_prompt, user_prompt)
    messages = _build_messages(sys_p, usr_p)
    
    provider_order = get_available_provider_order()
    
    # We will track if we ever switched models or providers to yield a fallback message
    first_attempt = True
    
    for provider_name in provider_order:
        provider = PROVIDERS.get(provider_name.lower())
        if not provider:
            continue
            
        models = PROVIDERS_CONFIG.get(provider_name.lower(), [])
        if not models:
            continue
 
        provider_success = False
 
        for model_name in get_next_model(provider_name):
            if not first_attempt:
                yield {"type": "fallback", "message": f"Switching to backup model ({model_name})..."}
            first_attempt = False
 
            logging.info(f"[Router] Trying {provider_name.capitalize()} model: {model_name}")
            
            # Retry loop for rate limits
            max_retries = 3
            retry_delays = [2, 5, 10]
            for attempt in range(max_retries):
                try:
                    response_stream = provider.generate_stream(
                        model=model_name,
                        messages=messages,
                        temperature=temperature,
                        max_tokens=max_tokens
                    )
                    
                    async for chunk in response_stream:
                        yield chunk
                        
                    logging.info(f"[Router] Success with {model_name}")
                    provider_success = True
                    return
                    
                except Exception as e:
                    if is_rate_limited(e) and attempt < max_retries:
                        sleep_time = retry_delays[attempt]
                        logging.warning(f"[Router] Rate limited on {model_name}. Retrying in {sleep_time}s... (Attempt {attempt+1}/{max_retries})")
                        await anyio.sleep(sleep_time)
                        continue
                        
                    logging.warning(f"[Router] Failed with {model_name}: {e}")
                    
                    if is_rate_limited(e):
                        logging.info(f"[Router] Rate limited on {model_name}")
                        mark_model_cooldown(model_name, cooldown_minutes=0.25)
                    else:
                        logging.warning(f"[Router] Unrecoverable error on {model_name}. Marking cooldown and trying next.")
                        mark_model_cooldown(model_name, cooldown_minutes=1)
                    break  # Go to next model
        
        if not provider_success:
            logging.info(f"[Router] All {provider_name.capitalize()} models exhausted")
            logging.info(f"[Router] Switching to next provider")
 
    # Emergency response
    logging.error("[Router] All models and providers exhausted.")
    yield {"type": "emergency", "message": "AI providers are temporarily busy. Please retry in a moment."}
 
 
async def _execute_ai(task_type: str, system_prompt: str, user_prompt: str, temperature: float = 0.7, max_tokens: int = None):
    sys_p, usr_p = optimize_prompt(system_prompt, user_prompt)
    messages = _build_messages(sys_p, usr_p)
    
    provider_order = get_available_provider_order()
    
    for provider_name in provider_order:
        provider = PROVIDERS.get(provider_name.lower())
        if not provider:
            continue
            
        models = PROVIDERS_CONFIG.get(provider_name.lower(), [])
        if not models:
            continue
 
        provider_success = False
 
        for model_name in get_next_model(provider_name):
            logging.info(f"[Router] Trying {provider_name.capitalize()} model: {model_name}")
            
            max_retries = 3
            retry_delays = [2, 5, 10]
            for attempt in range(max_retries):
                try:
                    response = await provider.generate_text(
                        model=model_name,
                        messages=messages,
                        temperature=temperature,
                        max_tokens=max_tokens
                    )
                    logging.info(f"[Router] Success with {model_name}")
                    return response
                    
                except Exception as e:
                    if is_rate_limited(e) and attempt < max_retries:
                        sleep_time = retry_delays[attempt]
                        logging.warning(f"[Router] Rate limited on {model_name}. Retrying in {sleep_time}s... (Attempt {attempt+1}/{max_retries})")
                        await anyio.sleep(sleep_time)
                        continue
                        
                    logging.warning(f"[Router] Failed with {model_name}: {e}")
                    
                    if is_rate_limited(e):
                        logging.info(f"[Router] Rate limited on {model_name}")
                        mark_model_cooldown(model_name, cooldown_minutes=0.25)
                    else:
                        logging.warning(f"[Router] Unrecoverable error on {model_name}. Marking cooldown and trying next.")
                        mark_model_cooldown(model_name, cooldown_minutes=1)
                    break
        
        if not provider_success:
            logging.info(f"[Router] All {provider_name.capitalize()} models exhausted")
            logging.info(f"[Router] Switching to next provider")
 
    class MockMessage:
        content = '{"error": "AI providers are temporarily busy. Please retry in a moment."}'
    class MockChoice:
        message = MockMessage()
    class MockResponse:
        choices = [MockChoice()]
        
    return MockResponse()


def generate_ai(task_type: str, system_prompt: str, user_prompt: str, stream: bool = False, temperature: float = 0.7, max_tokens: int = None):
    if stream:
        return _stream_ai(task_type, system_prompt, user_prompt, temperature, max_tokens)
    return _execute_ai(task_type, system_prompt, user_prompt, temperature, max_tokens)
