import os
import logging
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

logger = logging.getLogger("backend.services.vision.screenshot")

SCREENSHOT_DIR = Path(__file__).parent.parent.parent / "data" / "screenshots"

async def capture_sandbox_screenshots(variation_id: str = None) -> dict:
    """
    Captures screenshots of the live sandbox preview across desktop, tablet, and mobile.
    Saves them to the backend/data/screenshots folder in the workspace.
    """
    SCREENSHOT_DIR.mkdir(parents=True, exist_ok=True)
    
    # 1. Determine sandbox URL (checks standard client port 5173, then fallback to current FastAPI ports)
    # We will try both port 5173 (standard client dev server) and port 8001/8000 (backend servers)
    urls_to_try = [
        "http://localhost:5173/preview",
        "http://localhost:8001/preview",
        "http://localhost:8000/preview"
    ]
    
    if variation_id:
        urls_to_try = [f"{u}/{variation_id}.html" for u in urls_to_try]
        
    outputs = {
        "desktop": str((SCREENSHOT_DIR / "ui_desktop.png").resolve()).replace("\\", "/"),
        "tablet": str((SCREENSHOT_DIR / "ui_tablet.png").resolve()).replace("\\", "/"),
        "mobile": str((SCREENSHOT_DIR / "ui_mobile.png").resolve()).replace("\\", "/")
    }
    
    logger.info("Initializing Playwright screenshot capture...")
    
    async with async_playwright() as p:
        browser = None
        try:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            
            # Find working URL
            working_url = None
            for target_url in urls_to_try:
                try:
                    logger.info(f"Probing preview URL: {target_url}")
                    response = await page.goto(target_url, timeout=5000, wait_until="commit")
                    if response and response.status < 400:
                        working_url = target_url
                        logger.info(f"Connection successful to {working_url}")
                        break
                except Exception as e:
                    logger.debug(f"Target URL {target_url} unreachable: {e}")
                    
            if not working_url:
                raise ConnectionError("Could not connect to any sandbox dev server or preview endpoints.")
                
            # 2. Capture Desktop view (1280 x 800)
            logger.info("Capturing desktop screenshot (1280x800)...")
            await page.set_viewport_size({"width": 1280, "height": 800})
            # Wait for DOM root compilation/mount
            await page.wait_for_selector("#root", state="visible", timeout=7000)
            # Short sleep to let animations / layouts settle
            await asyncio.sleep(1.5)
            await page.screenshot(path=outputs["desktop"], full_page=False)
            
            # 3. Capture Tablet view (768 x 1024)
            logger.info("Capturing tablet screenshot (768x1024)...")
            await page.set_viewport_size({"width": 768, "height": 1024})
            await asyncio.sleep(0.5)
            await page.screenshot(path=outputs["tablet"], full_page=False)
            
            # 4. Capture Mobile view (375 x 667)
            logger.info("Capturing mobile screenshot (375x667)...")
            await page.set_viewport_size({"width": 375, "height": 667})
            await asyncio.sleep(0.5)
            await page.screenshot(path=outputs["mobile"], full_page=False)
            
            logger.info("Screenshots captured successfully for all viewport layouts.")
            return outputs
            
        except Exception as e:
            logger.error(f"Screenshot capture failed: {e}")
            raise e
        finally:
            if browser:
                await browser.close()
