import sys
from pathlib import Path
from loguru import logger

# Remove default logger
logger.remove()

# Define log directory
LOG_DIR = Path(__file__).parent.parent / "logs"
LOG_DIR.mkdir(parents=True, exist_ok=True)

# Define custom log format with colors
# Green = success/info, Yellow = warning, Red = error, Blue = status (we can use custom levels or just cyan/blue for info)
log_format = (
    "<green>{time:YYYY-MM-DD HH:mm:ss}</green> | "
    "<level>{level: <8}</level> | "
    "<cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - "
    "<level>{message}</level>"
)

# Add custom colored console handler
logger.add(
    sys.stdout, 
    format=log_format, 
    level="DEBUG",
    colorize=True
)

# Add file handlers
# Pipeline log captures everything info and above
logger.add(
    LOG_DIR / "pipeline.log",
    format="{time:YYYY-MM-DD HH:mm:ss} | {level: <8} | {message}",
    level="INFO",
    rotation="10 MB",
)

# Errors log captures only errors
logger.add(
    LOG_DIR / "errors.log",
    format="{time:YYYY-MM-DD HH:mm:ss} | {level: <8} | {message}",
    level="ERROR",
    rotation="10 MB",
)

# Validation log for specific validation events
logger.add(
    LOG_DIR / "validation.log",
    format="{time:YYYY-MM-DD HH:mm:ss} | {level: <8} | {message}",
    level="INFO",
    filter=lambda record: "validation" in record["extra"] or "validation" in record["message"].lower(),
    rotation="10 MB",
)

# Runtime log
logger.add(
    LOG_DIR / "runtime.log",
    format="{time:YYYY-MM-DD HH:mm:ss} | {level: <8} | {message}",
    level="WARNING",
    rotation="10 MB",
)

def get_logger():
    return logger
