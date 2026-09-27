"""
conftest.py - Pytest fixtures and shared configuration for backend testing.
"""
import pytest
from unittest.mock import MagicMock
from fastapi.testclient import TestClient
from backend.app.main import app


@pytest.fixture
def api_client():
    """Provides a FastAPI TestClient instance for REST API testing."""
    return TestClient(app)


@pytest.fixture
def sample_user_prompt():
    """Provides a sample user prompt for UI generation tests."""
    return "Create a dark mode analytics dashboard for an AI SaaS application"


@pytest.fixture
def mock_ai_response():
    """Helper to create a mocked AI Router completion response."""
    def _create_response(content_str: str):
        mock_resp = MagicMock()
        mock_resp.choices = [
            MagicMock(message=MagicMock(content=content_str))
        ]
        return mock_resp
    return _create_response
