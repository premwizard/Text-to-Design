import asyncio
import logging
import json

from backend.app.agents.orchestrator import run_orchestration_stream

logging.basicConfig(level=logging.INFO)

async def main():
    print("Testing orchestrator stream...")
    user_prompt = "Create a modern landing page for an AI saas company with glassmorphism."
    
    # We will simulate the async generator
    async for chunk in run_orchestration_stream(
        user_prompt=user_prompt,
        user_id="test_user",
        generation_mode="single_mode",
        variation_count=1
    ):
        # Only print the types to keep output manageable
        if isinstance(chunk, dict):
            if "type" in chunk:
                print(f"Yielded dict of type: {chunk['type']}")
            elif "chunk" in chunk:
                pass # print(".", end="", flush=True)
            elif "error" in chunk:
                print(f"Error: {chunk['error']}")
        else:
            pass # print("Yielded non-dict")
            
    print("\nTest completed.")

if __name__ == "__main__":
    asyncio.run(main())
