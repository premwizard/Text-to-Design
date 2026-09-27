"""
test_pipeline.py - Pytest unit tests for the pipeline stages and models.
"""
import pytest
from unittest.mock import patch, MagicMock, AsyncMock
from backend.app.pipeline.models import DesignContext
from backend.app.pipeline.stages.intent_detection import IntentDetector
from backend.app.pipeline.stages.requirement_extraction import RequirementExtractor
from backend.app.pipeline.stages.theme_planning import ThemePlanner
from backend.app.pipeline.stages.layout_planning import LayoutPlanner
from backend.app.pipeline.stages.component_planning import ComponentPlanner
from backend.app.pipeline.stages.code_generation import CodeGenerator


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


@pytest.mark.asyncio
async def test_requirements_analyzer():
    context = DesignContext(prompt="I want a SaaS dashboard with charts and billing")
    analyzer = RequirementExtractor()
    
    mock_response = MagicMock()
    mock_response.choices = [
        MagicMock(message=MagicMock(content='{"explicit_colors": ["violet"], "required_sections": ["navbar", "hero"], "special_features": ["charts"], "brand_name": "AnalyticsApp"}'))
    ]
    
    with patch("backend.app.pipeline.stages.requirement_extraction.generate_ai", new_callable=AsyncMock, return_value=mock_response):
        new_context = await analyzer.process(context)
        
    assert new_context.requirements is not None
    assert "navbar" in new_context.requirements.required_sections
    assert new_context.requirements.brand_name == "AnalyticsApp"


@pytest.mark.asyncio
async def test_theme_planner():
    context = DesignContext(prompt="Luxury hotel booking page")
    planner = ThemePlanner()
    
    mock_response = MagicMock()
    mock_response.choices = [
        MagicMock(message=MagicMock(content='{"primary_color": "gold", "secondary_color": "black", "bg_color": "bg-slate-950", "text_color": "text-white", "font_heading": "Playfair", "font_body": "Inter", "visual_style": "elegant"}'))
    ]
    
    with patch("backend.app.pipeline.stages.theme_planning.generate_ai", new_callable=AsyncMock, return_value=mock_response):
        new_context = await planner.process(context)
        
    assert new_context.theme_plan is not None
    assert new_context.theme_plan.primary_color == "gold"
    assert new_context.theme_plan.font_heading == "Playfair"


@pytest.mark.asyncio
async def test_layout_planner():
    context = DesignContext(prompt="E-commerce store")
    planner = LayoutPlanner()
    
    mock_response = MagicMock()
    mock_response.choices = [
        MagicMock(message=MagicMock(content='{"navbar": "top", "sidebar": "none", "grid_system": "flex-column stack", "spacing_rules": "spacious"}'))
    ]
    
    with patch("backend.app.pipeline.stages.layout_planning.generate_ai", new_callable=AsyncMock, return_value=mock_response):
        new_context = await planner.process(context)
        
    assert new_context.layout_plan is not None
    assert new_context.layout_plan.navbar == "top"


@pytest.mark.asyncio
async def test_component_planner():
    context = DesignContext(prompt="Portfolio website")
    planner = ComponentPlanner()
    
    mock_response = MagicMock()
    mock_response.choices = [
        MagicMock(message=MagicMock(content='{"components": [{"name": "HeroSection", "role": "hero landing section", "assets_needed": []}], "global_assets": []}'))
    ]
    
    with patch("backend.app.pipeline.stages.component_planning.generate_ai", new_callable=AsyncMock, return_value=mock_response):
        new_context = await planner.process(context)
        
    assert new_context.component_plan is not None
    assert len(new_context.component_plan.components) == 1
    assert new_context.component_plan.components[0].name == "HeroSection"


@pytest.mark.asyncio
async def test_code_generator():
    context = DesignContext(prompt="Portfolio website")
    generator = CodeGenerator()
    
    mock_response = MagicMock()
    mock_response.choices = [
        MagicMock(message=MagicMock(content='===FILE: App.jsx===\nexport default function App() { return <div>Portfolio</div> }'))
    ]
    
    with patch("backend.app.pipeline.stages.code_generation.generate_ai", new_callable=AsyncMock, return_value=mock_response):
        new_context = await generator.process(context)
        
    assert new_context.generated_code is not None
    assert "App.jsx" in new_context.generated_code.files
