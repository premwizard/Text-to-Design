import os


def get_env(key: str, default: str | None = None, required: bool = False) -> str | None:
    value = os.getenv(key, default)
    if required and not value:
        raise EnvironmentError(f"Missing required environment variable: {key}")
    return value
