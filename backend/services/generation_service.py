"""
services/generation_service.py
Generation pipeline entry point service.
Delegates to the RouterAgent which dispatches to the correct ADK pipeline.
"""
import logging

logger = logging.getLogger("backend.services.generation")


async def run_generation(request_data: dict):
    """
    Main entry point for all generation/edit requests.
    Yields SSE events from the RouterAgent pipeline.

    Args:
        request_data: dict with keys: prompt, current_code, user_id,
                      generation_mode, variation_count, session_id, etc.
    """
    from backend.agents.router_agent import RouterAgent
    router = RouterAgent()
    async for event in router.route_request(request_data):
        yield event
