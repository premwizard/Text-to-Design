import json
import urllib.request
import urllib.error
import sys
import time

sys.stdout.reconfigure(encoding='utf-8')

url = "http://127.0.0.1:8001/stream-jsx"
headers = {'Content-Type': 'application/json'}
user_id = "vision_test_user"

def run_pipeline():
    prompt_text = "Create a premium dark SaaS website hero section with center aligned text and rounded glowing buttons"
    print(f"\n{'='*60}")
    print(f"RUNNING VISION AGENT PIPELINE VERIFICATION")
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
                        out = parsed.get('output', {})
                        print(f"  Complete: {parsed.get('agent')}")
                        
                        # Print screenshot results
                        if parsed.get('agent') == "screenshot":
                            print(f"    [Playwright screenshots captured]:")
                            for view, path in out.items():
                                print(f"      - {view}: {path}")
                        
                        # Print vision evaluation metrics
                        elif parsed.get('agent') == "vision":
                            print(f"    [Vision Agent scores]: {out.get('scores')}")
                            print(f"    [Vision Agent overall score]: {out.get('overallScore')}")
                            print(f"    [Vision Agent issues]: {out.get('issues')}")
                            
                        # Print critic evaluation metrics
                        elif parsed.get('agent') == "critic":
                            print(f"    [Critic combined score]: {out.get('score')}/10 (Text: {out.get('textScore')}, Vision: {out.get('visionScore')})")
                            print(f"    [Critic combined issues]: {out.get('issues')}")
                            
                    elif parsed.get("type") == "final_code":
                        print("\nFinal Code JSON received! Execution completed successfully.")
                    elif "chunk" in parsed:
                        sys.stdout.write(".")
                        sys.stdout.flush()
                except Exception as e:
                    pass
    except urllib.error.URLError as e:
        print(f"Error connecting to backend: {e}")

# Wait for server startup
time.sleep(5)
run_pipeline()
