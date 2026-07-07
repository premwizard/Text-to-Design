import pytest
from unittest.mock import patch, MagicMock, AsyncMock
from backend.app.pipeline.models import DesignContext, UserIntent, ExtractedRequirements
from backend.app.pipeline.stages.design_planning import DesignPlanner

@pytest.mark.asyncio
async def test_design_planner_success():
    context = DesignContext(
        prompt="Make a dashboard for a crypto trading platform",
        intent=UserIntent(primary_industry="crypto", page_type="dashboard", theme="dark"),
        requirements=ExtractedRequirements(brand_name="CryptoDash")
    )
    planner = DesignPlanner()
    
    mock_response = MagicMock()
    mock_response.choices = [
        MagicMock(message=MagicMock(content='```json\n{"product_name": "Ignored", "tagline": "Trade better", "layout_archetype": "left-sidebar", "content_flow": ["Sidebar", "Header", "MainChart", "Transactions"]}\n```'))
    ]
    
    with patch("backend.app.pipeline.stages.design_planning.generate_ai", new_callable=AsyncMock, return_value=mock_response):
        new_context = await planner.process(context)
        
    assert new_context.design_plan is not None
    assert new_context.design_plan.product_name == "CryptoDash" # Brand name override
    assert new_context.design_plan.layout_archetype == "left-sidebar"
    assert "MainChart" in new_context.design_plan.content_flow

@pytest.mark.asyncio
async def test_design_planner_fallback():
    context = DesignContext(prompt="test")
    planner = DesignPlanner()
    
    with patch("backend.app.pipeline.stages.design_planning.generate_ai", new_callable=AsyncMock, side_effect=Exception("API Error")):
        new_context = await planner.process(context)
        
    assert new_context.design_plan is not None
    assert new_context.design_plan.product_name == "UI Studio"
    assert new_context.design_plan.layout_archetype == "centered-stack"
