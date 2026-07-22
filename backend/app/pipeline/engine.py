import logging
from backend.app.pipeline.models import DesignContext
from backend.app.pipeline.stages.intent_detection import IntentDetector
from backend.app.pipeline.stages.requirement_extraction import RequirementExtractor
from backend.app.pipeline.stages.design_planning import DesignPlanner
from backend.app.pipeline.stages.theme_planning import ThemePlanner
from backend.app.pipeline.stages.layout_planning import LayoutPlanner
from backend.app.pipeline.stages.component_planning import ComponentPlanner
from backend.app.pipeline.stages.code_generation import StaticWebsiteGenerator

logger = logging.getLogger(__name__)

class PipelineEngine:
    def __init__(self):
        self.intent_detector = IntentDetector()
        self.requirement_extractor = RequirementExtractor()
        self.design_planner = DesignPlanner()
        self.theme_planner = ThemePlanner()
        self.layout_planner = LayoutPlanner()
        self.component_planner = ComponentPlanner()
        self.code_generator = StaticWebsiteGenerator()
        
    async def process_prompt(self, prompt: str, event_callback=None) -> DesignContext:
        """
        Runs Phase 1, Phase 2, Phase 3, and Phase 4 of the pipeline.
        """
        logger.info(f"Starting new pipeline execution for prompt: {prompt[:50]}...")
        
        async def _trigger_event(step_name: str, agent_name: str, message: str):
            if event_callback:
                await event_callback({"type": "timeline", "step": step_name})
                await event_callback({"type": "agent_start", "agent": agent_name, "message": message})
        
        context = DesignContext(prompt=prompt)
        
        # Phase 1: Understanding
        await _trigger_event("Understanding Intent", "understanding", "Detecting user intent and extracting requirements...")
        context = await self.intent_detector.process(context)
        context = await self.requirement_extractor.process(context)
        if event_callback:
            await event_callback({"type": "agent_complete", "agent": "understanding", "output": {"status": "success"}})
        logger.info("Phase 1 complete.")
        
        # Phase 2: Design Strategy
        await _trigger_event("Planning Design Strategy", "planning", "Planning structural components and visual theme...")
        context = await self.design_planner.process(context)
        context = await self.theme_planner.process(context)
        if event_callback:
            await event_callback({"type": "agent_complete", "agent": "planning", "output": {"status": "success"}})
        logger.info("Phase 2 complete.")

        # Phase 3: Layout Architecture
        await _trigger_event("Architecting Layout", "layout", "Constructing component hierarchy and responsive layout...")
        context = await self.layout_planner.process(context)
        context = await self.component_planner.process(context)
        if event_callback:
            await event_callback({"type": "agent_complete", "agent": "layout", "output": {"status": "success"}})
        logger.info("Phase 3 complete.")
        
        # Phase 4: Code Generation
        await _trigger_event("Generating Code", "generator", "Generating production-ready HTML, CSS and Vanilla JavaScript...")
        context = await self.code_generator.process(context)
        if event_callback:
            await event_callback({"type": "agent_complete", "agent": "generator", "output": {"status": "success"}})
        logger.info("Phase 4 complete. Pipeline finished.")
        return context
