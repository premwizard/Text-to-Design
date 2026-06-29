from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import time

from backend.logger.logger import get_logger
from backend.services.session_manager import session_manager
from backend.validators.jsx_validator import validate_generated_code

logger = get_logger()
router = APIRouter()

class PromptRequest(BaseModel):
    prompt: str

# Mocks
async def mock_generation_agent():
    return [
        {
            "filename": "PricingPlan.jsx",
            "content": "import React from 'react';\nimport { motion } from 'framer-motion';\nexport default function PricingPlan() { return <motion.div>Pricing</motion.div>; }"
        },
        {
            "filename": "Hero.jsx",
            "content": "import React from 'react';\nimport { Camera } from 'lucide-react';\nexport default function Hero() { return <div>Hero // missing closure"
        }
    ]

async def mock_repair_agent(errors, files):
    logger.info(f"Repairing {len(errors)} errors...")
    return [
        {
            "filename": "PricingPlan.jsx",
            "content": "import React from 'react';\nexport default function PricingPlan() { return <div>Pricing</div>; }"
        },
        {
            "filename": "Hero.jsx",
            "content": "import React from 'react';\nimport { Camera } from 'lucide-react';\nexport default function Hero() { return <div>Hero</div>; }"
        }
    ]

@router.post("/generate")
async def generate_ui(request: PromptRequest):
    session_id = f"session_{int(time.time())}"
    
    logger.info(f"Pipeline started for session: {session_id}")
    session_manager.create_session(session_id)
    session_manager.save_session_data(session_id, "prompt.json", {"prompt": request.prompt})
    
    try:
        # 1. Generation
        logger.info("Agent start: Generation")
        files = await mock_generation_agent()
        session_manager.save_session_data(session_id, "generated_code.json", files)
        logger.info("Agent end: Generation")
        
        # 2. Validation
        validation_result = validate_generated_code(files)
        session_manager.save_session_data(session_id, "validation_report_1.json", validation_result)
        
        # 3. Conditional Repair
        if not validation_result.get("valid"):
            logger.warning("Validation failed, triggering Repair Agent")
            
            files = await mock_repair_agent(validation_result.get("errors"), files)
            session_manager.save_session_data(session_id, "repaired_code.json", files)
            
            # Revalidate
            validation_result = validate_generated_code(files)
            session_manager.save_session_data(session_id, "validation_report_2.json", validation_result)
            
            if not validation_result.get("valid"):
                logger.error("Repair failed to fix validation errors.")
                session_manager.save_session_data(session_id, "final_status.json", {"status": "repair_failed"})
                raise HTTPException(status_code=500, detail="Failed to repair generated code")
                
        logger.info("Validation passed successfully")
        session_manager.save_session_data(session_id, "final_status.json", {"status": "success"})
        
        return {"session_id": session_id, "status": "success", "files": files}
        
    except Exception as e:
        logger.error(f"Runtime error in pipeline: {str(e)}")
        session_manager.save_session_data(session_id, "runtime_errors.json", {"error": str(e)})
        session_manager.save_session_data(session_id, "final_status.json", {"status": "runtime_error"})
        raise HTTPException(status_code=500, detail=str(e))
