"""
config/logging_config.py
Centralized logging configuration for the backend.
"""
import logging


def setup_logging(level: int = logging.INFO) -> None:
    """Configure root logger with a standard format."""
    logging.basicConfig(
        level=level,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    )
