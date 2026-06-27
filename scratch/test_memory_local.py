import json
import urllib.request
import urllib.error
import sys
import time

sys.stdout.reconfigure(encoding='utf-8')

url = "http://127.0.0.1:8001/stream-jsx"
headers = {'Content-Type': 'application/json'}
user_id = "test_user_memory"

def run_pipeline(prompt_text, description):
    print(f"\n{'='*60}")
    print(f"RUN: {description}")
    print(f"PROMPT: {prompt_text}")
    print(f"{'='*60}")
    
    payload = {"prompt": prompt_text, "user_id": user_id}
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers=headers, method='POST')
    
    try:
        with urllib.request.urlopen(req) as response:
            for line in response:
                decoded = line.decode('utf-8').strip()
                if not decoded or not decoded.startswith("data: "):
                    continue
                payload = decoded[6:]
                if payload == "[DONE]":
                    print("\n[DONE]")
                    continue
                try:
                    parsed = json.loads(payload)
                    if "error" in parsed:
                        print(f"\nAPI ERROR: {parsed['error']}")
                        break
                    
                    if parsed.get("type") == "timeline":
                        print(f"\nStep: {parsed.get('step')}")
                    elif parsed.get("type") == "agent_start":
                        print(f"  Start: {parsed.get('agent')} -> {parsed.get('message')}")
                    elif parsed.get("type") == "agent_complete":
                        # Print output details
                        print(f"  Complete: {parsed.get('agent')} (Output: {parsed.get('output')})")
                    elif parsed.get("type") == "final_code":
                        print("\nFinal Code JSON received!")
                    elif "chunk" in parsed:
                        sys.stdout.write(".")
                        sys.stdout.flush()
                except Exception:
                    pass
    except urllib.error.URLError as e:
        print(f"Error connecting to backend: {e}")

# Wait for server startup
time.sleep(5)

# Step 1: Run with explicit Neon Dark styling request
run_pipeline(
    "Create a corporate homepage in neon dark style with emerald highlights",
    "First Generation (Setting Neon Dark styling signals)"
)

# Wait 2 seconds
time.sleep(2)

# Step 2: Run generic layout request to test memory retrieval and mapping
run_pipeline(
    "Create a simple contact form",
    "Second Generation (Should automatically inherit Neon Dark theme and emerald highlight style)"
)
