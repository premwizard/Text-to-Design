import json
import urllib.request
import urllib.error
import sys
import time

sys.stdout.reconfigure(encoding='utf-8')

API_BASE = "http://127.0.0.1:8001"
user_id = "edit_test_user"

# Mock current project files
mock_files = {
    "App.jsx": """import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-150">
      <Navbar />
      <HeroSection />
    </div>
  );
}
""",
    "components/Navbar.jsx": """import React from 'react';

export default function Navbar() {
  return (
    <nav className="p-4 border-b border-zinc-800 flex justify-between bg-zinc-950">
      <span className="font-bold text-white">NexaTech</span>
      <button className="bg-indigo-650 text-white px-3 py-1 rounded">Login</button>
    </nav>
  );
}
""",
    "components/HeroSection.jsx": """import React from 'react';

export default function HeroSection() {
  return (
    <section className="py-20 text-center">
      <h1 className="text-4xl font-bold">Premium Analytics Platform</h1>
      <p className="text-zinc-400 mt-2">Scale your SaaS data efficiently</p>
      <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-full mt-6">Get Started</button>
    </section>
  );
}
"""
}

mock_metadata = {
    "product_name": "NexaTech",
    "font_heading": "Space Grotesk",
    "bg_color": "bg-zinc-900",
    "primary_color": "indigo"
}

def request_json(url, payload=None, method='POST'):
    req_headers = {'Content-Type': 'application/json'}
    data = json.dumps(payload).encode('utf-8') if payload else None
    req = urllib.request.Request(url, data=data, headers=req_headers, method=method)
    try:
        with urllib.request.urlopen(req) as res:
            return json.loads(res.read().decode('utf-8'))
    except Exception as e:
        print(f"Request failed to {url}: {e}")
        return None

def test_edit_flow():
    # 1. Run edit generation
    print(f"\n{'='*60}")
    print("RUNNING EDIT AGENT PIPELINE VERIFICATION")
    print(f"{'='*60}")
    
    session_id = "test_edit_session_123"
    edit_payload = {
        "user_id": user_id,
        "session_id": session_id,
        "edit_prompt": "Make this neon cyber blue theme and add testimonials",
        "current_code": json.dumps({"files": mock_files}),
        "design_metadata": mock_metadata
    }
    
    url = f"{API_BASE}/edit-ui"
    data = json.dumps(edit_payload).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'}, method='POST')
    
    try:
        with urllib.request.urlopen(req) as response:
            for line in response:
                decoded = line.decode('utf-8').strip()
                if not decoded or not decoded.startswith("data: "):
                    continue
                payload = decoded[6:]
                if payload == "[DONE]":
                    print("\n[DONE]")
                    continue
                try:
                    parsed = json.loads(payload)
                    if "error" in parsed:
                        print(f"\nAPI ERROR: {parsed['error']}")
                        break
                    
                    if parsed.get("type") == "timeline":
                        print(f"\nStep: {parsed.get('step')}")
                    elif parsed.get("type") == "agent_start":
                        print(f"  Start: {parsed.get('agent')} -> {parsed.get('message')}")
                    elif parsed.get("type") == "agent_complete":
                        out = parsed.get('output', {})
                        print(f"  Complete: {parsed.get('agent')}")
                        if parsed.get('agent') == "intent_classification":
                            print(f"    - Classified intent: {out.get('editType')}")
                            print(f"    - Planned component changes: {out.get('changes')}")
                            print(f"    - Affected components: {out.get('affected')}")
                        elif parsed.get('agent') == "vision_recheck":
                            print(f"    - Visual audit score delta: {out.get('improvementDelta')} (After: {out.get('afterScore')})")
                    elif parsed.get("type") == "final_code":
                        print("\nFinal Patched Code JSON received! Editing completed successfully.")
                except Exception:
                    pass
    except urllib.error.URLError as e:
        print(f"Error connecting to backend: {e}")
        return

    # 2. Check history log
    print(f"\n{'='*60}")
    print("QUERYING EDIT HISTORY LOGS")
    print(f"{'='*60}")
    history_url = f"{API_BASE}/edit-history?user_id={user_id}&session_id={session_id}"
    history_data = request_json(history_url, method='GET')
    print("Returned history list:")
    print(json.dumps(history_data, indent=2))
    
    if history_data and history_data.get("history"):
        last_snap = history_data["history"][-1]["id"]
        # 3. Test rollback
        print(f"\n{'='*60}")
        print(f"TRIGGERING ROLLBACK TO SNAPSHOT #{last_snap}")
        print(f"{'='*60}")
        rollback_url = f"{API_BASE}/edit-history/rollback"
        rollback_payload = {
            "user_id": user_id,
            "session_id": session_id,
            "snapshot_id": last_snap
        }
        rollback_res = request_json(rollback_url, rollback_payload, method='POST')
        print(f"Rollback result: {rollback_res.get('status')}")
        if rollback_res.get("status") == "success":
            print("Rollback file list returned: ", list(rollback_res.get("files", {}).keys()))

if __name__ == "__main__":
    time.sleep(2)
    test_edit_flow()
