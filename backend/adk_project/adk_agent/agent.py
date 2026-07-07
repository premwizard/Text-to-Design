import os
import sys
import asyncio
from pathlib import Path
import json

# Ensure we can import from backend by adding the project root to sys.path
ROOT_DIR = Path(__file__).resolve().parent.parent.parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

# Import official ADK components
from google.adk import Agent, Runner
from google.adk.events import Event
from google.adk.sessions import InMemorySessionService
from google.genai import types
from backend.app.services.generation_service import run_generation

# Initialize session service (in-memory for development)
session_service = InMemorySessionService()

# Define the root agent for Google ADK
agent = Agent(name="TextToDesignADK")

# In ADK >=1.0, to natively intercept messages before they hit a model,
# we can monkey-patch the Runner's run_async to map it to our custom orchestrator.
async def custom_run_async(self, *, user_id: str, session_id: str, new_message=None, **kwargs):
    prompt = ""
    if new_message and hasattr(new_message, "parts") and new_message.parts:
        prompt = new_message.parts[0].text
        
    request_data = {
        "prompt": prompt,
        "user_id": user_id or "adk-user",
        "generation_mode": "single_mode", 
        "variation_count": 1,
        "session_id": session_id or "adk-session",
        "current_code": None
    }
    
    yield Event(
        content=types.Content(role="model", parts=[types.Part(text=f"*Initiating Text-to-Design Generation (Session: {session_id})...*\n\n")]),
        partial=True
    )
    
    is_streaming_code = False
    
    try:
        async for event in run_generation(request_data):
            if "chunk" in event:
                if not is_streaming_code:
                    yield Event(content=types.Content(role="model", parts=[types.Part(text="\n```jsx\n")]), partial=True)
                    is_streaming_code = True
                yield Event(content=types.Content(role="model", parts=[types.Part(text=event["chunk"])]), partial=True)
                
            elif "type" in event and "message" in event:
                if is_streaming_code:
                    yield Event(content=types.Content(role="model", parts=[types.Part(text="\n```\n")]), partial=True)
                    is_streaming_code = False
                agent_name = event.get('agent', 'System').capitalize()
                yield Event(content=types.Content(role="model", parts=[types.Part(text=f"\n> **{agent_name}**: {event['message']}\n")]), partial=True)
                
            elif "error" in event:
                if is_streaming_code:
                    yield Event(content=types.Content(role="model", parts=[types.Part(text="\n```\n")]), partial=True)
                    is_streaming_code = False
                yield Event(content=types.Content(role="model", parts=[types.Part(text=f"\n❌ **Error:** {event['error']}\n")]), partial=True)
                
            elif "type" in event and event["type"] == "agent_complete":
                agent_name = event.get('agent', 'Agent').capitalize()
                yield Event(content=types.Content(role="model", parts=[types.Part(text=f"✅ *{agent_name} completed.*\n")]), partial=True)
                
        if is_streaming_code:
            yield Event(content=types.Content(role="model", parts=[types.Part(text="\n```\n")]), partial=True)
            
        yield Event(
            content=types.Content(role="model", parts=[types.Part(text="\n\n*✨ Generation pipeline finished successfully.*")]),
            turn_complete=True
        )
        
    except Exception as e:
        if is_streaming_code:
            yield Event(content=types.Content(role="model", parts=[types.Part(text="\n```\n")]), partial=True)
        yield Event(
            content=types.Content(role="model", parts=[types.Part(text=f"\n\n❌ **Critical Pipeline Error:** {str(e)}")]),
            turn_complete=True
        )

# Apply the interceptor
Runner.run_async = custom_run_async

# Expose the agent for ADK discovery
root_agent = agent
