import json
import urllib.request
import urllib.error
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Call local server
url = "http://127.0.0.1:8001/stream-jsx"
headers = {'Content-Type': 'application/json'}

prompt = "A simple creative agency portfolio page"

print(f"\n{'='*50}")
print(f"PROMPT: {prompt}")
print(f"{'='*50}")

data = json.dumps({"prompt": prompt}).encode('utf-8')
req = urllib.request.Request(url, data=data, headers=headers, method='POST')

full_output = ""
try:
    with urllib.request.urlopen(req) as response:
        for line in response:
            decoded = line.decode('utf-8').strip()
            if not decoded:
                continue
            if decoded.startswith("data: [DONE]"):
                print("\n[DONE]")
                continue
            if decoded.startswith("data: "):
                payload = decoded[6:]
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
                        print(f"  Complete: {parsed.get('agent')} (Output: {list(parsed.get('output', {}).keys()) if isinstance(parsed.get('output'), dict) else parsed.get('output')})")
                    elif parsed.get("type") == "agent_timeline":
                        print(f"    Timeline: {parsed.get('message')}")
                    elif parsed.get("type") == "final_code":
                        print("\nFinal Code JSON received!")
                    elif "chunk" in parsed:
                        # Print dot for progress during chunk streams
                        sys.stdout.write(".")
                        sys.stdout.flush()
                except Exception as e:
                    pass
except urllib.error.URLError as e:
    print(f"Error connecting to local backend: {e}")
