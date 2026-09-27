"""
test_jsx_parser.py - Pytest unit tests for JSX parser and JSON repair utilities.
"""
from backend.app.utils.jsx_parser import (
    repair_jsx,
    repair_json_escapes,
    repair_truncated_json,
)
from backend.project_runner import cleanGeneratedCode


def test_repair_jsx_valid():
    raw_jsx = "import React from 'react';\nexport default function Hero() { return <div>Hello</div>; }"
    repaired = repair_jsx(raw_jsx)
    assert "export default function Hero" in repaired
    assert "<div>Hello</div>" in repaired


def test_repair_jsx_balancing():
    raw_jsx = "export default function App() {\n  return (\n    <div>Hello"
    repaired = repair_jsx(raw_jsx)
    assert repaired.endswith("}")


def test_repair_json_escapes():
    json_str = '{"code": "const text = \\"Hello\\";"}'
    repaired = repair_json_escapes(json_str)
    assert "code" in repaired


def test_repair_truncated_json():
    truncated = '{"name": "App", "files": {"App.jsx": "export default function App() {'
    repaired = repair_truncated_json(truncated)
    assert isinstance(repaired, str)


def test_clean_generated_code():
    code_with_markdown = "```javascript\nconsole.log('Hello World');\n```"
    cleaned = cleanGeneratedCode(code_with_markdown)
    assert cleaned.strip() == "console.log('Hello World');"
