# Backward-compatibility shim — has moved to backend.app.agents.evaluation_manager
from backend.app.agents.evaluation_manager import (  # noqa: F401
    EvaluationManager, get_evaluation_manager
)
