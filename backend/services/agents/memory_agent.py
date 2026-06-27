import os
import json
import time
import logging
from pathlib import Path
from backend.services.vector_db.chroma_service import ChromaService

logger = logging.getLogger("backend.agents.memory")

MEMORY_DIR = Path(__file__).parent.parent.parent / "data" / "user_memory"

class MemoryAgent:
    """
    Manages loading, updating, scoring, and retrieving user design preferences,
    blending statistical frequency tracking with ChromaDB semantic memory.
    """
    
    def __init__(self):
        MEMORY_DIR.mkdir(parents=True, exist_ok=True)
        self.vector_db = ChromaService.get_instance()
        
    def _get_user_file(self, user_id: str) -> Path:
        clean_id = user_id.replace("@", "_").replace(".", "_") if user_id else "default_user"
        return MEMORY_DIR / f"{clean_id}.json"
        
    def load_user_memory(self, user_id: str) -> dict:
        file_path = self._get_user_file(user_id)
        if not file_path.exists():
            return {
                "userId": user_id or "default_user",
                "preferences": {
                    "theme": {},
                    "style": {},
                    "borderRadius": {},
                    "spacing": {},
                    "favoriteColors": {},
                    "preferredLayouts": {},
                    "commonComponents": {}
                },
                "history": [],
                "settings": {
                    "enabled": True
                }
            }
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                if "settings" not in data:
                    data["settings"] = {"enabled": True}
                if "preferences" not in data:
                    data["preferences"] = {}
                return data
        except Exception as e:
            logger.error(f"Error loading user memory for {user_id}: {e}")
            return {}

    def save_user_memory(self, user_id: str, memory_data: dict):
        file_path = self._get_user_file(user_id)
        try:
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(memory_data, f, indent=2)
        except Exception as e:
            logger.error(f"Error saving user memory for {user_id}: {e}")

    def get_memory_preferences(self, user_id: str, current_prompt: str = "") -> dict:
        """Resolves preferences by combining statistical frequency and semantic memory."""
        memory = self.load_user_memory(user_id)
        if not memory.get("settings", {}).get("enabled", True):
            logger.info("Personalization disabled in user memory.")
            return {}
            
        prefs = memory.get("preferences", {})
        resolved = {}
        
        # 1. Base Resolution: Statistical frequencies
        def get_top_key(pref_dict):
            if not pref_dict:
                return None
            sorted_keys = sorted(pref_dict.items(), key=lambda x: x[1], reverse=True)
            return sorted_keys[0][0]
            
        for key in ["theme", "style", "borderRadius", "spacing"]:
            top = get_top_key(prefs.get(key, {}))
            if top:
                resolved[key] = top
                
        top_color = get_top_key(prefs.get("favoriteColors", {}))
        if top_color:
            resolved["primaryColor"] = top_color
            
        top_layout = get_top_key(prefs.get("preferredLayouts", {}))
        if top_layout:
            resolved["layoutPattern"] = top_layout
            
        comp_counts = prefs.get("commonComponents", {})
        sorted_comps = sorted(comp_counts.items(), key=lambda x: x[1], reverse=True)
        resolved["commonComponents"] = [c[0] for c in sorted_comps[:3]]
        
        # 2. Semantic overlay: Query past user preferences semantically
        semantic_matches = []
        if self.vector_db.enabled and current_prompt:
            logger.info(f"Querying semantic user_memory for user {user_id} with: '{current_prompt}'")
            db_res = self.vector_db.query_similarity("user_memory", current_prompt, top_k=2)
            
            for match in db_res:
                meta = match.get("metadata", {})
                # Filter matches by user_id
                if meta.get("userId") == user_id:
                    semantic_matches.append({
                        "prompt": meta.get("prompt"),
                        "style": meta.get("style"),
                        "theme": meta.get("theme"),
                        "primaryColor": meta.get("primaryColor"),
                        "score": match.get("similarity_score")
                    })
                    
        # Apply semantic override if match score is high (> 60% similarity)
        if semantic_matches:
            best_semantic = semantic_matches[0]
            if best_semantic["score"] > 0.60:
                logger.info(f"Semantic match found in history ({best_semantic['score'] * 100}%). Overlaying preferences.")
                if best_semantic.get("style"):
                    resolved["style"] = best_semantic["style"]
                if best_semantic.get("theme"):
                    resolved["theme"] = best_semantic["theme"]
                if best_semantic.get("primaryColor"):
                    resolved["primaryColor"] = best_semantic["primaryColor"]
                    
        resolved["semanticMatches"] = semantic_matches
        logger.info(f"Final hybrid user personalization details: {resolved}")
        return resolved

    def update_preferences(self, user_id: str, prompt: str, design_plan: dict):
        """Extracts stats and saves semantic logs inside ChromaDB collection user_memory."""
        memory = self.load_user_memory(user_id)
        prefs = memory.get("preferences", {})
        
        def increment_pref(pref_dict, value):
            if not value:
                return
            val_str = str(value).lower()
            pref_dict[val_str] = pref_dict.get(val_str, 0) + 1
            
        spacing = design_plan.get("design_rules", {}).get("spacing") or design_plan.get("spacing")
        borderRadius = design_plan.get("design_rules", {}).get("borderRadius") or design_plan.get("borderRadius")
        increment_pref(prefs.setdefault("spacing", {}), spacing)
        increment_pref(prefs.setdefault("borderRadius", {}), borderRadius)
        
        style = design_plan.get("design_archetype")
        increment_pref(prefs.setdefault("style", {}), style)
        
        theme = design_plan.get("aesthetic")
        theme_val = "dark"
        if theme:
            theme_val = "dark" if "dark" in theme.lower() else "light"
            increment_pref(prefs.setdefault("theme", {}), theme_val)
            
        color = design_plan.get("primary_color") or design_plan.get("styling", {}).get("primary_color")
        increment_pref(prefs.setdefault("favoriteColors", {}), color)
        
        layout = design_plan.get("layout_notes") or design_plan.get("layoutPattern")
        increment_pref(prefs.setdefault("preferredLayouts", {}), layout)
        
        sections = design_plan.get("sections", [])
        comp_dict = prefs.setdefault("commonComponents", {})
        for sec in sections:
            increment_pref(comp_dict, sec)
            
        history = memory.setdefault("history", [])
        history.append({
            "prompt": prompt,
            "style": style,
            "theme": theme,
            "primaryColor": color
        })
        memory["history"] = history[-10:]
        
        # Save standard counts to JSON file
        self.save_user_memory(user_id, memory)
        
        # Save semantic entry to ChromaDB collection user_memory
        if self.vector_db.enabled:
            summary_text = (
                f"User prefers design choices for prompt: '{prompt}'. Visual style is {style}, "
                f"theme set to {theme_val} (aesthetic: {theme}), spacing: {spacing}, "
                f"accent highlights: {color}, layout choices: {layout}."
            )
            entry_id = f"mem-{user_id}-{int(time.time())}"
            metadata = {
                "userId": user_id,
                "prompt": prompt,
                "style": style or "modern",
                "theme": theme_val,
                "primaryColor": color or "violet"
            }
            self.vector_db.add_entry(
                collection_name="user_memory",
                entry_id=entry_id,
                text=summary_text,
                metadata=metadata
            )
            logger.info("Saved semantic preference memory to vector db.")

async def run_memory_retrieval(user_id: str, current_prompt: str = "") -> dict:
    agent = MemoryAgent()
    return agent.get_memory_preferences(user_id, current_prompt)

def update_user_memory(user_id: str, prompt: str, design_plan: dict):
    agent = MemoryAgent()
    agent.update_preferences(user_id, prompt, design_plan)
