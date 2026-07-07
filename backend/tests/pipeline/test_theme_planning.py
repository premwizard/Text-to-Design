import pytest
from unittest.mock import patch, MagicMock, AsyncMock
from backend.app.pipeline.models import DesignContext, UserIntent, ExtractedRequirements, DesignPlan
from backend.app.pipeline.stages.theme_planning import ThemePlanner

@pytest.mark.asyncio
async def test_theme_planner_success():
    context = DesignContext(
        prompt="Make a futuristic neon crypto app",
        intent=UserIntent(primary_industry="crypto", page_type="dashboard", theme="neon"),
        requirements=ExtractedRequirements(explicit_colors=["neon-green", "purple"]),
        design_plan=DesignPlan(product_name="NeonCoin", tagline="Future", layout_archetype="left-sidebar", content_flow=["Hero"])
    )
    planner = ThemePlanner()
    
    mock_response = MagicMock()
    mock_response.choices = [
        MagicMock(message=MagicMock(content='```json\n{"font_heading": "Space Grotesk", "font_body": "Inter", "primary_color": "green-400", "secondary_color": "purple-500", "bg_color": "bg-black", "text_color": "text-white", "visual_style": "glassmorphism"}\n```'))
    ]
    
    with patch("backend.app.pipeline.stages.theme_planning.generate_ai", new_callable=AsyncMock, return_value=mock_response):
        new_context = await planner.process(context)
        
    assert new_context.theme_plan is not None
    assert new_context.theme_plan.font_heading == "Space Grotesk"
    assert new_context.theme_plan.primary_color == "green-400"
    assert new_context.theme_plan.bg_color == "bg-black"

@pytest.mark.asyncio
async def test_theme_planner_fallback():
    context = DesignContext(prompt="test")
    planner = ThemePlanner()
    
    with patch("backend.app.pipeline.stages.theme_planning.generate_ai", new_callable=AsyncMock, side_effect=Exception("API Error")):
        new_context = await planner.process(context)
        
    assert new_context.theme_plan is not None
    assert new_context.theme_plan.primary_color == "blue-600"
    assert new_context.theme_plan.visual_style == "minimal"
