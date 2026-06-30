"""
providers/gemini_provider.py
Gemini AI provider using OpenAI-compatible API via Google AI Studio.
"""
import openai
from backend.app.utils.env import get_env


def _get_client():
    api_key = get_env("GEMINI_API_KEY")
    if not api_key:
        return None
    return openai.AsyncOpenAI(
        api_key=api_key,
        base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
    )


async def generate_text(model: str, messages: list, temperature: float = 0.7, max_tokens: int = None):
    client = _get_client()
    if not client:
        raise Exception("GEMINI_API_KEY is missing")
    kwargs = {
        "model": model,
        "messages": messages,
        "temperature": temperature,
        "stream": False,
        "timeout": 45.0
    }
    if max_tokens is not None:
        kwargs["max_tokens"] = max_tokens
    return await client.chat.completions.create(**kwargs)


async def generate_stream(model: str, messages: list, temperature: float = 0.7, max_tokens: int = None):
    client = _get_client()
    if not client:
        raise Exception("GEMINI_API_KEY is missing")
    kwargs = {
        "model": model,
        "messages": messages,
        "temperature": temperature,
        "stream": True,
        "timeout": 30.0
    }
    if max_tokens is not None:
        kwargs["max_tokens"] = max_tokens
    response = await client.chat.completions.create(**kwargs)
    async for chunk in response:
        yield chunk
