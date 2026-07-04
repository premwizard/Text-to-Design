import logging
import anyio
import time
import os
import json
import random
import hashlib
import asyncio
from backend.app.services.prompt_optimizer import optimize_prompt
from backend.app.core.config.ai_models import PROVIDERS_CONFIG, get_provider_fallback_order

# Load providers from the canonical providers/ package
import backend.app.services.providers.groq_provider as groq_provider
import backend.app.services.providers.gemini_provider as gemini_provider
import backend.app.services.providers.openrouter_provider as openrouter_provider

PROVIDERS = {
    "groq": groq_provider,
    "gemini": gemini_provider,
    "openrouter": openrouter_provider
}

FALLBACK_KEYWORDS = [
    "429", "rate_limit", "quota", "capacity", "busy", "timeout",
    "temporarily unavailable", "service unavailable", "too many requests",
    "resource_exhausted", "rate limit exceeded", "connection reset", "connection aborted"
]

NON_RETRYABLE = (ModuleNotFoundError, ImportError, SyntaxError, ValueError)

MODEL_COOLDOWNS = {}
PROMPT_CACHE = {}
API_SEMAPHORE = asyncio.Semaphore(2)

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
        if p_lower == "openrouter" and not os.getenv("OPENROUTER_API_KEY"):
            logging.warning("[Router] Skipping OpenRouter - OPENROUTER_API_KEY missing.")
            continue
        available.append(p)
    return available

def _get_cache_key(messages, temperature, max_tokens, stream):
    key_dict = {
        "messages": messages,
        "temperature": temperature,
        "max_tokens": max_tokens,
        "stream": stream
    }
    return hashlib.md5(json.dumps(key_dict, sort_keys=True).encode()).hexdigest()

async def _stream_ai(task_type: str, system_prompt: str, user_prompt: str, temperature: float = 0.7, max_tokens: int = None):
    sys_p, usr_p = optimize_prompt(system_prompt, user_prompt)
    messages = _build_messages(sys_p, usr_p)
    
    # Fast path caching (if stream is cached, yield it entirely as one chunk for simplicity)
    cache_key = _get_cache_key(messages, temperature, max_tokens, True)
    if cache_key in PROMPT_CACHE:
        logging.info(f"[Router] Cache hit for {task_type}")
        class MockChoice:
            def __init__(self, c):
                class MockDelta:
                    def __init__(self, c):
                        self.content = c
                self.delta = MockDelta(c)
        class MockChunk:
            def __init__(self, c):
                self.choices = [MockChoice(c)]
        yield MockChunk(PROMPT_CACHE[cache_key])
        return
        
    provider_order = get_available_provider_order()
    first_attempt = True
    full_response = ""
    
    async with API_SEMAPHORE:
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
                
                max_retries = 3
                for attempt in range(max_retries):
                    try:
                        response_stream = provider.generate_stream(
                            model=model_name,
                            messages=messages,
                            temperature=temperature,
                            max_tokens=max_tokens
                        )
                        
                        async for chunk in response_stream:
                            if hasattr(chunk, "choices") and chunk.choices[0].delta.content:
                                full_response += chunk.choices[0].delta.content
                            yield chunk
                            
                        logging.info(f"[Router] Success with {model_name}")
                        PROMPT_CACHE[cache_key] = full_response
                        provider_success = True
                        return
                        
                    except Exception as e:
                        if isinstance(e, NON_RETRYABLE):
                            logging.error(f"[Router] Permanent error on {model_name}: {e}. Raising immediately.")
                            raise e
                            
                        if is_rate_limited(e) and attempt < max_retries:
                            sleep_time = random.uniform(0, 1) + (2 ** attempt)
                            logging.warning(f"[Router] Rate limited on {model_name}. Retrying in {sleep_time:.2f}s... (Attempt {attempt+1}/{max_retries})")
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
                logging.info(f"[Router] All {provider_name.capitalize()} models exhausted. Switching to next provider.")

    logging.error("[Router] All models and providers exhausted.")
    yield {"type": "emergency", "message": "AI providers are temporarily busy. Please retry in a moment."}


async def _execute_ai(task_type: str, system_prompt: str, user_prompt: str, temperature: float = 0.7, max_tokens: int = None):
    sys_p, usr_p = optimize_prompt(system_prompt, user_prompt)
    messages = _build_messages(sys_p, usr_p)
    
    cache_key = _get_cache_key(messages, temperature, max_tokens, False)
    if cache_key in PROMPT_CACHE:
        logging.info(f"[Router] Cache hit for {task_type}")
        return PROMPT_CACHE[cache_key]
        
    provider_order = get_available_provider_order()
    
    async with API_SEMAPHORE:
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
                for attempt in range(max_retries):
                    try:
                        response = await provider.generate_text(
                            model=model_name,
                            messages=messages,
                            temperature=temperature,
                            max_tokens=max_tokens
                        )
                        logging.info(f"[Router] Success with {model_name}")
                        PROMPT_CACHE[cache_key] = response
                        return response
                        
                    except Exception as e:
                        if isinstance(e, NON_RETRYABLE):
                            logging.error(f"[Router] Permanent error on {model_name}: {e}. Raising immediately.")
                            raise e
                            
                        if is_rate_limited(e) and attempt < max_retries:
                            sleep_time = random.uniform(0, 1) + (2 ** attempt)
                            logging.warning(f"[Router] Rate limited on {model_name}. Retrying in {sleep_time:.2f}s... (Attempt {attempt+1}/{max_retries})")
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
                logging.info(f"[Router] All {provider_name.capitalize()} models exhausted. Switching to next provider.")

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
