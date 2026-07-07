import logging
from backend.app.pipeline.models import DesignContext
from backend.app.pipeline.stages.intent_detection import IntentDetector
from backend.app.pipeline.stages.requirement_extraction import RequirementExtractor
from backend.app.pipeline.stages.design_planning import DesignPlanner
from backend.app.pipeline.stages.theme_planning import ThemePlanner
from backend.app.pipeline.stages.layout_planning import LayoutPlanner
from backend.app.pipeline.stages.component_planning import ComponentPlanner
from backend.app.pipeline.stages.code_generation import CodeGenerator

logger = logging.getLogger(__name__)

class PipelineEngine:
    def __init__(self):
        self.intent_detector = IntentDetector()
        self.requirement_extractor = RequirementExtractor()
        self.design_planner = DesignPlanner()
        self.theme_planner = ThemePlanner()
        self.layout_planner = LayoutPlanner()
        self.component_planner = ComponentPlanner()
        self.code_generator = CodeGenerator()
        
    async def process_prompt(self, prompt: str) -> DesignContext:
        """
        Runs Phase 1, Phase 2, Phase 3, and Phase 4 of the pipeline.
        """
        logger.info(f"Starting new pipeline execution for prompt: {prompt[:50]}...")
        
        context = DesignContext(prompt=prompt)
        
        # Phase 1a: Intent Detection
        context = await self.intent_detector.process(context)
        
        # Phase 1b: Requirement Extraction
        context = await self.requirement_extractor.process(context)
        
        logger.info("Phase 1 complete.")
        
        # Phase 2a: Design Planning
        context = await self.design_planner.process(context)
        
        # Phase 2b: Theme Planning
        context = await self.theme_planner.process(context)
        
        logger.info("Phase 2 complete.")

        # Phase 3a: Layout Planning
        context = await self.layout_planner.process(context)
        
        # Phase 3b: Component Planning
        context = await self.component_planner.process(context)
        
        logger.info("Phase 3 complete.")
        
        # Phase 4: Code Generation
        context = await self.code_generator.process(context)
        
        logger.info("Phase 4 complete. Pipeline finished.")
        return context
