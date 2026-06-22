"""
project_runner.py
Manages the single Vite sandbox process.
- Writes generated files to sandbox/src/
- Starts / restarts the Vite dev server
- Streams stdout so the caller can forward status to the frontend
"""

import asyncio
import os
import shutil
import subprocess
import signal
import sys
from pathlib import Path

# Absolute path to the sandbox project (sibling of backend/)
BACKEND_DIR = Path(__file__).parent
SANDBOX_DIR = (BACKEND_DIR / "../sandbox").resolve()
SRC_DIR = SANDBOX_DIR / "src"



# ─── File writing & Sanitization / Validation ─────────────────────────────────

import re

def cleanGeneratedCode(code: str) -> str:
    if not code:
        return ""
    
    # 1. First, strip leading and trailing whitespace
    code = code.strip()
    
    # 2. Specifically remove markdown fences at start/end
    code = re.sub(r'^```(?:jsx|javascript|js|react|tsx|ts|json)?\s*\n?', '', code, flags=re.IGNORECASE)
    code = re.sub(r'\n?```\s*$', '', code)
    
    # 3. Specifically remove HTML comments at start/end
    code = re.sub(r'^\s*<!--.*?-->\s*', '', code, flags=re.DOTALL)
    code = re.sub(r'\s*<!--.*?-->\s*$', '', code, flags=re.DOTALL)
    
    # 4. Remove filename headers
    code = re.sub(r'^\s*(?:File|Filename):\s*[\w\.\-/]+\s*\n?', '', code, flags=re.IGNORECASE)
    code = re.sub(r'^\s*###\s*[\w\.\-/]+\s*\n?', '', code, flags=re.IGNORECASE)
    
    # 5. Remove any leading explanatory text: slice to start with the first 'import' or 'export' statement
    match = re.search(r'^\s*(import|export\b)', code, flags=re.MULTILINE)
    if match:
        code = code[match.start():]
    
    # 6. Final strip of extra whitespace
    code = code.strip()
    return code


def validateGeneratedCode(code: str, filename: str) -> bool:
    # Reject files containing forbidden patterns
    forbidden_tokens = ["<!--", "-->", "```", "###"]
    for token in forbidden_tokens:
        if token in code:
            log_invalid_file(filename, token, code)
            return False
            
    if re.search(r'\bfile:', code, re.IGNORECASE):
        log_invalid_file(filename, "File:", code)
        return False
        
    if re.search(r'\bfilename:', code, re.IGNORECASE):
        log_invalid_file(filename, "Filename:", code)
        return False
        
    return True


def log_invalid_file(filename: str, offending_token: str, code: str):
    first_20_lines = "\n".join(code.splitlines()[:20])
    print("INVALID GENERATED FILE")
    print(f"filename: {filename}")
    print(f"offending token: {offending_token}")
    print("first 20 lines:")
    print(first_20_lines)


def write_files(files: dict[str, str], variation_id: str = None) -> list[str]:
    """
    Write a dict of { "relative/path.jsx": "file content" } into sandbox/src/.
    Returns list of written paths for logging.
    Clears old generated component files first (keeps main.jsx, index.css).
    """
    # STEP 5: Files dictionary immediately before write_files()
    print("=" * 80)
    print("STEP 5: Files dictionary inside write_files() (before validation & write)")
    for fname, fcontent in files.items():
        print(f"File: {fname} (length: {len(fcontent)})")
        print(fcontent[:300] + ("..." if len(fcontent) > 300 else ""))
    print("=" * 80)

    # 1. Clean every file content and validate first
    cleaned_files = {}
    for rel_path, content in files.items():
        cleaned_content = cleanGeneratedCode(content)
        if not validateGeneratedCode(cleaned_content, rel_path):
            raise ValueError(f"Generated code validation failed for {rel_path}.")
        cleaned_files[rel_path] = cleaned_content

    # 2. Write new files to disk
    written = []
    new_component_paths = set()
    
    for rel_path, content in cleaned_files.items():
        # Normalise: strip leading slash or src/
        rel_path = rel_path.lstrip("/")
        if rel_path.startswith("src/"):
            rel_path = rel_path[4:]

        base_dir = SRC_DIR / variation_id if variation_id else SRC_DIR
        dest = base_dir / rel_path
        dest.parent.mkdir(parents=True, exist_ok=True)

        if dest.parent.name == "components":
            new_component_paths.add(dest.resolve())

        # STEP 6: Actual contents written to disk
        print("=" * 80)
        print(f"STEP 6: Writing to disk -> {dest}")
        print(content[:500] + ("..." if len(content) > 500 else ""))
        print("=" * 80)

        dest.write_text(content, encoding="utf-8")
        written.append(str(dest.relative_to(SANDBOX_DIR)))

    # 3. Clean up stale components (files in components/ that weren't generated)
    components_dir = (SRC_DIR / variation_id / "components") if variation_id else (SRC_DIR / "components")
    if components_dir.exists():
        for existing_file in components_dir.glob("*.jsx"):
            if existing_file.resolve() not in new_component_paths:
                try:
                    existing_file.unlink()
                    print(f"Deleted stale component: {existing_file.name}")
                except Exception as e:
                    print(f"Failed to delete stale component {existing_file.name}: {e}")
                    
    # 3.5. If variation_id is provided, ensure entry points exist
    if variation_id:
        import shutil
        var_dir = SRC_DIR / variation_id
        for boilerplate in ["main.jsx", "index.css", "ErrorBoundary.jsx"]:
            src_file = SRC_DIR / boilerplate
            dst_file = var_dir / boilerplate
            if src_file.exists() and not dst_file.exists():
                shutil.copy2(src_file, dst_file)
                
        # Generate varX.html in sandbox dir
        html_path = SANDBOX_DIR / f"{variation_id}.html"
        html_content = f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Variation {variation_id}</title>
    <link rel="stylesheet" href="/preview/assets/{variation_id}.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/preview/assets/{variation_id}.js"></script>
  </body>
</html>"""
        html_path.write_text(html_content, encoding="utf-8")

        # Compile with esbuild into the assets directory
        print("=" * 80)
        print(f"STEP 6.5: Running esbuild for {variation_id}")
        cmd = f"npx esbuild src/{variation_id}/main.jsx --bundle --outfile=dist/assets/{variation_id}.js --format=esm --loader:.js=jsx"
        try:
            result = subprocess.run(
                cmd, 
                cwd=str(SANDBOX_DIR), 
                shell=True, 
                check=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            print("esbuild compilation successful")
        except subprocess.CalledProcessError as e:
            print(f"esbuild compilation failed: {e.stderr}")
        print("=" * 80)

    # STEP 7: Read sandbox/src/App.jsx back from disk and print first 10 lines
    app_path = (SRC_DIR / variation_id / "App.jsx") if variation_id else (SRC_DIR / "App.jsx")
    if app_path.exists():
        print("=" * 80)
        print("STEP 7: Read sandbox/src/App.jsx back from disk")
        try:
            with open(app_path, "r", encoding="utf-8") as f:
                lines = [f.readline() for _ in range(10)]
                print("".join(lines))
        except Exception as e:
            print(f"Error reading App.jsx: {e}")
        print("=" * 80)

    return written



