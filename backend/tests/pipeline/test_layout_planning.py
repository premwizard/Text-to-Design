import pytest
from unittest.mock import patch, MagicMock, AsyncMock
from backend.app.pipeline.models import DesignContext, DesignPlan, ExtractedRequirements
from backend.app.pipeline.stages.layout_planning import LayoutPlanner

@pytest.mark.asyncio
async def test_layout_planner_success():
    context = DesignContext(
        prompt="Make a dashboard for a crypto trading platform",
        design_plan=DesignPlan(product_name="CryptoDash", tagline="Trade", layout_archetype="left-sidebar", content_flow=["Hero"]),
        requirements=ExtractedRequirements()
    )
    planner = LayoutPlanner()
    
    mock_response = MagicMock()
    mock_response.choices = [
        MagicMock(message=MagicMock(content='```json\n{"navbar": "top", "sidebar": "left", "grid_system": "12-column CSS grid", "spacing_rules": "spacious"}\n```'))
    ]
    
    with patch("backend.app.pipeline.stages.layout_planning.generate_ai", new_callable=AsyncMock, return_value=mock_response):
        new_context = await planner.process(context)
        
    assert new_context.layout_plan is not None
    assert new_context.layout_plan.navbar == "top"
    assert new_context.layout_plan.sidebar == "left"
    assert new_context.layout_plan.grid_system == "12-column CSS grid"

@pytest.mark.asyncio
async def test_layout_planner_fallback():
    context = DesignContext(prompt="test")
    planner = LayoutPlanner()
    
    with patch("backend.app.pipeline.stages.layout_planning.generate_ai", new_callable=AsyncMock, side_effect=Exception("API Error")):
        new_context = await planner.process(context)
        
    assert new_context.layout_plan is not None
    assert new_context.layout_plan.navbar == "top"
    assert new_context.layout_plan.grid_system == "flex-column stack"
