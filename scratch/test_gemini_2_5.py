import asyncio
import os
import sys
from dotenv import load_dotenv

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
load_dotenv(dotenv_path="backend/.env")

from backend.services.gemini_provider import generate_text

async def main():
    print("Testing gemini-2.5-flash with OpenAI compatibility client...")
    try:
        response = await generate_text(
            model="gemini-2.5-flash",
            messages=[{"role": "user", "content": "Hello, respond with 'Success'."}],
            temperature=0.7
        )
        print("Success! Response:")
        print(response.choices[0].message.content)
    except Exception as e:
        print("Error encountered:")
        print(e)

if __name__ == "__main__":
    asyncio.run(main())
