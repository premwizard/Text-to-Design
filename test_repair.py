import sys, json
sys.path.insert(0, '.')
from backend.routes.generate_ui import _repair_json_escapes, _count_unbalanced_braces

# Test 4: \uXXXX must be preserved (it is a valid JSON escape)
good4 = '{"s": "\\u2713"}'
repaired4 = _repair_json_escapes(good4)
result4 = json.loads(repaired4)
assert result4["s"] == "\u2713", f"Mismatch: {result4['s']!r}"
print("Test 4 PASS - unicode escape preserved correctly")

# Test brace counting cases
assert _count_unbalanced_braces("{}") == 0
assert _count_unbalanced_braces("{{}") == 1
assert _count_unbalanced_braces("const s = '{';") == 0
assert _count_unbalanced_braces("const s = \"{\";") == 0
assert _count_unbalanced_braces("// {") == 0
assert _count_unbalanced_braces("/* { */") == 0
assert _count_unbalanced_braces("function App() { return <div className=\"{foo}\">; }") == 0
assert _count_unbalanced_braces("function App() { return <div className='{foo}'>; }") == 0
assert _count_unbalanced_braces("function App() {\n  return (\n    <div className={`{foo}`}>\n      Hello\n    </div>\n  );\n}") == 0
print("Brace counting tests PASS")

# Test cross-file import consistency
from backend.project_runner import validate_cross_file_imports
test_files = {
    "App.jsx": "import Navbar from './components/Navbar';\nimport Hero from './components/Hero';"
}
validate_cross_file_imports(test_files)
assert "components/Navbar.jsx" in test_files, "Navbar.jsx stub was not created"
assert "components/Hero.jsx" in test_files, "Hero.jsx stub was not created"
assert "export default function Navbar" in test_files["components/Navbar.jsx"]
assert "export default function Hero" in test_files["components/Hero.jsx"]
print("Cross-file import validation tests PASS")

# Test parse_json_robust
from backend.routes.generate_ui import parse_json_robust
malformed_json_1 = r"""{"files": {"App.jsx": "import React from 'react';\nexport default function App() {\n  return <div>Hello</div>;\n}"""
parsed_1 = parse_json_robust(malformed_json_1)
assert "App.jsx" in parsed_1.get("files", {}), "Failed to parse malformed JSON 1 via parse_json_robust"
assert "App()" in parsed_1["files"]["App.jsx"], "Content of App.jsx is incorrect"

malformed_json_2 = r"""Some markdown header
```json
{
  "files": {
    "components/Navbar.jsx": "import React from 'react';\nexport default function Navbar() { return <nav>Navbar</nav>; }"
  }
}
```"""
parsed_2 = parse_json_robust(malformed_json_2)
assert "components/Navbar.jsx" in parsed_2.get("files", {}), "Failed to parse malformed JSON 2 via parse_json_robust"
assert "Navbar()" in parsed_2["files"]["components/Navbar.jsx"], "Content of Navbar.jsx is incorrect"

print("Robust JSON parsing tests PASS")

print("=== All targeted tests passed ===")
