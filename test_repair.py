import sys, json
sys.path.insert(0, '.')
from backend.routes.generate_ui import _repair_json_escapes

# Test 4: \uXXXX must be preserved (it is a valid JSON escape)
good4 = '{"s": "\\u2713"}'
repaired4 = _repair_json_escapes(good4)
result4 = json.loads(repaired4)
assert result4["s"] == "\u2713", f"Mismatch: {result4['s']!r}"
print("Test 4 PASS - unicode escape preserved correctly")

print("=== All targeted tests passed ===")
