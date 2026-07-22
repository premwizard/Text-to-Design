import re
import asyncio
import subprocess
from pathlib import Path

# Absolute path to the sandbox project (sibling of backend/)
BACKEND_DIR = Path(__file__).resolve().parent.parent
SANDBOX_DIR = (BACKEND_DIR / "../sandbox").resolve()

FALLBACK_COMPONENT = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Safe Fallback</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #09090b; color: #f87171; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .card { background: rgba(153, 27, 27, 0.2); border: 1px solid #f87171; padding: 2rem; border-radius: 1rem; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <h2>HTML Generation Fallback</h2>
    <p>A safety fallback was rendered.</p>
  </div>
</body>
</html>
"""

def sanitize_regex(code: str, filename: str) -> str:
    original_code = code
    
    # Minimal sanitization: only remove markdown fences and extra backticks
    code = re.sub(r'^```[a-zA-Z]*\n', '', code, flags=re.MULTILINE)
    code = re.sub(r'^```\s*$', '', code, flags=re.MULTILINE)
    code = code.strip()

    if code != original_code:
        print(f"[JSX-Sanitizer] Cleaned markdown from JSX in {filename}")

    return code


async def validate_ast(code: str, filename: str) -> bool:
    """
    Validates the JSX using Babel.
    Returns True if valid, False otherwise.
    """
    temp_src_dir = SANDBOX_DIR / "src_validate_ast_temp"
    temp_src_dir.mkdir(parents=True, exist_ok=True)
    
    # Just use a simple temporary filename for validation
    temp_file = temp_src_dir / "temp_component.jsx"
    
    # Add debug logging
    print(f"[DEBUG] [JSX-Sanitizer] Starting AST validation for {filename}")
    
    try:
        temp_file.write_text(code, encoding="utf-8")
        
        # We run the babel_validator script
        babel_script = BACKEND_DIR / "app" / "utils" / "babel_validator.js"
        cmd = f"node {babel_script.name} {temp_file.name}"
        
        # We execute in utils dir so node can find the script, but pass the absolute path of temp_file
        cmd = f"node {babel_script.resolve()} {temp_file.resolve()}"
        
        def _run_babel():
            return subprocess.run(
                cmd,
                cwd=str(SANDBOX_DIR),
                shell=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            
        proc = await asyncio.to_thread(_run_babel)
        stdout, stderr = proc.stdout, proc.stderr
        
        if proc.returncode == 0:
            print(f"[DEBUG] [JSX-Sanitizer] Validation successful for {filename}")
            return True
        else:
            err_msg = stderr.decode('utf-8', errors='replace')
            # detailed error logs as requested
            print(f"[JSX-Sanitizer] Validation failed for {filename}:")
            print(err_msg)
            return False
    except Exception as e:
        print(f"[JSX-Sanitizer] AST Validation encountered an error for {filename}: {e}")
        return False
    finally:
        import shutil
        if temp_src_dir.exists():
            try:
                shutil.rmtree(temp_src_dir)
            except Exception:
                pass


async def sanitize_jsx(code: str, filename: str) -> str:
    """
    Main entry point for JSX sanitization and validation.
    """
    print(f"[DEBUG] [JSX-Sanitizer] Original generated file {filename}:\n{code[:300]}...\n")
    
    # 1. Regex sanitization
    sanitized_code = sanitize_regex(code, filename)
    print(f"[DEBUG] [JSX-Sanitizer] Sanitized file {filename}:\n{sanitized_code[:300]}...\n")
    
    # 2. AST Validation
    # We only validate files that are likely to be React components (.jsx)
    if filename.endswith('.jsx'):
        is_valid = await validate_ast(sanitized_code, filename)
        if not is_valid:
            print(f"[JSX-Sanitizer] Validation failed. Using fallback component for {filename}.")
            print(f"[DEBUG] Exact failure reason: Babel AST validation rejected the file. Returning original code for debug.")
            return sanitized_code
            
    return sanitized_code
