#!/usr/bin/env python3
"""
Custom PR Quality & Security Inspector
Analyzes PR diffs for hardcoded secrets, test coverage compliance, anti-patterns,
and generates automated PR review summaries.
"""

import os
import re
import sys
import subprocess
import urllib.request
import json

SECRET_PATTERNS = [
    (r'(?i)(api[_-]?key|secret|password|auth[_-]?token)\s*[:=]\s*["\'][A-Za-z0-9_\-]{8,}["\']', "Potential hardcoded secret or API key"),
    (r'sk-[A-Za-z0-9]{20,}', "Potential OpenAI API Key"),
    (r'AIzaSy[A-Za-z0-9_\-]{33}', "Potential Google/Gemini API Key"),
    (r'-----BEGIN\s+(RSA|PRIVATE)\s+KEY-----', "Private Key exposed"),
    (r'postgres://\w+:\w+@', "Database connection string with credentials"),
    (r'mongodb(\+srv)?://\w+:\w+@', "MongoDB URI with credentials")
]

ANTI_PATTERNS = [
    (r'console\.log\(', "Frontend console.log left in code", "client"),
    (r'eval\(', "Dangerous eval() usage", "all"),
    (r'except\s*:\s*pass', "Bare except with pass (swallowing errors)", "backend"),
    (r'DEBUG\s*=\s*True', "DEBUG flag set to True", "backend"),
    (r'print\(', "Python print() statement (prefer structured logging)", "backend")
]

def get_git_diff():
    try:
        # Get diff against target branch (defaulting to origin/main)
        target_branch = os.getenv("GITHUB_BASE_REF", "main")
        cmd = ["git", "diff", f"origin/{target_branch}...HEAD"]
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        return result.stdout
    except Exception as e:
        print(f"Error fetching git diff: {e}")
        return ""

def analyze_secrets(diff_text):
    findings = []
    current_file = ""
    line_num = 0
    
    for line in diff_text.splitlines():
        if line.startswith("+++ b/"):
            current_file = line[6:]
            continue
        if line.startswith("+") and not line.startswith("+++"):
            content = line[1:]
            for pattern, desc in SECRET_PATTERNS:
                if re.search(pattern, content):
                    findings.append({
                        "file": current_file,
                        "type": "SECURITY RISK",
                        "description": f"{desc}: `{content.strip()[:60]}`"
                    })
    return findings

def analyze_anti_patterns(diff_text):
    findings = []
    current_file = ""
    
    for line in diff_text.splitlines():
        if line.startswith("+++ b/"):
            current_file = line[6:]
            continue
        if line.startswith("+") and not line.startswith("+++"):
            content = line[1:]
            for pattern, desc, scope in ANTI_PATTERNS:
                if scope == "client" and not current_file.startswith("client/"):
                    continue
                if scope == "backend" and not current_file.startswith("backend/"):
                    continue
                if re.search(pattern, content):
                    findings.append({
                        "file": current_file,
                        "type": "CODE QUALITY",
                        "description": f"{desc}: `{content.strip()[:60]}`"
                    })
    return findings

def analyze_test_coverage(diff_text):
    backend_code_changed = False
    backend_test_changed = False
    frontend_code_changed = False
    
    for line in diff_text.splitlines():
        if line.startswith("+++ b/"):
            filepath = line[6:]
            if filepath.startswith("backend/app/"):
                backend_code_changed = True
            elif filepath.startswith("backend/tests/"):
                backend_test_changed = True
            elif filepath.startswith("client/src/"):
                frontend_code_changed = True
                
    warnings = []
    if backend_code_changed and not backend_test_changed:
        warnings.append("Backend logic in `backend/app/` modified without matching unit test updates in `backend/tests/`.")
        
    return warnings

def generate_ai_review(diff_text):
    gemini_key = os.getenv("GEMINI_API_KEY")
    if not gemini_key:
        return None
        
    try:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={gemini_key}"
        prompt = f"""You are an expert code reviewer. Review the following Git PR diff concise and constructively.
Highlight:
1. Potential bugs or edge cases
2. Performance considerations
3. Architectural improvements

Git Diff:
{diff_text[:8000]}
"""
        payload = {
            "contents": [{"parts": [{"text": prompt}]}]
        }
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data["candidates"][0]["content"]["parts"][0]["text"]
    except Exception as e:
        print(f"AI Review skipped/failed: {e}")
        return None

def main():
    print("Running Custom PR Inspector...")
    diff_text = get_git_diff()
    
    if not diff_text:
        print("No diff found or empty PR diff.")
        sys.exit(0)
        
    secrets = analyze_secrets(diff_text)
    anti_patterns = analyze_anti_patterns(diff_text)
    test_warnings = analyze_test_coverage(diff_text)
    ai_feedback = generate_ai_review(diff_text)
    
    # Generate Markdown Summary
    report = ["# 🐰 Custom PR Inspector & Quality Report\n"]
    
    if secrets:
        report.append("### 🚨 Security Warnings")
        for s in secrets:
            report.append(f"- **[{s['file']}]** {s['description']}")
        report.append("")
    else:
        report.append("✅ **Security Scan:** No exposed secrets or credentials detected.\n")
        
    if anti_patterns:
        report.append("### ⚠️ Code Quality & Anti-Patterns")
        for ap in anti_patterns:
            report.append(f"- **[{ap['file']}]** {ap['description']}")
        report.append("")
    else:
        report.append("✅ **Code Quality:** No common anti-patterns detected.\n")
        
    if test_warnings:
        report.append("### 🧪 Test Coverage Check")
        for tw in test_warnings:
            report.append(f"- ⚠️ {tw}")
        report.append("")
    else:
        report.append("✅ **Test Coverage:** Code changes accompany appropriate test files.\n")

    if ai_feedback:
        report.append("### 🤖 AI Code Review Insights")
        report.append(ai_feedback)
        report.append("")
        
    report.append("---\n*Generated by Native GitHub Actions PR Inspector*")
    
    report_content = "\n".join(report)
    with open("pr_review_summary.md", "w", encoding="utf-8") as f:
        f.write(report_content)
        
    print("PR Review summary written to pr_review_summary.md")
    
    # Exit with error if high-severity security issues found
    if secrets:
        print("Security vulnerabilities found! Failing check.")
        sys.exit(1)

if __name__ == "__main__":
    main()
