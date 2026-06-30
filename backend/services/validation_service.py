"""
services/validation_service.py
JSX validation and code sanitization service.
Extracts validation logic from project_runner.py into a focused service.
"""
import re
import logging
from pathlib import Path

logger = logging.getLogger("backend.services.validation")


def clean_generated_code(code: str) -> str:
    """
    Remove LLM artifacts from generated code:
    - Markdown fences
    - HTML comments
    - Filename headers
    - Leading explanation text
    - Framework contamination (react-native, lucide-react-native, next/link)
    """
    from backend.project_runner import cleanGeneratedCode
    return cleanGeneratedCode(code)


def validate_generated_code(code: str, filename: str) -> bool:
    """
    Run static validation checks on generated code.
    Raises ValueError if the code contains forbidden tokens.
    """
    from backend.project_runner import validateGeneratedCode
    return validateGeneratedCode(code, filename)


async def sanitize_jsx(code: str, filename: str) -> str:
    """
    Run JSX-specific sanitization (regex + AST validation via esbuild).
    Falls back to a safe component if the JSX is irrecoverably malformed.
    """
    from backend.utils.jsx_sanitizer import sanitize_jsx as _sanitize
    return await _sanitize(code, filename)


def log_invalid_file(filename: str, offending_token: str, code: str):
    """Log the first 20 lines of an invalid generated file for debugging."""
    from backend.project_runner import log_invalid_file as _log
    _log(filename, offending_token, code)
