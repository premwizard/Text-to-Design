import pytest
from unittest.mock import patch, MagicMock, AsyncMock
from backend.app.pipeline.models import DesignContext, UserIntent
from backend.app.pipeline.stages.requirement_extraction import RequirementExtractor

@pytest.mark.asyncio
async def test_requirement_extractor_success():
    context = DesignContext(
        prompt="Make a crypto dashboard with a blue navbar and a sidebar, call it CoinTracker.",
        intent=UserIntent(primary_industry="crypto", page_type="dashboard", theme="modern")
    )
    extractor = RequirementExtractor()
    
    mock_response = MagicMock()
    mock_response.choices = [
        MagicMock(message=MagicMock(content='```json\n{"explicit_colors": ["blue"], "required_sections": ["navbar", "sidebar"], "special_features": [], "brand_name": "CoinTracker"}\n```'))
    ]
    
    with patch("backend.app.pipeline.stages.requirement_extraction.generate_ai", new_callable=AsyncMock, return_value=mock_response):
        new_context = await extractor.process(context)
        
    assert new_context.requirements is not None
    assert "blue" in new_context.requirements.explicit_colors
    assert "navbar" in new_context.requirements.required_sections
    assert new_context.requirements.brand_name == "CoinTracker"

@pytest.mark.asyncio
async def test_requirement_extractor_fallback():
    context = DesignContext(prompt="test")
    extractor = RequirementExtractor()
    
    with patch("backend.app.pipeline.stages.requirement_extraction.generate_ai", new_callable=AsyncMock, side_effect=Exception("API Error")):
        new_context = await extractor.process(context)
        
    assert new_context.requirements is not None
    assert new_context.requirements.brand_name is None
    assert len(new_context.requirements.explicit_colors) == 0
