import pytest
from unittest.mock import patch, MagicMock, AsyncMock
from backend.app.pipeline.models import DesignContext, DesignPlan, LayoutPlan
from backend.app.pipeline.stages.component_planning import ComponentPlanner

@pytest.mark.asyncio
async def test_component_planner_success():
    context = DesignContext(
        prompt="Make a dashboard for a crypto trading platform",
        design_plan=DesignPlan(product_name="CryptoDash", tagline="Trade", layout_archetype="left-sidebar", content_flow=["Hero", "Pricing"]),
        layout_plan=LayoutPlan(navbar="top", sidebar="left", grid_system="12-column", spacing_rules="spacious")
    )
    planner = ComponentPlanner()
    
    mock_response = MagicMock()
    mock_response.choices = [
        MagicMock(message=MagicMock(content='```json\n{"components": [{"name": "HeroSection", "role": "Intro", "assets_needed": ["background image"]}, {"name": "PricingCards", "role": "Show prices", "assets_needed": []}], "global_assets": ["logo"]}\n```'))
    ]
    
    with patch("backend.app.pipeline.stages.component_planning.generate_ai", new_callable=AsyncMock, return_value=mock_response):
        new_context = await planner.process(context)
        
    assert new_context.component_plan is not None
    assert len(new_context.component_plan.components) == 2
    assert new_context.component_plan.components[0].name == "HeroSection"
    assert new_context.component_plan.components[1].name == "PricingCards"
    assert "logo" in new_context.component_plan.global_assets

@pytest.mark.asyncio
async def test_component_planner_fallback():
    context = DesignContext(prompt="test")
    planner = ComponentPlanner()
    
    with patch("backend.app.pipeline.stages.component_planning.generate_ai", new_callable=AsyncMock, side_effect=Exception("API Error")):
        new_context = await planner.process(context)
        
    assert new_context.component_plan is not None
    assert len(new_context.component_plan.components) == 2
    assert new_context.component_plan.components[0].name == "HeroSection"
