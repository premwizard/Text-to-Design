import asyncio
import os
import sys
import httpx
from dotenv import load_dotenv

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
load_dotenv(dotenv_path="backend/.env")

async def main():
    api_key = os.getenv("GEMINI_API_KEY")
    url = f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, timeout=30.0)
            print("Status Code:", response.status_code)
            if response.status_code == 200:
                models = response.json().get("models", [])
                print("Available Models:")
                for m in models:
                    print("-", m.get("name"), "| supportedMethods:", m.get("supportedGenerationMethods"))
            else:
                print("Response:", response.json())
        except Exception as e:
            print("Exception:", e)

if __name__ == "__main__":
    asyncio.run(main())
