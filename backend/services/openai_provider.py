import openai
from backend.utils.env import get_env

def _get_client():
    api_key = get_env("OPENAI_API_KEY")
    if not api_key:
        return None
    return openai.AsyncOpenAI(
        api_key=api_key
    )

async def generate_text(model: str, messages: list, temperature: float = 0.7):
    client = _get_client()
    if not client:
        raise Exception("OPENAI_API_KEY is missing")
    return await client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=temperature,
        stream=False,
        timeout=45.0
    )

async def generate_stream(model: str, messages: list, temperature: float = 0.7):
    client = _get_client()
    if not client:
        raise Exception("OPENAI_API_KEY is missing")
    response = await client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=temperature,
        stream=True,
        timeout=30.0
    )
    async for chunk in response:
        yield chunk
