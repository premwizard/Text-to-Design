import json
import urllib.request
import urllib.error

url = "http://127.0.0.1:8000/stream-jsx"
headers = {'Content-Type': 'application/json'}
p = "Luxury hotel booking website"
data = json.dumps({"prompt": p}).encode('utf-8')
req = urllib.request.Request(url, data=data, headers=headers, method='POST')

with open('debug_out.txt', 'w', encoding='utf-8') as f:
    try:
        with urllib.request.urlopen(req) as response:
            for line in response:
                decoded = line.decode('utf-8').strip()
                f.write(decoded + '\\n')
    except Exception as e:
        f.write(str(e))
