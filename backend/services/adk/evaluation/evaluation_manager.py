# Backward-compatibility shim — has moved to backend.agents.evaluation_manager
from backend.agents.evaluation_manager import (  # noqa: F401
    EvaluationManager, get_evaluation_manager
)
