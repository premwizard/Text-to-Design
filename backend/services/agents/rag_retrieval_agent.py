import os
import json
import logging
from pathlib import Path

logger = logging.getLogger("backend.agents.rag_retrieval")

# Directory containing structured design templates
KNOWLEDGE_DIR = Path(__file__).parent.parent.parent / "data" / "design_knowledge"

class RAGRetrievalAgent:
    """
    Retrieves optimal layouts, styling constraints, and structural rules 
    from the structured Design Knowledge Base.
    """
    
    def __init__(self):
        # Ensure knowledge base directory exists
        KNOWLEDGE_DIR.mkdir(parents=True, exist_ok=True)
        
    def _read_json_file(self, filename: str) -> list:
        file_path = KNOWLEDGE_DIR / filename
        if not file_path.exists():
            logger.warning(f"Knowledge base file {filename} does not exist.")
            return []
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            logger.error(f"Error reading knowledge base file {filename}: {e}")
            return []

    def normalize_style(self, theme: str) -> str:
        """Normalizes a raw theme descriptor into a supported design style."""
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

    async def retrieve_design_patterns(self, intent: dict) -> dict:
        """
        Retrieves matching layout structures, design rules, colors, and font rules.
        Supports structured JSON attribute matching with fallbacks.
        
        Future vector database implementation hook:
        To scale this to millions of design patterns:
        1. Initialize Pinecone / Chroma / Weaviate client.
        2. Generate embedding of `intent` using OpenAI Embeddings:
           embeddings = OpenAIEmbeddings()
           query_vector = embeddings.embed_query(str(intent))
        3. Query vector store for nearest neighbors.
        4. Return matches.
        """
        logger.info(f"RAG agent querying knowledge base for intent: {intent}")
        
        page_type = intent.get("pageType", "landing").lower()
        theme = intent.get("theme", "premium dark")
        target_style = self.normalize_style(theme)
        
        # 1. Retrieve page category patterns
        patterns = []
        if page_type == "dashboard":
            patterns = self._read_json_file("dashboards.json")
        else:
            patterns = self._read_json_file("landing_pages.json")
            
        # 2. Score patterns based on target style match
        scored_patterns = []
        for p in patterns:
            score = 0.0
            if p.get("style") == target_style:
                score += 5.0
            if p.get("category") == page_type:
                score += 3.0
            
            # Check overlap in required components
            intent_components = set(intent.get("components", []))
            pattern_components = set(p.get("components", []))
            overlap = len(intent_components.intersection(pattern_components))
            score += overlap * 1.0
            
            scored_patterns.append((score, p))
            
        # Sort by similarity score descending
        scored_patterns.sort(key=lambda x: x[0], reverse=True)
        top_matches = [p for score, p in scored_patterns[:3]]
        
        # 3. Retrieve styling details (colors and typography) matching target style
        color_systems = self._read_json_file("color_systems.json")
        matched_color = next((c for c in color_systems if c.get("style") == target_style), None)
        if not matched_color:
            matched_color = {
                "style": target_style,
                "primary_color": "violet",
                "bg_color": "bg-slate-950",
                "text_color": "text-zinc-100"
            }
            
        typography_rules = self._read_json_file("typography.json")
        matched_typo = next((t for t in typography_rules if t.get("style") == target_style), None)
        if not matched_typo:
            matched_typo = {
                "style": target_style,
                "font_heading": "Space Grotesk",
                "font_body": "Inter"
            }
            
        # 4. Synthesize final design layout rules
        best_match = top_matches[0] if top_matches else {}
        design_rules = best_match.get("designRules", {
            "spacing": "comfortable",
            "borderRadius": "xl",
            "shadow": "medium",
            "border": "none"
        })
        
        retrieved_result = {
            "styleMatched": target_style,
            "layoutPattern": best_match.get("layout", "split-hero-bento-features"),
            "designRules": design_rules,
            "styling": {
                "font_heading": matched_typo.get("font_heading", "Space Grotesk"),
                "font_body": matched_typo.get("font_body", "Inter"),
                "primary_color": matched_color.get("primary_color", "violet"),
                "bg_color": matched_color.get("bg_color", "bg-zinc-950"),
                "text_color": matched_color.get("text_color", "text-zinc-100")
            },
            "retrievedPatterns": [
                {
                    "id": p.get("id"),
                    "category": p.get("category"),
                    "style": p.get("style"),
                    "layout": p.get("layout"),
                    "similarity_score": score
                }
                for score, p in scored_patterns[:3]
            ]
        }
        
        logger.info(f"RAG agent finished retrieval. Best matched layout: {retrieved_result['layoutPattern']}")
        return retrieved_result

async def run_rag_retrieval(intent_json: dict) -> dict:
    """Module function to execute RAG agent query."""
    agent = RAGRetrievalAgent()
    return await agent.retrieve_design_patterns(intent_json)
