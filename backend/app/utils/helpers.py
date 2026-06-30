"""
utils/helpers.py
Common reusable utility functions shared across the backend.
"""
import time
import hashlib
import logging

logger = logging.getLogger("backend.app.utils.helpers")


def timestamp_id(prefix: str = "id") -> str:
    """Generate a unique ID based on the current timestamp."""
    return f"{prefix}_{int(time.time())}"


def md5_hash(content: str) -> str:
    """Return the MD5 hex digest of a string."""
    return hashlib.md5(content.encode("utf-8")).hexdigest()


def safe_json_string(text: str) -> str:
    """Escape a string to be safe for embedding in JSON."""
    return text.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n').replace('\t', '\\t')


def truncate_for_log(text: str, max_chars: int = 300) -> str:
    """Truncate a string for safe logging."""
    if len(text) <= max_chars:
        return text
    return text[:max_chars] + f"... [{len(text) - max_chars} chars truncated]"
