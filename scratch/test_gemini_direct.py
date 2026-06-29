import asyncio
import os
import sys
import httpx
from dotenv import load_dotenv

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
load_dotenv(dotenv_path="backend/.env")

async def main():
    api_key = os.getenv("GEMINI_API_KEY")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    payload = {
        "contents": [{
            "parts": [{"text": "Hello, respond with 'Success'."}]
        }]
    }
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(url, json=payload, timeout=30.0)
            print("Status Code:", response.status_code)
            print("Response JSON:")
            print(response.json())
        except Exception as e:
            print("Exception:")
            print(e)

if __name__ == "__main__":
    asyncio.run(main())
