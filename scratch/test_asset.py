import urllib.request
import urllib.error

url_js = "http://localhost:5173/dist/assets/varC.js"
url_css = "http://localhost:5173/dist/assets/varC.css"

for url in [url_js, url_css]:
    print(f"Testing URL: {url}")
    try:
        with urllib.request.urlopen(url) as response:
            print(f"Status Code: {response.status}")
            print(f"Content Type: {response.headers.get('Content-Type')}")
            print(f"First 100 bytes:\n{response.read(100)}")
    except urllib.error.HTTPError as e:
        print(f"HTTP Error: {e.code} - {e.reason}")
    except Exception as e:
        print(f"Error: {e}")
    print("-" * 40)
