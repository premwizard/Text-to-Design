import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from backend.config.ai_models import PROVIDERS_CONFIG

print("PROVIDERS_CONFIG['gemini']:", PROVIDERS_CONFIG.get("gemini"))
