import sys
import asyncio
from pathlib import Path
import unittest
from dotenv import load_dotenv

import logging

ROOT_DIR = Path(__file__).resolve().parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

# Configure logging to print DEBUG logs to stdout
logging.basicConfig(level=logging.DEBUG, stream=sys.stdout, format='%(levelname)s:%(name)s:%(message)s')

# Load environment variables from backend/.env so generate_ai can use API keys
load_dotenv(ROOT_DIR / "backend" / ".env")

from backend.project_runner import write_files

class TestProjectRunnerGeneration(unittest.IsolatedAsyncioTestCase):
    async def test_html_injection(self):
        variation_id = "varTestSuccess"
        files = {
            "App.jsx": """
import React from 'react';
export default function App() {
    return <div className="bg-sky-500 text-white p-4">Test Component</div>;
}
"""
        }
        
        print("\n=== Testing successful compilation ===")
        written = await write_files(files, variation_id=variation_id)
        print("Written files:", written)
        
        # Verify HTML file existence and contents
        html_file = ROOT_DIR / "sandbox" / f"{variation_id}.html"
        self.assertTrue(html_file.exists(), f"HTML file {html_file} was not created")
        
        content = html_file.read_text(encoding="utf-8")
        self.assertIn("https://cdn.tailwindcss.com", content)
        self.assertIn("https://fonts.googleapis.com", content)
        self.assertIn("https://cdnjs.cloudflare.com/ajax/libs/font-awesome", content)
        self.assertIn("[PREVIEW DEBUG]", content)
        
        # Verify JS compiled asset exists
        js_file = ROOT_DIR / "sandbox" / "dist" / "assets" / f"{variation_id}.js"
        self.assertTrue(js_file.exists(), f"JS asset {js_file} was not compiled")
        
        # Cleanup
        try:
            html_file.unlink()
            import shutil
            shutil.rmtree(ROOT_DIR / "sandbox" / "src" / variation_id, ignore_errors=True)
            js_file.unlink(missing_ok=True)
            (ROOT_DIR / "sandbox" / "dist" / "assets" / f"{variation_id}.css").unlink(missing_ok=True)
            print("Cleanup completed successfully.")
        except Exception as e:
            print("Error during cleanup:", e)

    async def test_self_healing_compile_error(self):
        variation_id = "varTestSelfHealing"
        # App.jsx with a syntax error (unclosed JSX tag/parentheses, etc.)
        files = {
            "App.jsx": """
import React from 'react';
export default function App() {
    return (
        <div className="bg-rose-500 text-white p-4">
            Test Broken Component
            {/* Missing closing div and closing return parens */}
    )
}
"""
        }
        
        print("\n=== Testing self-healing compiler error ===")
        try:
            written = await write_files(files, variation_id=variation_id)
            print("Written files after self-healing:", written)
            
            # Verify JS compiled asset exists
            js_file = ROOT_DIR / "sandbox" / "dist" / "assets" / f"{variation_id}.js"
            self.assertTrue(js_file.exists(), f"JS asset {js_file} was not compiled, meaning self-healing failed")
            
            # Let's inspect the fixed code
            app_file = ROOT_DIR / "sandbox" / "src" / variation_id / "App.jsx"
            fixed_code = app_file.read_text(encoding="utf-8")
            print("--- Fixed Code by Self-Healing Loop ---")
            print(fixed_code)
            print("---------------------------------------")
            
            # Verify compilation succeeded
            self.assertIn("</div>", fixed_code, "Self-healed code is missing closing div tag")
            
        except Exception as e:
            self.fail(f"Self-healing test failed with error: {e}")
        finally:
            # Cleanup
            try:
                html_file = ROOT_DIR / "sandbox" / f"{variation_id}.html"
                html_file.unlink(missing_ok=True)
                import shutil
                shutil.rmtree(ROOT_DIR / "sandbox" / "src" / variation_id, ignore_errors=True)
                (ROOT_DIR / "sandbox" / "dist" / "assets" / f"{variation_id}.js").unlink(missing_ok=True)
                (ROOT_DIR / "sandbox" / "dist" / "assets" / f"{variation_id}.css").unlink(missing_ok=True)
                print("Cleanup completed successfully.")
            except Exception as e:
                print("Error during cleanup:", e)

if __name__ == "__main__":
    unittest.main()
