import json
import logging
from pathlib import Path
from backend.app.repositories.chroma_service import ChromaService

logger = logging.getLogger("backend.app.agents.rag_retrieval")

# Directory containing structured design templates
KNOWLEDGE_DIR = Path(__file__).parent.parent.parent / "data" / "design_knowledge"

class RAGRetrievalAgent:
    """
    Retrieves optimal layouts, styling constraints, and structural rules 
    using a Hybrid Retrieval system (JSON attribute matching + ChromaDB semantic search).
    """
    
    def __init__(self):
        KNOWLEDGE_DIR.mkdir(parents=True, exist_ok=True)
        self.vector_db = ChromaService.get_instance()
        
    def _read_json_file(self, filename: str) -> list:
        file_path = KNOWLEDGE_DIR / filename
        if not file_path.exists():
            return []
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            logger.error(f"Error reading knowledge base file {filename}: {e}")
            return []

    def normalize_style(self, theme: str) -> str:
        t_lower = theme.lower()
        if "brutal" in t_lower:
            return "neo-brutalism"
        elif "glass" in t_lower:
            return "glassmorphism"
        elif "apple" in t_lower:
            return "apple-style"
        elif "dark" in t_lower:
            return "dark-modern"
        elif "saas" in t_lower or "premium" in t_lower:
            return "premium-saas"
        return "minimal"

    async def retrieve_design_patterns(self, intent: dict, user_prompt: str = "") -> dict:
        logger.info(f"Hybrid retrieval querying for intent: {intent}")
        
        page_type = intent.get("pageType", "landing").lower()
        theme = intent.get("theme", "premium dark")
        target_style = self.normalize_style(theme)
        
        # 1. STEP 1: Rule-Based JSON Matching (JSON Score)
        # Load entries from target templates
        patterns = []
        if page_type == "dashboard":
            patterns = self._read_json_file("dashboards.json")
        else:
            patterns = self._read_json_file("landing_pages.json")
            
        json_matches = []
        max_possible_json_score = 10.0 # Style match (5.0) + category match (3.0) + component overlap
        
        for p in patterns:
            raw_score = 0.0
            if p.get("style") == target_style:
                raw_score += 5.0
            if p.get("category") == page_type:
                raw_score += 3.0
                
            intent_components = set(intent.get("components", []))
            pattern_components = set(p.get("components", []))
            overlap = len(intent_components.intersection(pattern_components))
            raw_score += min(overlap * 1.0, 2.0)
            
            # Normalize to 0.0 - 1.0
            normalized_score = round(raw_score / max_possible_json_score, 4)
            json_matches.append({
                "id": p.get("id"),
                "category": p.get("category"),
                "style": p.get("style"),
                "layout": p.get("layout"),
                "designRules": p.get("designRules", {}),
                "score": normalized_score
            })
            
        # Sort JSON matches
        json_matches.sort(key=lambda x: x["score"], reverse=True)
        
        # 2. STEP 2: Semantic search via ChromaDB (Semantic Score)
        query_text = user_prompt if user_prompt else f"A {theme} {page_type} website for {intent.get('industry', 'general')} industry."
        semantic_matches = []
        
        if self.vector_db.enabled:
            logger.info(f"Querying ChromaDB collection 'design_knowledge' with: '{query_text}'")
            # Query top 5 matches
            db_results = self.vector_db.query_similarity("design_knowledge", query_text, top_k=5)
            
            for res in db_results:
                meta = res.get("metadata", {})
                # Skip font/color metadata rows in layout ranking, but keep them for reference
                if meta.get("category") in ["typography", "color_system"]:
                    continue
                semantic_matches.append({
                    "id": res.get("id"),
                    "category": meta.get("category"),
                    "style": meta.get("style"),
                    "layout": meta.get("layout"),
                    "score": res.get("similarity_score") # already mapped 0.0 - 1.0
                })
        else:
            logger.warning("ChromaDB vector store is disabled, skipping semantic matches.")
            
        # 3. STEP 3: Combine Scores using Weighted Formula
        # Formula: final_score = (0.4 * json_score) + (0.6 * semantic_score)
        combined_scores = {}
        
        # Initialize with JSON scores
        for jm in json_matches:
            combined_scores[jm["id"]] = {
                "id": jm["id"],
                "category": jm["category"],
                "style": jm["style"],
                "layout": jm["layout"],
                "designRules": jm["designRules"],
                "json_score": jm["score"],
                "semantic_score": 0.0,
                "final_score": round(0.4 * jm["score"], 4)
            }
            
        # Merge with Semantic scores
        for sm in semantic_matches:
            item_id = sm["id"]
            if item_id in combined_scores:
                # Merge
                entry = combined_scores[item_id]
                entry["semantic_score"] = sm["score"]
                entry["final_score"] = round((0.4 * entry["json_score"]) + (0.6 * sm["score"]), 4)
            else:
                # If only found in semantic database, find or mock rules
                all_pages = self._read_json_file("landing_pages.json") + self._read_json_file("dashboards.json")
                matching_entry = next((x for x in all_pages if x.get("id") == item_id), {})
                
                combined_scores[item_id] = {
                    "id": item_id,
                    "category": sm["category"],
                    "style": sm["style"],
                    "layout": sm["layout"],
                    "designRules": matching_entry.get("designRules", {
                        "spacing": "comfortable",
                        "borderRadius": "xl",
                        "shadow": "medium",
                        "border": "none"
                    }),
                    "json_score": 0.0,
                    "semantic_score": sm["score"],
                    "final_score": round(0.6 * sm["score"], 4)
                }
                
        # Sort combined results descending
        final_results = list(combined_scores.values())
        final_results.sort(key=lambda x: x["final_score"], reverse=True)
        
        # 4. Fetch font/color palette details semantically (top matches)
        font_heading, font_body = "Space Grotesk", "Inter"
        bg_color, primary_color, text_color = "bg-zinc-950", "violet", "text-zinc-100"
        
        if self.vector_db.enabled:
            # Query typography matches
            typo_res = self.vector_db.query_similarity("design_knowledge", f"typography fonts for {target_style}", top_k=2)
            for tr in typo_res:
                meta = tr.get("metadata", {})
                if meta.get("category") == "typography":
                    font_heading = meta.get("font_heading")
                    font_body = meta.get("font_body")
                    break
                    
            # Query color matches
            color_res = self.vector_db.query_similarity("design_knowledge", f"color system backgrounds accent for {target_style} and {theme}", top_k=2)
            for cr in color_res:
                meta = cr.get("metadata", {})
                if meta.get("category") == "color_system":
                    primary_color = meta.get("primary_color")
                    bg_color = meta.get("bg_color")
                    text_color = meta.get("text_color")
                    break
        else:
            # Static file fallback if vector db is offline
            color_systems = self._read_json_file("color_systems.json")
            matched_color = next((c for c in color_systems if c.get("style") == target_style), None)
            if matched_color:
                primary_color = matched_color.get("primary_color")
                bg_color = matched_color.get("bg_color")
                text_color = matched_color.get("text_color")
                
            typography_rules = self._read_json_file("typography.json")
            matched_typo = next((t for t in typography_rules if t.get("style") == target_style), None)
            if matched_typo:
                font_heading = matched_typo.get("font_heading")
                font_body = matched_typo.get("font_body")
                
        # Best combined match rules
        best_match = final_results[0] if final_results else {}
        design_rules = best_match.get("designRules", {
            "spacing": "comfortable",
            "borderRadius": "xl",
            "shadow": "medium",
            "border": "none"
        })
        
        # Build backward-compatible payload with hybrid results attached
        retrieved_result = {
            "styleMatched": target_style,
            "layoutPattern": best_match.get("layout", "split-hero-bento-features") if best_match else "split-hero-bento-features",
            "designRules": design_rules,
            "styling": {
                "font_heading": font_heading,
                "font_body": font_body,
                "primary_color": primary_color,
                "bg_color": bg_color,
                "text_color": text_color
            },
            "retrievedPatterns": [
                {
                    "id": fr["id"],
                    "category": fr["category"],
                    "style": fr["style"],
                    "layout": fr["layout"],
                    "similarity_score": fr["final_score"]
                }
                for fr in final_results[:3]
            ],
            # Hybrid-specific outputs
            "jsonMatches": json_matches[:3],
            "semanticMatches": semantic_matches[:3],
            "finalResults": final_results[:3]
        }
        
        logger.info(f"Hybrid retrieval finished. Top layout matched: {retrieved_result['layoutPattern']} (Final score: {best_match.get('final_score') if best_match else 0.0})")
        return retrieved_result

async def run_rag_retrieval(intent_json: dict, user_prompt: str = "") -> dict:
    agent = RAGRetrievalAgent()
    return await agent.retrieve_design_patterns(intent_json, user_prompt)
