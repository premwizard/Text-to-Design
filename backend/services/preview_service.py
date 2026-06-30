"""
services/preview_service.py
Preview compilation and file-writing service.
Wraps project_runner.py functions for use by controllers.
"""
import logging

logger = logging.getLogger("backend.services.preview")


async def write_files(files: dict, variation_id: str = None, bypass_validation: bool = False) -> list:
    """
    Write generated files to the sandbox, validate, and compile via esbuild.
    Returns list of written file paths.
    """
    from backend.project_runner import write_files as _write_files
    return await _write_files(files, variation_id=variation_id, bypass_validation=bypass_validation)


async def dry_run_compile(files: dict, variation_id: str = None) -> tuple[bool, str]:
    """
    Run a temporary esbuild compilation check without writing to the live sandbox.
    Returns (success: bool, error_message: str).
    """
    from backend.project_runner import dry_run_compile as _dry_run
    return await _dry_run(files, variation_id)


def validate_cross_file_imports(files: dict) -> None:
    """
    Scan generated files for unresolved relative imports and auto-create stubs.
    """
    from backend.project_runner import validate_cross_file_imports as _validate
    _validate(files)
