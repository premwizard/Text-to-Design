"""
agents/orchestrator.py
Main ADK orchestration pipeline entry point.

Re-exports the orchestration functions from the legacy ADK orchestrator.
The canonical implementation lives in backend.services.adk.adk_orchestrator
and will be gradually migrated here in a future refactor pass.
"""
# Re-export from the active ADK orchestrator implementation
from backend.services.adk.adk_orchestrator import (  # noqa: F401
    run_adk_orchestration_stream,
    run_adk_edit_orchestration_stream,
    build_fallback_design_plan,
    has_error,
)
