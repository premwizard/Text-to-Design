"""
providers/gemini_provider.py
Gemini AI provider using OpenAI-compatible API via Google AI Studio.
"""
import os
from backend.app.utils.env import get_env
from backend.app.services.providers.http_provider import generate_text_http, generate_stream_http

def _get_api_key():
    api_key = get_env("GEMINI_API_KEY")
    if not api_key:
        raise Exception("GEMINI_API_KEY is missing")
    return api_key

BASE_URL = "https://generativelanguage.googleapis.com/v1beta/openai"

async def generate_text(model: str, messages: list, temperature: float = 0.7, max_tokens: int = None):
    return await generate_text_http(BASE_URL, _get_api_key(), model, messages, temperature, max_tokens)

async def generate_stream(model: str, messages: list, temperature: float = 0.7, max_tokens: int = None):
    async for chunk in generate_stream_http(BASE_URL, _get_api_key(), model, messages, temperature, max_tokens):
        yield chunk
