import httpx
import json
import logging

logger = logging.getLogger('backend.app.services.providers.http')

class MockDelta:
    def __init__(self, content):
        self.content = content

class MockChoice:
    def __init__(self, content):
        self.delta = MockDelta(content)

class MockChunk:
    def __init__(self, content):
        self.choices = [MockChoice(content)]

class MockMessage:
    def __init__(self, content):
        self.content = content

class MockTextChoice:
    def __init__(self, content):
        self.message = MockMessage(content)

class MockResponse:
    def __init__(self, content):
        self.choices = [MockTextChoice(content)]

async def generate_text_http(base_url: str, api_key: str, model: str, messages: list, temperature: float = 0.7, max_tokens: int = None):
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }
    url = base_url if 'chat/completions' in base_url else f'{base_url}/chat/completions'

    # Do not strip Authorization header for Google AI Studio OpenAI proxy

    payload = {
        'model': model,
        'messages': messages,
        'temperature': temperature,
        'stream': False
    }
    if max_tokens is not None:
        payload['max_tokens'] = max_tokens

    async with httpx.AsyncClient(timeout=45.0) as client:
        response = await client.post(url, headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()
        content = data['choices'][0]['message']['content']
        return MockResponse(content)

async def generate_stream_http(base_url: str, api_key: str, model: str, messages: list, temperature: float = 0.7, max_tokens: int = None):
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }
    url = base_url if 'chat/completions' in base_url else f'{base_url}/chat/completions'

    # Do not strip Authorization header for Google AI Studio OpenAI proxy

    payload = {
        'model': model,
        'messages': messages,
        'temperature': temperature,
        'stream': True
    }
    if max_tokens is not None:
        payload['max_tokens'] = max_tokens

    async with httpx.AsyncClient(timeout=30.0) as client:
        async with client.stream('POST', url, headers=headers, json=payload) as response:
            response.raise_for_status()
            async for line in response.aiter_lines():
                if line.startswith('data: '):
                    data_str = line[6:].strip()
                    if data_str == '[DONE]':
                        break
                    try:
                        data = json.loads(data_str)
                        if 'choices' in data and len(data['choices']) > 0:
                            delta = data['choices'][0].get('delta', {})
                            content = delta.get('content')
                            if content:
                                yield MockChunk(content)
                    except json.JSONDecodeError:
                        continue
