"""
test_api.py - Pytest integration tests for FastAPI REST API endpoints.
"""
import pytest
from unittest.mock import patch, AsyncMock


def test_root_endpoint(api_client):
    """Test the root / endpoint."""
    response = api_client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "active"
    assert "service" in data


def test_health_endpoint(api_client):
    """Test the /health check endpoint."""
    response = api_client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"


def test_generate_ui_compat(api_client):
    """Test legacy /generate-ui endpoint."""
    response = api_client.post("/generate-ui")
    assert response.status_code == 200
    data = response.json()
    assert "design" in data
    assert "components" in data


def test_stream_jsx_requires_prompt(api_client):
    """Test that POST /stream-jsx without prompt fails validation."""
    response = api_client.post("/stream-jsx", json={})
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_save_files_endpoint(api_client):
    """Test POST /save-files endpoint."""
    with patch("backend.app.controllers.generate_controller.write_files", new_callable=AsyncMock) as mock_write:
        response = api_client.post("/save-files", json={"files": {"App.jsx": "code"}})
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"
        mock_write.assert_called_once()
