import pytest
from unittest.mock import patch, MagicMock, AsyncMock
from backend.app.pipeline.models import DesignContext, DesignPlan, ThemePlan, LayoutPlan, ComponentPlan, ComponentSpec
from backend.app.pipeline.stages.code_generation import CodeGenerator

@pytest.mark.asyncio
async def test_code_generator_success():
    context = DesignContext(
        prompt="Make a dashboard",
        design_plan=DesignPlan(product_name="Dash", tagline="Fast", layout_archetype="left-sidebar", content_flow=["Hero"]),
        theme_plan=ThemePlan(font_heading="Inter", font_body="Inter", primary_color="blue", secondary_color="red", bg_color="white", text_color="black", visual_style="flat"),
        layout_plan=LayoutPlan(navbar="top", sidebar="left", grid_system="12-col", spacing_rules="spacious"),
        component_plan=ComponentPlan(components=[ComponentSpec(name="HeroSection", role="intro", assets_needed=[])], global_assets=[])
    )
    generator = CodeGenerator()
    
    mock_response = MagicMock()
    mock_response.choices = [
        MagicMock(message=MagicMock(content='Here is your code:\n\n===FILE: App.jsx===\nimport React from "react";\n\n===FILE: components/HeroSection.jsx===\nexport default function Hero() {}'))
    ]
    
    with patch("backend.app.pipeline.stages.code_generation.generate_ai", new_callable=AsyncMock, return_value=mock_response):
        new_context = await generator.process(context)
        
    assert new_context.generated_code is not None
    assert len(new_context.generated_code.files) == 2
    assert "App.jsx" in new_context.generated_code.files
    assert "components/HeroSection.jsx" in new_context.generated_code.files
    assert 'import React from "react";' in new_context.generated_code.files["App.jsx"]

@pytest.mark.asyncio
async def test_code_generator_fallback():
    context = DesignContext(prompt="test")
    generator = CodeGenerator()
    
    with patch("backend.app.pipeline.stages.code_generation.generate_ai", new_callable=AsyncMock, side_effect=Exception("API Error")):
        new_context = await generator.process(context)
        
    assert new_context.generated_code is not None
    assert "App.jsx" in new_context.generated_code.files
    assert "Generated Code Failed" in new_context.generated_code.files["App.jsx"]
