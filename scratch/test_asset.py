import urllib.request
import urllib.error

url = "http://127.0.0.1:8000/preview/assets/index-D7oUsLmB.css"
try:
    with urllib.request.urlopen(url) as response:
        print(f"Status Code: {response.status}")
        print(f"Content Type: {response.headers.get('Content-Type')}")
        print(f"First 100 bytes: {response.read(100)}")
except urllib.error.HTTPError as e:
    print(f"HTTP Error: {e.code} - {e.reason}")
    print(e.read().decode('utf-8'))
except Exception as e:
    print(f"Error: {e}")
