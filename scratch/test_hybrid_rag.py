import json
import urllib.request
import urllib.error
import sys
import time

sys.stdout.reconfigure(encoding='utf-8')

url = "http://127.0.0.1:8001/stream-jsx"
headers = {'Content-Type': 'application/json'}
user_id = "hybrid_test_user"

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
                        # Print full output keys to verify payload
                        out = parsed.get('output', {})
                        keys = list(out.keys()) if isinstance(out, dict) else []
                        print(f"  Complete: {parsed.get('agent')} (Output keys: {keys})")
                        
                        # If retrieval step, print top combined matches and similarity scores
                        if parsed.get('agent') == "retrieval" and isinstance(out, dict):
                            print(f"    [Hybrid RAG Match]: Style={out.get('styleMatched')}, Layout={out.get('layoutPattern')}")
                            print(f"    [Top 3 Final Results]:")
                            for res in out.get('finalResults', [])[:3]:
                                print(f"      - ID: {res.get('id')} | Combined Score: {res.get('final_score') * 100}% (JSON={res.get('json_score') * 100}%, Semantic={res.get('semantic_score') * 100}%)")
                    elif parsed.get("type") == "final_code":
                        print("\nFinal Code JSON received!")
                    elif "chunk" in parsed:
                        sys.stdout.write(".")
                        sys.stdout.flush()
                except Exception as e:
                    pass
    except urllib.error.URLError as e:
        print(f"Error connecting to backend: {e}")

# Wait for server startup
time.sleep(5)

# Step 1: Run with explicit Neo-Brutalist prompt
run_pipeline(
    "Create a futuristic neo-brutalist tech landing page with high contrast offsets",
    "First Generation (Hybrid Search & Semantic Memory Indexing)"
)

# Wait 2 seconds
time.sleep(2)

# Step 2: Run with generic prompt to verify style inheritance from semantic memory
run_pipeline(
    "Create a pricing section for my software service",
    "Second Generation (Applying Semantic Personalization)"
)
