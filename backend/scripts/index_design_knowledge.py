import os
import sys
import json
import logging
from pathlib import Path

# Setup path so it finds backend package correctly
sys.path.append(str(Path(__file__).parent.parent.parent))

from backend.app.repositories.chroma_service import ChromaService

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("backend.scripts.index_design_knowledge")

KNOWLEDGE_DIR = Path(__file__).parent.parent / "data" / "design_knowledge"

def index_design_knowledge():
    logger.info("Initializing vector indexing of Design Knowledge Base...")
    
    service = ChromaService.get_instance()
    if not service.enabled:
        logger.error("ChromaDB vector service is disabled. Cannot run indexing script.")
        return
        
    # Reset/clear previous collection to avoid duplicates and ensure freshness
    service.reset_collection("design_knowledge")
    
    # 1. Index Landing Pages and Dashboards layout files
    files_to_index = [
        ("landing_pages.json", "landing"),
        ("dashboards.json", "dashboard"),
        ("hero_sections.json", "hero-section"),
        ("pricing_sections.json", "pricing")
    ]
    
    for filename, cat_label in files_to_index:
        file_path = KNOWLEDGE_DIR / filename
        if not file_path.exists():
            logger.warning(f"File {filename} not found, skipping...")
            continue
            
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                entries = json.load(f)
                
            for entry in entries:
                entry_id = entry.get("id")
                style = entry.get("style", "modern")
                layout = entry.get("layout", "standard")
                rules = entry.get("designRules", {})
                components = ", ".join(entry.get("components", []))
                
                # Construct rich description for semantic vector mapping
                description = (
                    f"A beautiful {style} theme {cat_label} template featuring a {layout} layout architecture. "
                    f"Design system rules: spacing is {rules.get('spacing', 'comfortable')}, corner border radius is {rules.get('borderRadius', 'xl')}, "
                    f"shadow levels are {rules.get('shadow', 'medium')}, border configurations are {rules.get('border', 'none')}. "
                    f"Includes layout sections for: {components}."
                )
                
                metadata = {
                    "id": entry_id,
                    "category": cat_label,
                    "style": style,
                    "layout": layout,
                    "source_file": filename
                }
                
                service.add_entry(
                    collection_name="design_knowledge",
                    entry_id=entry_id,
                    text=description,
                    metadata=metadata
                )
        except Exception as e:
            logger.error(f"Error parsing design file {filename}: {e}")
            
    # 2. Index typography rules
    typo_path = KNOWLEDGE_DIR / "typography.json"
    if typo_path.exists():
        try:
            with open(typo_path, "r", encoding="utf-8") as f:
                entries = json.load(f)
            for idx, entry in enumerate(entries):
                style = entry.get("style", "modern")
                font_h = entry.get("font_heading")
                font_b = entry.get("font_body")
                notes = entry.get("notes", "")
                
                description = (
                    f"Typography font pairing rules for {style} visual style. "
                    f"Heading font family is {font_h}, body text font family is {font_b}. "
                    f"Design rules and alignment notes: {notes}."
                )
                
                entry_id = f"typo-{style}-{idx}"
                metadata = {
                    "id": entry_id,
                    "category": "typography",
                    "style": style,
                    "font_heading": font_h,
                    "font_body": font_b,
                    "source_file": "typography.json"
                }
                
                service.add_entry(
                    collection_name="design_knowledge",
                    entry_id=entry_id,
                    text=description,
                    metadata=metadata
                )
        except Exception as e:
            logger.error(f"Error indexing typography: {e}")
            
    # 3. Index color system rules
    color_path = KNOWLEDGE_DIR / "color_systems.json"
    if color_path.exists():
        try:
            with open(color_path, "r", encoding="utf-8") as f:
                entries = json.load(f)
            for idx, entry in enumerate(entries):
                style = entry.get("style", "modern")
                primary = entry.get("primary_color")
                bg = entry.get("bg_color")
                text = entry.get("text_color")
                notes = entry.get("notes", "")
                
                description = (
                    f"Color system palette configuration for {style} layouts. "
                    f"Primary highlight accent color token class is {primary}, layout body background class is {bg}, "
                    f"main text color class is {text}. Design highlight parameters: {notes}."
                )
                
                entry_id = f"color-{style}-{idx}"
                metadata = {
                    "id": entry_id,
                    "category": "color_system",
                    "style": style,
                    "primary_color": primary,
                    "bg_color": bg,
                    "text_color": text,
                    "source_file": "color_systems.json"
                }
                
                service.add_entry(
                    collection_name="design_knowledge",
                    entry_id=entry_id,
                    text=description,
                    metadata=metadata
                )
        except Exception as e:
            logger.error(f"Error indexing color systems: {e}")
            
    logger.info("Design Knowledge Base indexing successfully completed!")

if __name__ == "__main__":
    index_design_knowledge()
