import logging
import anyio
from backend.services.model_selector import get_models_for_task
from backend.services.prompt_optimizer import optimize_prompt

# Dynamically load providers
import backend.services.groq_provider as groq_provider
import backend.services.gemini_provider as gemini_provider

PROVIDERS = {
    "groq": groq_provider,
    "gemini": gemini_provider
}

MAX_RETRIES_PER_MODEL = 3
BACKOFF_TIMES = [1, 2, 4]  # seconds

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
    "connection reset",
    "connection aborted"
]

def _should_fallback(error: Exception) -> bool:
    error_text = str(error).lower()
    return any(token in error_text for token in FALLBACK_KEYWORDS)

def _build_messages(system_prompt: str, user_prompt: str):
    messages = []
    if system_prompt:
        messages.append({"role": "system", "content": system_prompt})
    if user_prompt:
        messages.append({"role": "user", "content": user_prompt})
    return messages

async def _stream_ai(task_type: str, system_prompt: str, user_prompt: str, temperature: float = 0.7):
    sys_p, usr_p = optimize_prompt(system_prompt, user_prompt)
    messages = _build_messages(sys_p, usr_p)
    models_to_try = get_models_for_task(task_type)
    
    for provider_name, model_name in models_to_try:
        provider = PROVIDERS.get(provider_name.lower())
        if not provider:
            continue
            
        for attempt in range(1, MAX_RETRIES_PER_MODEL + 1):
            if attempt == 1:
                logging.info(f"[AI Router] Task: {task_type}")
                logging.info(f"[AI Router] Trying:\nProvider={provider_name.capitalize()}\nModel={model_name}")
            else:
                logging.info(f"[AI Router] Retry {attempt}/{MAX_RETRIES_PER_MODEL} for {model_name}")
            
            try:
                response_stream = provider.generate_stream(model=model_name, messages=messages, temperature=temperature)
                
                async for chunk in response_stream:
                    yield chunk
                    
                logging.info("[AI Router] Success")
                logging.info(f"[AI Router] Final Provider: {provider_name.capitalize()}")
                logging.info(f"[AI Router] Final Model: {model_name}")
                return
                
            except Exception as e:
                logging.warning(f"[AI Router] Failed: {e}")
                
                if _should_fallback(e):
                    if attempt < MAX_RETRIES_PER_MODEL:
                        wait_time = BACKOFF_TIMES[attempt - 1]
                        logging.info(f"[AI Router] Retrying in {wait_time}s...")
                        await anyio.sleep(wait_time)
                        continue
                    else:
                        logging.info("[AI Router] Switching provider")
                        yield {"type": "fallback", "message": "Switching to backup AI model..."}
                        break
                else:
                    logging.warning("[AI Router] Unrecoverable error (e.g. invalid key). Switching provider.")
                    yield {"type": "fallback", "message": "Switching to backup AI model..."}
                    break

    # Emergency response
    yield {"type": "emergency", "message": "AI providers are temporarily busy. Please retry in a moment."}


async def _execute_ai(task_type: str, system_prompt: str, user_prompt: str, temperature: float = 0.7):
    sys_p, usr_p = optimize_prompt(system_prompt, user_prompt)
    messages = _build_messages(sys_p, usr_p)
    models_to_try = get_models_for_task(task_type)
    
    for provider_name, model_name in models_to_try:
        provider = PROVIDERS.get(provider_name.lower())
        if not provider:
            continue
            
        for attempt in range(1, MAX_RETRIES_PER_MODEL + 1):
            if attempt == 1:
                logging.info(f"[AI Router] Task: {task_type}")
                logging.info(f"[AI Router] Trying:\nProvider={provider_name.capitalize()}\nModel={model_name}")
            else:
                logging.info(f"[AI Router] Retry {attempt}/{MAX_RETRIES_PER_MODEL} for {model_name}")
            
            try:
                response = await provider.generate_text(model=model_name, messages=messages, temperature=temperature)
                logging.info("[AI Router] Success")
                logging.info(f"[AI Router] Final Provider: {provider_name.capitalize()}")
                logging.info(f"[AI Router] Final Model: {model_name}")
                return response
                
            except Exception as e:
                logging.warning(f"[AI Router] Failed: {e}")
                
                if _should_fallback(e):
                    if attempt < MAX_RETRIES_PER_MODEL:
                        wait_time = BACKOFF_TIMES[attempt - 1]
                        logging.info(f"[AI Router] Retrying in {wait_time}s...")
                        await anyio.sleep(wait_time)
                        continue
                    else:
                        logging.info("[AI Router] Switching provider")
                        break
                else:
                    logging.warning("[AI Router] Unrecoverable error. Switching provider.")
                    break

    class MockMessage:
        content = '{"error": "AI providers are temporarily busy. Please retry in a moment."}'
    class MockChoice:
        message = MockMessage()
    class MockResponse:
        choices = [MockChoice()]
        
    return MockResponse()


def generate_ai(task_type: str, system_prompt: str, user_prompt: str, stream: bool = False, temperature: float = 0.7):
    if stream:
        return _stream_ai(task_type, system_prompt, user_prompt, temperature)
    return _execute_ai(task_type, system_prompt, user_prompt, temperature)
