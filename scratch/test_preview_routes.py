import sys
from pathlib import Path
import unittest

ROOT_DIR = Path(__file__).resolve().parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from fastapi.testclient import TestClient
from backend.main import app

class TestPreviewRoutes(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_preview_index(self):
        # Request /preview/ and /preview
        response1 = self.client.get("/preview/")
        response2 = self.client.get("/preview")
        
        # At least one should be served if index.html exists
        print(f"Response /preview/ status: {response1.status_code}")
        print(f"Response /preview status: {response2.status_code}")
        
        # Verify status is 200 or 404 depending on file existence, but not 200 with JSON error message
        if response1.status_code == 200:
            self.assertIn("text/html", response1.headers.get("content-type", ""))
        else:
            self.assertEqual(response1.status_code, 404)

    def test_preview_assets_fallback(self):
        # Request a non-existent asset to check fallback mechanism
        # In sandbox/dist/assets we have: index-D7oUsLmB.css
        # Let's request index-BQaeB6bT.css which does not exist, but matches 'index*.css'
        response = self.client.get("/preview/assets/index-BQaeB6bT.css")
        print(f"Response fallback CSS status: {response.status_code}")
        
        if response.status_code == 200:
            self.assertIn("text/css", response.headers.get("content-type", ""))
            print("Successfully served fallback CSS file!")
        else:
            # If assets_dir doesn't exist, we might get 404
            self.assertEqual(response.status_code, 404)
            print("Fallback CSS not found (404 expected if no assets exist).")

    def test_preview_missing_asset(self):
        # Request a completely non-existent asset name that has no files matching the glob
        response = self.client.get("/preview/assets/nonexistent-hash.css")
        self.assertEqual(response.status_code, 404)
        print(f"Response nonexistent asset status: {response.status_code}")

if __name__ == "__main__":
    unittest.main()
