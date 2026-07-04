import re
import asyncio
import subprocess
from pathlib import Path

# Absolute path to the sandbox project (sibling of backend/)
BACKEND_DIR = Path(__file__).resolve().parent.parent
SANDBOX_DIR = (BACKEND_DIR / "../sandbox").resolve()

FALLBACK_COMPONENT = """import React from 'react';

export default function SafeComponent() {
  return (
    <div className="flex items-center justify-center w-full min-h-[200px] bg-red-950/30 border-2 border-red-500/50 rounded-xl p-8">
      <div className="text-center space-y-2">
        <h2 className="text-red-400 font-bold text-xl">Component failed safely</h2>
        <p className="text-red-400/80 text-sm max-w-md mx-auto">
          The generated JSX was malformed and failed compilation. The fallback component is being displayed to prevent the preview from crashing.
        </p>
      </div>
    </div>
  );
}
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
    Validates the JSX using esbuild.
    Returns True if valid, False otherwise.
    """
    temp_src_dir = SANDBOX_DIR / "src_validate_ast_temp"
    temp_src_dir.mkdir(parents=True, exist_ok=True)
    
    # Just use a simple temporary filename for validation
    temp_file = temp_src_dir / "temp_component.jsx"
    temp_outfile = temp_src_dir / "temp_out.js"
    
    try:
        temp_file.write_text(code, encoding="utf-8")
        
        # We only want to check syntax, so we run a simple esbuild command
        cmd = f"npx --yes esbuild {temp_file.name} --outfile={temp_outfile.name} --loader:.jsx=jsx"
        
        proc = await asyncio.create_subprocess_shell(
            cmd,
            cwd=str(temp_src_dir),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        stdout, stderr = await proc.communicate()
        
        if proc.returncode == 0:
            return True
        else:
            err_msg = stderr.decode('utf-8', errors='replace')
            # Don't fail on missing imports during single-file AST check, only syntax errors.
            if "Could not resolve" in err_msg and "Syntax error" not in err_msg and "Expected" not in err_msg and "Unexpected" not in err_msg:
                 return True
            # Replace characters that might crash windows console
            safe_err_msg = err_msg.encode('ascii', 'replace').decode('ascii')
            print(f"[JSX-Sanitizer] Validation failed for {filename}:\n{safe_err_msg}")
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
    # 1. Regex sanitization
    sanitized_code = sanitize_regex(code, filename)
    
    # 2. AST Validation
    # We only validate files that are likely to be React components (.jsx)
    if filename.endswith('.jsx'):
        is_valid = await validate_ast(sanitized_code, filename)
        if not is_valid:
            print(f"[JSX-Sanitizer] Validation failed. Using fallback component for {filename}.")
            return FALLBACK_COMPONENT
            
    return sanitized_code
