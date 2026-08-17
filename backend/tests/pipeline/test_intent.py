import pytest
import json
from unittest.mock import patch, MagicMock, AsyncMock
from backend.app.pipeline.models import DesignContext, UserIntent
from backend.app.pipeline.stages.intent_detection import IntentDetector

@pytest.mark.asyncio
async def test_intent_detector_success():
    context = DesignContext(prompt="I want a dark mode saas dashboard for analytics")
    detector = IntentDetector()
    
    mock_response = MagicMock()
    mock_response.choices = [
        MagicMock(message=MagicMock(content='```json\n{"primary_industry": "saas", "page_type": "dashboard", "theme": "dark mode"}\n```'))
    ]
    
    with patch("backend.app.pipeline.stages.intent_detection.generate_ai", new_callable=AsyncMock, return_value=mock_response):
        new_context = await detector.process(context)
        
    assert new_context.intent is not None
    assert new_context.intent.primary_industry == "saas"
    assert new_context.intent.page_type == "dashboard"
    assert new_context.intent.theme == "dark mode"

@pytest.mark.asyncio
async def test_intent_detector_fallback_on_error():
    context = DesignContext(prompt="I want a dark mode saas dashboard for analytics")
    detector = IntentDetector()
    
    with patch("backend.app.pipeline.stages.intent_detection.generate_ai", new_callable=AsyncMock, side_effect=Exception("API Error")):
        new_context = await detector.process(context)
        
    assert new_context.intent is not None
    assert new_context.intent.primary_industry == "general"
    assert new_context.intent.page_type == "landing page"
    assert new_context.intent.theme == "modern"
