from backend.config.ai_models import PLANNER_MODELS, BUILDER_MODELS, FIX_MODELS, EDITOR_MODELS

def get_models_for_task(task_type: str):
    task_type = task_type.lower()
    if task_type == "planner":
        return PLANNER_MODELS
    elif task_type == "builder":
        return BUILDER_MODELS
    elif task_type == "fix":
        return FIX_MODELS
    elif task_type == "editor":
        return EDITOR_MODELS
    else:
        # Default to builder models
        return BUILDER_MODELS
