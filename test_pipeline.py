import sys
import os
import json

# Add backend to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from backend.project_runner import write_files, cleanGeneratedCode, validateGeneratedCode

mock_json = """{
  "files": {
    "App.jsx": "<!-- App.jsx -->\\nimport React from 'react';\\nexport default function App() {\\n  return <div>Hello</div>;\\n}"
  }
}"""

print("\n" + "="*80)
print("STEP 1: Raw LLM response")
print(mock_json)
print("="*80)

parsed_data = json.loads(mock_json)
print("\n" + "="*80)
print("STEP 2: Parsed JSON response")
print(parsed_data)
print("="*80)

files = parsed_data.get("files", {})
print("\n" + "="*80)
print("STEP 3: Files dictionary after JSON parsing")
print(files)
print("="*80)

cleaned_files = {k: cleanGeneratedCode(v) for k, v in files.items()}
print("\n" + "="*80)
print("STEP 4: Files dictionary after cleanGeneratedCode()")
print(cleaned_files)
print("="*80)

# This calls write_files, which will execute STEP 5, STEP 6, and STEP 7
write_files(cleaned_files)
