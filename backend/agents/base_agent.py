"""
agents/base_agent.py
Base class for all ADK agents, providing retry logic, timing, and observability.
"""
import time
import logging
import asyncio

logger = logging.getLogger("backend.agents.base_agent")


class BaseADKAgent:
    def __init__(self, name: str, retries: int = 1):
        self.name = name
        self.retries = retries
        self.tool_calls = []

    async def run(self, input_data: dict, **kwargs) -> dict:
        """
        Wraps the agent execution in timing, error handling, retries, and logging.
        """
        attempts = 0
        last_exception = None
        start_time = time.time()
        self.tool_calls = []

        total_attempts = 4  # Retry AI failures up to 3 times

        while attempts < total_attempts:
            attempts += 1
            try:
                logger.info(f"[ADK] Running Agent: {self.name} (Attempt {attempts}/{total_attempts})")

                res = await self._execute(input_data, **kwargs)

                # Treat return dictionary with "error" key as an AI failure and retry
                if isinstance(res, dict) and "error" in res:
                    err_msg = res["error"]
                    logger.warning(f"[ADK] Agent {self.name} returned error on attempt {attempts}: {err_msg}")
                    if attempts < total_attempts:
                        backoff = 2 ** (attempts - 1)
                        logger.info(f"[ADK] Backoff: sleeping {backoff}s before retry...")
                        await asyncio.sleep(backoff)
                        continue

                    duration = time.time() - start_time
                    from backend.agents.evaluation_manager import get_evaluation_manager
                    get_evaluation_manager().record_agent_run(
                        agent_name=self.name, duration=duration,
                        status="FAILED", error=err_msg, tool_calls=self.tool_calls
                    )
                    return res

                duration = time.time() - start_time
                logger.info(f"[ADK] Agent: {self.name} | Duration: {duration:.2f}s | Status: SUCCESS")

                from backend.agents.evaluation_manager import get_evaluation_manager
                get_evaluation_manager().record_agent_run(
                    agent_name=self.name, duration=duration,
                    status="SUCCESS", tool_calls=self.tool_calls
                )
                return res

            except Exception as e:
                logger.exception(f"[ADK] Agent {self.name} failed on attempt {attempts}: {e}")
                last_exception = e
                if attempts < total_attempts:
                    backoff = 2 ** (attempts - 1)
                    logger.info(f"[ADK] Backoff: sleeping {backoff}s before retry...")
                    await asyncio.sleep(backoff)
                    continue

        duration = time.time() - start_time
        logger.error(f"[ADK] Agent: {self.name} failed after {total_attempts} attempts. Duration: {duration:.2f}s")

        from backend.agents.evaluation_manager import get_evaluation_manager
        get_evaluation_manager().record_agent_run(
            agent_name=self.name, duration=duration,
            status="FAILED", error=str(last_exception), tool_calls=self.tool_calls
        )

        if last_exception:
            raise last_exception
        return {"error": "Maximum retries reached with unknown error"}

    async def _execute(self, input_data: dict, **kwargs) -> dict:
        raise NotImplementedError("Subclasses must implement _execute")

    async def call_tool(self, tool_name: str, **kwargs):
        """
        Resolves a tool from the registry, validates its input, runs it,
        and records the tool execution details for observability.
        """
        from backend.agents.tool_registry import get_tool_registry
        tool = get_tool_registry().get_tool(tool_name)
        if not tool:
            raise ValueError(f"Tool '{tool_name}' not found in registry")

        tool.validate_input(**kwargs)
        tool_start = time.time()
        try:
            res = await tool.execute(**kwargs)
            tool_dur = time.time() - tool_start
            self.track_tool_call(tool_name, kwargs, success=True, duration=tool_dur)
            return res
        except Exception as e:
            tool_dur = time.time() - tool_start
            self.track_tool_call(tool_name, kwargs, success=False, result=str(e), duration=tool_dur)
            raise e

    def track_tool_call(self, tool_name: str, args: dict, success: bool = True, result: any = None, duration: float = 0.0):
        clean_args = {}
        for k, v in args.items():
            if isinstance(v, str) and len(v) > 200:
                clean_args[k] = v[:200] + "... (truncated)"
            elif isinstance(v, dict) and len(v) > 5:
                clean_args[k] = f"Dict with {len(v)} keys"
            else:
                clean_args[k] = v

        self.tool_calls.append({
            "tool": tool_name,
            "args": clean_args,
            "success": success,
            "result": str(result) if result is not None else None,
            "duration": round(duration, 3),
            "timestamp": time.time()
        })
