import os
import time
import logging
from pathlib import Path
from typing import List, Dict, Any

logger = logging.getLogger("backend.services.vector_db.chroma")

DB_DIR = Path(__file__).parent.parent.parent / "rag" / "chroma_store_v2"

class ChromaService:
    """
    Manages local semantic embeddings and search queries across ChromaDB collections.
    """
    
    _instance = None
    
    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def __init__(self):
        self.model = None
        self.client = None
        self.enabled = False
        
        # Create storage directory
        DB_DIR.mkdir(parents=True, exist_ok=True)
        
        try:
            # 1. Load SentenceTransformer locally
            from sentence_transformers import SentenceTransformer
            logger.info("Initializing SentenceTransformer('all-MiniLM-L6-v2')...")
            self.model = SentenceTransformer('all-MiniLM-L6-v2')
            
            # 2. Initialize Chroma Client
            import chromadb
            logger.info(f"Initializing Chroma PersistentClient at {DB_DIR}")
            self.client = chromadb.PersistentClient(path=str(DB_DIR))
            self.enabled = True
            logger.info("ChromaDB vector service initialized successfully.")
            
        except Exception as e:
            logger.error(f"Failed to initialize ChromaDB vector service: {e}. Semantic features will be disabled.", exc_info=True)
            self.enabled = False

    def _get_collection(self, collection_name: str):
        if not self.enabled or not self.client:
            return None
        try:
            return self.client.get_or_create_collection(name=collection_name)
        except Exception as e:
            logger.error(f"Error accessing collection {collection_name}: {e}")
            return None

    def add_entry(self, collection_name: str, entry_id: str, text: str, metadata: Dict[str, Any] = None):
        """Generates embedding and writes text document to ChromaDB."""
        if not self.enabled or not self.model:
            return
        collection = self._get_collection(collection_name)
        if not collection:
            return
            
        try:
            embedding = self.model.encode(text).tolist()
            collection.add(
                ids=[entry_id],
                embeddings=[embedding],
                documents=[text],
                metadatas=[metadata or {}]
            )
            logger.info(f"Added entry {entry_id} to collection {collection_name}")
        except Exception as e:
            logger.error(f"Error inserting entry {entry_id} into vector db: {e}")

    def query_similarity(self, collection_name: str, query_text: str, top_k: int = 3) -> List[Dict[str, Any]]:
        """Queries collection and returns match metadata and distance scores."""
        if not self.enabled or not self.model:
            logger.warning(f"Vector search requested on {collection_name} but ChromaDB is disabled.")
            return []
            
        collection = self._get_collection(collection_name)
        if not collection:
            return []
            
        try:
            query_embedding = self.model.encode(query_text).tolist()
            results = collection.query(
                query_embeddings=[query_embedding],
                n_results=top_k
            )
            
            output = []
            if results and 'ids' in results and results['ids'] and len(results['ids'][0]) > 0:
                ids = results['ids'][0]
                docs = results['documents'][0]
                metas = results['metadatas'][0]
                distances = results['distances'][0] if 'distances' in results and results['distances'] else [0.0] * len(ids)
                
                for idx in range(len(ids)):
                    dist = distances[idx]
                    similarity = round(1.0 / (1.0 + dist), 4)
                    
                    output.append({
                        "id": ids[idx],
                        "document": docs[idx],
                        "metadata": metas[idx],
                        "similarity_score": similarity
                    })
            return output
        except Exception as e:
            logger.error(f"Error querying semantic similarity on collection {collection_name}: {e}")
            return []

    def reset_collection(self, collection_name: str):
        if not self.enabled or not self.client:
            return
        try:
            self.client.delete_collection(name=collection_name)
            logger.info(f"Deleted vector collection {collection_name}")
        except Exception as e:
            logger.error(f"Error deleting collection {collection_name}: {e}")

def save_successful_generation(prompt: str, design_plan: dict, critic_score: float):
    """Stores metadata summary of successful designs into ChromaDB successful_generations collection."""
    service = ChromaService.get_instance()
    if not service.enabled:
        return
        
    try:
        entry_id = f"gen-{int(time.time())}"
        summary = (
            f"Successfully generated UI for prompt: '{prompt}'. Visual style selected is {design_plan.get('design_archetype')}, "
            f"heading font: {design_plan.get('font_heading')}, body font: {design_plan.get('font_body')}, "
            f"colors: {design_plan.get('primary_color')} highlights with background {design_plan.get('bg_color')}. "
            f"Layout system is {design_plan.get('layout_system')}. Critic rating: {critic_score}/10."
        )
        metadata = {
            "prompt": prompt,
            "style": design_plan.get("design_archetype", "modern"),
            "theme": design_plan.get("aesthetic", "dark"),
            "critic_score": float(critic_score),
            "layout_system": design_plan.get("layout_system", "centered-stack")
        }
        service.add_entry(
            collection_name="successful_generations",
            entry_id=entry_id,
            text=summary,
            metadata=metadata
        )
        logger.info(f"Saved successful generation summary to vector db collection successful_generations.")
    except Exception as e:
        logger.error(f"Error saving successful generation: {e}")
