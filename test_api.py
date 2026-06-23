import json
import urllib.request
import urllib.error
import sys

sys.stdout.reconfigure(encoding='utf-8')

url = "https://text-to-design.onrender.com/stream-jsx"
headers = {'Content-Type': 'application/json'}

prompts = [
    "Luxury hotel booking website",
    "Crypto trading dashboard",
    "Creative designer portfolio"
]

for p in prompts:
    print(f"\\n{'='*50}")
    print(f"PROMPT: {p}")
    print(f"{'='*50}")
    data = json.dumps({"prompt": p}).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers=headers, method='POST')
    
    full_output = ""
    try:
        with urllib.request.urlopen(req) as response:
            for line in response:
                decoded = line.decode('utf-8').strip()
                if not decoded or decoded.startswith("data: [DONE]"):
                    continue
                if decoded.startswith("data: "):
                    payload = decoded[6:]
                    try:
                        parsed = json.loads(payload)
                        if "error" in parsed:
                            print(f"ERROR: {parsed['error']}")
                            break
                        if "chunk" in parsed:
                            full_output += parsed["chunk"]
                    except:
                        pass
        # Extract files keys
        cleaned = full_output.strip()
        import re
        cleaned = re.sub(r'^```(?:json|jsx|javascript|js|react|tsx|ts)?\s*\n?', '', cleaned, flags=re.IGNORECASE)
        cleaned = re.sub(r'\n?```\s*$', '', cleaned)
        try:
            parsed = json.loads(cleaned)
            files = list(parsed.get('files', {}).keys())
            print(f"Generated Files: {files}")
        except:
            print("Failed to parse JSON. Raw output:")
            print(full_output[:500] + "... (truncated)")
    except urllib.error.URLError as e:
        print(f"Error connecting to backend: {e}")
