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
import json
import time
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
    
    # 5.5. Auto Repair Layer for framework contamination:
    
    # A. Map 'lucide-react-native' to 'lucide-react'
    if 'lucide-react-native' in code:
        code = re.sub(r'([\'"])lucide-react-native([\'"])', r'\1lucide-react\2', code)
        print("[AUTO_REPAIR] Replaced lucide-react-native with lucide-react")
        
    # B. Map 'next/link' to 'react-router-dom'
    if 'next/link' in code:
        code = re.sub(r'import\s+Link\s+from\s+[\'"]next/link[\'"];?\s*\n?', "import { Link } from 'react-router-dom';\n", code)
        code = re.sub(r'([\'"])next/link([\'"])', r'\1react-router-dom\2', code)
        print("[AUTO_REPAIR] Replaced next/link with react-router-dom")
        
    # C. Map 'react-native' components: View -> div, Text -> span, and remove react-native import
    if 'react-native' in code:
        code = re.sub(r'import\s+(?:(?!import)[\s\S])*?from\s+[\'"]react-native[\'"];?\s*\n?', '', code)
        code = re.sub(r'<\s*View\b', '<div', code)
        code = re.sub(r'<\s*/\s*View\s*>', '</div>', code)
        code = re.sub(r'<\s*Text\b', '<span', code)
        code = re.sub(r'<\s*/\s*Text\s*>', '</span>', code)
        print("[AUTO_REPAIR] Replaced react-native components View -> div, Text -> span and removed react-native import")
            
    # 6. Final strip of extra whitespace
    code = code.strip()
    return code


def validateGeneratedCode(code: str, filename: str) -> bool:
    from backend.services.debug.debug_logger import DebugLogger
    db_logger = DebugLogger()
    db_logger.log("VALIDATION", "START", f"Validating file: {filename}")

    # 0. Reject empty or extremely short code files
    if not code or len(code.strip()) < 30:
        log_invalid_file(filename, "Empty or too short code", code or "")
        db_logger.log("VALIDATION", "FAILED", f"File: {filename}\nReason: Code is empty or too short.")
        raise ValueError(f"Static validation failed: Code in {filename} is empty or too short.")

    # 1. Reject files containing forbidden patterns
    forbidden_tokens = ["<!--", "-->", "```", "###"]
    for token in forbidden_tokens:
        if token in code:
            log_invalid_file(filename, token, code)
            db_logger.log("VALIDATION", "FAILED", f"File: {filename}\nReason: Contains forbidden token '{token}'")
            raise ValueError(f"Static validation failed: File {filename} contains forbidden token '{token}'")
            
    if re.search(r'\bfile:', code, re.IGNORECASE) or re.search(r'\bfilename:', code, re.IGNORECASE):
        log_invalid_file(filename, "Filename:", code)
        db_logger.log("VALIDATION", "FAILED", f"File: {filename}\nReason: Contains file/filename header")
        raise ValueError(f"Static validation failed: File {filename} contains file/filename header")

    # 2. Check for syntax highlighting HTML spans (accidental UI tokens)
    highlighting_patterns = [
        r'<span\s+(?:class|className)="text-(?:pink-400\s+font-semibold|amber-300|violet-300|emerald-400|sky-400|zinc-500\s+italic)"',
        r'text-pink-400\s+font-semibold">',
        r'text-amber-300">',
        r'text-violet-300">',
        r'text-emerald-450">',
        r'text-emerald-400">',
        r'text-sky-400">',
        r'text-zinc-500\s+italic">'
    ]
    for pattern in highlighting_patterns:
        if re.search(pattern, code):
            log_invalid_file(filename, f"Highlighting token (pattern: {pattern})", code)
            db_logger.log("VALIDATION", "FAILED", f"File: {filename}\nReason: Syntax highlighting span leak matched pattern: {pattern}")
            raise ValueError(f"Static validation failed: File {filename} contains syntax highlighting span leak.")

    # 3. Basic imports validation
    for line in code.splitlines():
        if ("import" in line or "export" in line) and ("<" in line or ">" in line or "class=" in line or "className=" in line):
            log_invalid_file(filename, f"Malformed import/export line: {line}", code)
            db_logger.log("VALIDATION", "FAILED", f"File: {filename}\nReason: Malformed import/export line: {line}")
            raise ValueError(f"Static validation failed: File {filename} contains malformed import/export line: {line}")

    # 4. Import Validator check
    from backend.services.validators.import_validator import validate_imports
    is_valid_imports, err_msg = validate_imports(code, filename)
    if not is_valid_imports:
        log_invalid_file(filename, "Forbidden imports", code)
        db_logger.log("VALIDATION", "FAILED", f"File: {filename}\nReason: {err_msg}")
        raise ValueError(err_msg)

    db_logger.log("VALIDATION", "PASSED", f"File: {filename}")
    return True


def log_invalid_file(filename: str, offending_token: str, code: str):
    first_20_lines = "\n".join(code.splitlines()[:20])
    print("INVALID GENERATED FILE")
    print(f"filename: {filename}")
    print(f"offending token: {offending_token}")
    print("first 20 lines:")
    print(first_20_lines)


def log_corrupted_run(files: dict, error_msg: str):
    try:
        corrupted_dir = Path(__file__).parent / "data" / "corrupted_runs"
        corrupted_dir.mkdir(parents=True, exist_ok=True)
        filename = f"corrupted_{int(time.time())}_{os.getpid()}.json"
        log_file = corrupted_dir / filename
        log_data = {
            "timestamp": int(time.time()),
            "error": error_msg,
            "files": files
        }
        log_file.write_text(json.dumps(log_data, indent=2), encoding="utf-8")
        print(f"[Error-Logger] Logged corrupted files to: {log_file}")
    except Exception as e:
        print(f"[Error-Logger] Failed to log corrupted run: {e}")


def log_framework_error(err_msg: str, cleaned_files: dict):
    """
    Parses compilation errors to detect framework/import contamination,
    and logs them under backend/data/framework_errors/ if found.
    """
    try:
        # Regex to match esbuild could not resolve error
        # Example: X [ERROR] Could not resolve "lucide-react-native"
        matches = list(re.finditer(r'Could not resolve "([^"]+)"', err_msg))
        if not matches:
            return
            
        for match in matches:
            bad_import = match.group(1)
            
            # Try to find the file name in the vicinity
            file_match = re.search(r'src/([\w\.\-/]+?\.jsx?):', err_msg)
            file_name = file_match.group(1) if file_match else "Unknown"
            
            # Determine suggested fix
            suggested_fix = "Install the package or replace it with a web-compatible library."
            if "lucide-react-native" in bad_import:
                suggested_fix = "Replace import from 'lucide-react-native' with 'lucide-react'."
            elif "next/link" in bad_import:
                suggested_fix = "Replace import from 'next/link' with 'react-router-dom'."
            elif "react-native" in bad_import:
                suggested_fix = "Remove 'react-native' import and replace React Native components (View, Text, etc.) with web equivalents (div, span, etc.)."
            
            error_dir = BACKEND_DIR / "data" / "framework_errors"
            error_dir.mkdir(parents=True, exist_ok=True)
            
            error_file = error_dir / f"error_{int(time.time())}_{os.getpid()}.json"
            error_data = {
                "timestamp": int(time.time()),
                "file": file_name,
                "bad_import": bad_import,
                "suggested_fix": suggested_fix,
                "full_error": err_msg
            }
            error_file.write_text(json.dumps(error_data, indent=2), encoding="utf-8")
            print(f"[Framework-Error] Logged framework contamination error to: {error_file}")
    except Exception as e:
        print(f"[Framework-Error] Failed to log framework error: {e}")


async def dry_run_compile(cleaned_files: dict, variation_id: str = None) -> tuple[bool, str]:
    """
    Creates a temporary validation directory sandbox/src_validate_temp,
    writes proposed and boilerplate files there, and runs esbuild dry-run compilation.
    """
    temp_src_dir = SANDBOX_DIR / "src_validate_temp"
    temp_src_dir.mkdir(parents=True, exist_ok=True)
    
    from backend.services.debug.debug_logger import DebugLogger
    db_logger = DebugLogger()
    db_logger.log("COMPILE", "START", f"Dry-run compilation checking. Target variation: {variation_id}. Proposed files: {list(cleaned_files.keys())}")
    
    try:
        # 1. Write the proposed files to the temp directory
        for rel_path, content in cleaned_files.items():
            rel_path = rel_path.lstrip("/")
            if rel_path.startswith("src/"):
                rel_path = rel_path[4:]
            
            dest = temp_src_dir / rel_path
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_text(content, encoding="utf-8")
            
        # 2. Copy active folder's boilerplate and other existing components if they are not in cleaned_files
        active_src_dir = SRC_DIR / variation_id if variation_id else SRC_DIR
        
        # Copy standard files: main.jsx, index.css, ErrorBoundary.jsx
        for filename in ["main.jsx", "index.css", "ErrorBoundary.jsx"]:
            src_file = active_src_dir / filename
            if not src_file.exists():
                src_file = SRC_DIR / filename
            dest_file = temp_src_dir / filename
            if src_file.exists() and not dest_file.exists():
                shutil.copy2(src_file, dest_file)
                
        # Copy existing components in components/ folder if they were not generated/updated in this turn
        active_comp_dir = active_src_dir / "components"
        if active_comp_dir.exists():
            for comp_file in active_comp_dir.glob("*.jsx"):
                rel_comp_path = f"components/{comp_file.name}"
                dest_file = temp_src_dir / rel_comp_path
                if not dest_file.exists():
                    dest_file.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(comp_file, dest_file)
                    
        # 3. Run esbuild compilation check
        temp_outfile = SANDBOX_DIR / "dist/assets/validate_temp.js"
        temp_outfile.parent.mkdir(parents=True, exist_ok=True)
        
        cmd = f"npx --yes esbuild src_validate_temp/main.jsx --bundle --outfile=dist/assets/validate_temp.js --format=esm --loader:.js=jsx --loader:.jsx=jsx --jsx=automatic"
        
        proc = await asyncio.create_subprocess_shell(
            cmd,
            cwd=str(SANDBOX_DIR),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        stdout, stderr = await proc.communicate()
        
        if temp_outfile.exists():
            try:
                temp_outfile.unlink()
            except Exception:
                pass
                
        if proc.returncode == 0:
            db_logger.log("COMPILE", "SUCCESS", "Dry-run esbuild bundle compiled successfully.")
            return True, ""
        else:
            err_msg = stderr.decode("utf-8", errors="replace")
            err_msg = err_msg.replace("src_validate_temp/", "src/")
            db_logger.log("COMPILE", "FAILED", f"Dry-run compilation error:\n{err_msg}")
            return False, err_msg
            
    except Exception as e:
        db_logger.log("COMPILE", "ERROR", f"Unexpected error during compilation validation: {e}")
        return False, f"Unexpected error during compilation validation: {e}"
    finally:
        if temp_src_dir.exists():
            try:
                shutil.rmtree(temp_src_dir)
            except Exception:
                pass

async def write_files(files: dict[str, str], variation_id: str = None, bypass_validation: bool = False) -> list[str]:
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
        cleaned_files[rel_path] = cleaned_content

    if not bypass_validation:
        for rel_path, cleaned_content in cleaned_files.items():
            if not validateGeneratedCode(cleaned_content, rel_path):
                log_corrupted_run(cleaned_files, f"Static validation failed for {rel_path}")
                raise ValueError(f"Static validation failed for {rel_path}. Code contains forbidden or highlighting tokens.")
                
        # Compilation validation check
        success, err_msg = await dry_run_compile(cleaned_files, variation_id)
        if not success:
            log_corrupted_run(cleaned_files, err_msg)
            log_framework_error(err_msg, cleaned_files)
            raise ValueError(f"JSX compilation failed: {err_msg}")

    # 2. Write new files to disk
    written = []
    new_component_paths = set()
    
    from backend.services.debug.debug_logger import DebugLogger
    db_logger = DebugLogger()
    import hashlib
    
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
 
        # Compute md5 hash
        content_hash = hashlib.md5(content.encode("utf-8")).hexdigest()
        db_logger.log("SANDBOX", "WRITE_START", f"Writing file: {rel_path}\nDestination: {dest}\nHash: {content_hash}")
 
        try:
            dest.write_text(content, encoding="utf-8")
            db_logger.log("SANDBOX", "WRITE_SUCCESS", f"Wrote file {rel_path} successfully.")
        except Exception as e:
            db_logger.log("SANDBOX", "WRITE_ERROR", f"Failed to write file {rel_path}: {e}")
            raise e
            
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
        print(f"[DEBUG] Generating HTML file: {html_path}")
        print(f"[DEBUG] Asset paths used in HTML: /dist/assets/{variation_id}.css and /dist/assets/{variation_id}.js")
        html_content = f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Variation {variation_id}</title>
    
    <!-- Tailwind CSS CDN for dynamic styling of preview elements -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      // Allow tailwind configuration extension if needed
      tailwind.config = {{
        theme: {{
          extend: {{}}
        }}
      }};
    </script>

    <!-- Google Fonts Support -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;650;700&family=Space+Grotesk:wght@400;550;700&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- FontAwesome Icon Support -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Raw compiled CSS from bundler as fallback -->
    <!-- Preview Debugger & Global Error Catching -->
    <script>
      console.log("[PREVIEW DEBUG] Initializing Variation {variation_id} preview...");
      
      const _log = console.log;
      const _error = console.error;
      const _warn = console.warn;
      
      function forwardLog(type, args) {{
        const msg = Array.from(args).map(arg => {{
          if (typeof arg === 'object') {{
            try {{ return JSON.stringify(arg); }} catch(e) {{ return String(arg); }}
          }}
          return String(arg);
        }}).join(' ');
        
        if (window.parent) {{
          window.parent.postMessage({{
            type: 'preview_console',
            logType: type,
            message: msg
          }}, '*');
        }}
      }}
      
      console.log = function() {{
        _log.apply(console, arguments);
        forwardLog('log', arguments);
      }};
      console.error = function() {{
        _error.apply(console, arguments);
        forwardLog('error', arguments);
      }};
      console.warn = function() {{
        _warn.apply(console, arguments);
        forwardLog('warn', arguments);
      }};

      window.addEventListener('error', (event) => {{
        _error("[PREVIEW DEBUG] Script error caught:", event.message);
        if (window.parent) {{
          window.parent.postMessage({{
            type: 'runtime_error',
            error: event.message,
            stack: event.error ? event.error.stack : ''
          }}, '*');
        }}
      }});

      window.addEventListener('DOMContentLoaded', () => {{
        const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.href);
        const scripts = Array.from(document.querySelectorAll('script')).map(s => s.src || "inline");
        _log("[PREVIEW DEBUG] Loaded Stylesheets:", links);
        _log("[PREVIEW DEBUG] Loaded Scripts:", scripts);
        
        const root = document.getElementById('root');
        const observer = new MutationObserver((mutations) => {{
          if (root && root.children.length > 0) {{
            _log("[PREVIEW DEBUG] React application rendered to DOM successfully.");
            if (window.parent) {{
              window.parent.postMessage({{
                type: 'preview_rendered',
                html: root.innerHTML.slice(0, 1000)
              }}, '*');
            }}
            observer.disconnect();
          }}
        }});
        if (root) {{
          observer.observe(root, {{ childList: true, subtree: true }});
        }}
      }});
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/dist/assets/{variation_id}.js"></script>
  </body>
</html>"""
        html_path.write_text(html_content, encoding="utf-8")

        # Compile and verify step with a retry loop
        max_attempts = 3
        for attempt in range(1, max_attempts + 1):
            outfile_js = f"dist/assets/{variation_id}.js"
            outfile_css = f"dist/assets/{variation_id}.css"
            abs_outfile_js = SANDBOX_DIR / outfile_js
            abs_outfile_css = SANDBOX_DIR / outfile_css
            
            print("=" * 80)
            print(f"STEP 6.5: Running esbuild for {variation_id} (Attempt {attempt}/{max_attempts})")
            print(f"[DEBUG] Target compilation folder: {SANDBOX_DIR}")
            print(f"[DEBUG] Output JS file path: {abs_outfile_js}")
            print(f"[DEBUG] Output CSS file path: {abs_outfile_css}")
            
            cmd = f"npx --yes esbuild src/{variation_id}/main.jsx --bundle --outfile={outfile_js} --format=esm --loader:.js=jsx --loader:.jsx=jsx --jsx=automatic"
            print(f"[DEBUG] Executing command: {cmd}")
            
            result = subprocess.run(
                cmd,
                cwd=str(SANDBOX_DIR),
                shell=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            
            if result.returncode == 0:
                print("esbuild compilation successful")
                print(f"[DEBUG] Generated JS file exists: {abs_outfile_js.exists()}")
                print(f"[DEBUG] Generated CSS file exists: {abs_outfile_css.exists()}")
                print("=" * 80)
                break
            else:
                print(f"esbuild compilation failed: {result.stderr}")
                print("=" * 80)
                if attempt == max_attempts:
                    raise ValueError(f"esbuild compilation failed after {max_attempts} attempts: {result.stderr}")
                
                # Auto-repair logic
                match = re.search(r'(src/[^:\s]+\.jsx?)', result.stderr)
                if match:
                    error_file_rel = match.group(1)
                    error_file_abs = SANDBOX_DIR / error_file_rel
                    if error_file_abs.exists():
                        print(f"[Auto-Fix] Repairing offending file: {error_file_rel}")
                        broken_code = error_file_abs.read_text(encoding="utf-8")
                        
                        from backend.services.ai_router import generate_ai
                        from backend.prompts import FIX_SYSTEM_PROMPT
                        from backend.routes.generate_ui import _repair_jsx
                        
                        system_instructions = FIX_SYSTEM_PROMPT.format(
                            broken_code=broken_code,
                            error=result.stderr
                        )
                        
                        try:
                            # Invoke AI text generation
                            ai_response = await generate_ai(
                                task_type="fix",
                                system_prompt=system_instructions,
                                user_prompt=f"Fix this component. The error is: {result.stderr}",
                                temperature=0.1,
                                stream=False
                            )
                            fixed_code_raw = ai_response.choices[0].message.content.strip()
                            
                            # Clean and repair fixed code
                            fixed_code = cleanGeneratedCode(fixed_code_raw)
                            fixed_code = _repair_jsx(fixed_code)
                            
                            # Write fixed code back to disk
                            error_file_abs.write_text(fixed_code, encoding="utf-8")
                            print(f"[Auto-Fix] Rewrote repaired file: {error_file_rel}")
                        except Exception as ai_err:
                            print(f"[Auto-Fix] AI repair request failed: {ai_err}")
                            break
                    else:
                        break
                else:
                    break

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



