"""
test_agents.py - Pytest unit tests for ADK tools, registries, and agents.
"""
import pytest
from unittest.mock import patch, MagicMock, AsyncMock
from backend.app.agents.tool_registry import BaseADKTool, ToolRegistry, get_tool_registry
from backend.app.agents.agent_registry import AgentRegistry, get_agent_registry
from backend.app.agents.base_agent import BaseADKAgent
from backend.app.agents.tools import (
    ChromaTool,
    CompilerTool,
    FileWriterTool,
    JSXValidatorTool,
    HistoryManagerTool,
)
from backend.app.agents.rag_retrieval_agent import RAGRetrievalAgent, run_rag_retrieval
from backend.app.agents.prompt_understanding_agent import run_prompt_understanding
from backend.app.agents.design_planning_agent import run_design_planning


# ---------------------------------------------------------
# Tool Registry & ADK Tools Tests
# ---------------------------------------------------------

def test_tool_registry_singleton():
    reg1 = get_tool_registry()
    reg2 = ToolRegistry.get_instance()
    assert reg1 is reg2


def test_tool_registry_register_and_get():
    registry = ToolRegistry.get_instance()
    
    class DummyTool(BaseADKTool):
        def __init__(self):
            super().__init__("Dummy")
            
        async def execute(self, **kwargs):
            return "dummy_result"

    dummy = DummyTool()
    registry.register_tool("dummy_test_tool", dummy)
    retrieved = registry.get_tool("dummy_test_tool")
    assert retrieved is dummy
    assert "dummy_test_tool" in registry.list_tools()


@pytest.mark.asyncio
async def test_jsx_validator_tool():
    tool = JSXValidatorTool()
    
    # Test input validation exception
    with pytest.raises(ValueError):
        tool.validate_input()
        
    # Test repairing JSX code
    code_res = await tool.execute(code="function App() { return <div>Unclosed div")
    assert isinstance(code_res, str)
    
    # Test repairing JSON string
    json_res = await tool.execute(json_str='{"key": "value"}')
    assert json_res == '{"key": "value"}'


@pytest.mark.asyncio
async def test_file_writer_tool():
    tool = FileWriterTool()
    
    with pytest.raises(ValueError):
        tool.validate_input()

    with patch("backend.project_runner.write_files", new_callable=AsyncMock) as mock_write:
        res = await tool.execute(files={"App.jsx": "export default function App() {}"})
        assert res is True
        mock_write.assert_called_once()


@pytest.mark.asyncio
async def test_compiler_tool():
    tool = CompilerTool()
    
    with pytest.raises(ValueError):
        tool.validate_input()

    with patch("backend.project_runner.write_files", new_callable=AsyncMock) as mock_write:
        res = await tool.execute(files={"App.jsx": "code"}, variation_id="var1", bypass_validation=True)
        assert res is True
        mock_write.assert_called_once_with({"App.jsx": "code"}, variation_id="var1", bypass_validation=True)


@pytest.mark.asyncio
async def test_history_manager_tool():
    tool = HistoryManagerTool()
    
    with pytest.raises(ValueError):
        tool.validate_input()

    with patch("backend.app.services.editing.history_service.EditHistoryService.load_history") as mock_load:
        mock_load.return_value = [{"session_id": "s1"}]
        res = await tool.execute(action="load", user_id="u1", session_id="s1")
        assert res == [{"session_id": "s1"}]


# ---------------------------------------------------------
# Base Agent Tests
# ---------------------------------------------------------

class ConcreteTestAgent(BaseADKAgent):
    def __init__(self, should_fail=False):
        super().__init__("TestAgent", retries=1)
        self.should_fail = should_fail

    async def _execute(self, input_data: dict, **kwargs) -> dict:
        if self.should_fail:
            raise ValueError("Test execution failure")
        return {"output": "success"}


@pytest.mark.asyncio
async def test_base_agent_successful_run():
    agent = ConcreteTestAgent(should_fail=False)
    res = await agent.run({"input": "data"})
    assert res["success"] is True
    assert res["result"]["output"] == "success"
    assert res["stage"] == "TestAgent"


@pytest.mark.asyncio
async def test_base_agent_failed_run_returns_structured_error():
    agent = ConcreteTestAgent(should_fail=True)
    res = await agent.run({"input": "data"})
    assert res["success"] is False
    assert "Test execution failure" in res["error"]
    assert res["stage"] == "TestAgent"


# ---------------------------------------------------------
# Agent Registry Tests
# ---------------------------------------------------------

def test_agent_registry():
    reg1 = get_agent_registry()
    reg2 = AgentRegistry.get_instance()
    assert reg1 is reg2


# ---------------------------------------------------------
# RAG Retrieval Agent Tests
# ---------------------------------------------------------

def test_rag_agent_normalize_style():
    agent = RAGRetrievalAgent()
    assert agent.normalize_style("neo-brutalist dark") == "neo-brutalism"
    assert agent.normalize_style("glass light") == "glassmorphism"
    assert agent.normalize_style("apple minimal") == "apple-style"
    assert agent.normalize_style("dark mode") == "dark-modern"
    assert agent.normalize_style("premium saas") == "premium-saas"
    assert agent.normalize_style("simple") == "minimal"


@pytest.mark.asyncio
async def test_run_rag_retrieval():
    intent = {"pageType": "landing", "theme": "premium dark", "components": ["navbar", "hero", "features"]}
    res = await run_rag_retrieval(intent, "Create a SaaS landing page")
    assert "styleMatched" in res
    assert "layoutPattern" in res
    assert "styling" in res
    assert "font_heading" in res["styling"]


# ---------------------------------------------------------
# Prompt Understanding & Design Planning Agent Tests
# ---------------------------------------------------------

@pytest.mark.asyncio
async def test_prompt_understanding_agent_fallback():
    # Test fallback mode when LLM throws an exception
    with patch("backend.app.agents.prompt_understanding_agent.generate_ai", new_callable=AsyncMock, side_effect=Exception("API Error")):
        result = await run_prompt_understanding("Create dark mode analytics dashboard", {})
        assert result["pageType"] == "dashboard"
        assert "components" in result


@pytest.mark.asyncio
async def test_design_planning_agent_fallback():
    intent = {"pageType": "landing", "theme": "dark", "components": ["navbar", "hero", "footer"]}
    rag = {"styleMatched": "minimal", "layoutPattern": "split-hero", "styling": {"font_heading": "Inter"}}
    
    with patch("backend.app.agents.design_planning_agent.generate_ai", new_callable=AsyncMock, side_effect=Exception("API Error")):
        plan = await run_design_planning(intent, rag, "Create landing page")
        assert "productName" in plan
        assert "layout" in plan
        assert "mainSections" in plan["layout"]
