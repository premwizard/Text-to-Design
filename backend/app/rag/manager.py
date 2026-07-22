import logging
from pathlib import Path
from typing import List
try:
    from langchain_community.vectorstores import Chroma
    from langchain_core.documents import Document
    from langchain_text_splitters import RecursiveCharacterTextSplitter
    LANGCHAIN_AVAILABLE = True
except ImportError:
    LANGCHAIN_AVAILABLE = False
    Chroma = Document = RecursiveCharacterTextSplitter = None

logger = logging.getLogger("backend.app.rag")
BASE_DIR = Path(__file__).parent
DOCS_DIR = BASE_DIR / "docs"
PERSIST_DIR = BASE_DIR / "chroma_store"
COLLECTION_NAME = "ui_design_components"


def _load_documents() -> List:
    if not LANGCHAIN_AVAILABLE:
        return []
    documents = []
    for path in sorted(DOCS_DIR.glob("*.txt")):
        content = path.read_text(encoding="utf-8").strip()
        if not content:
            continue
        documents.append(Document(page_content=content, metadata={"source": path.name}))
    return documents


class LocalEmbeddingsWrapper:
    def __init__(self, model):
        self.model = model

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        return self.model.encode(texts).tolist()

    def embed_query(self, text: str) -> List[float]:
        return self.model.encode([text]).tolist()[0]


def _create_embeddings():
    from backend.app.repositories.chroma_service import ChromaService
    model = ChromaService.get_instance().model
    if not model:
        logger.warning("No embedding model available in ChromaService.")
        return None
    return LocalEmbeddingsWrapper(model)


def _build_store(embeddings):
    if not LANGCHAIN_AVAILABLE or not Chroma or not RecursiveCharacterTextSplitter:
        return None
    documents = _load_documents()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=400, chunk_overlap=50)
    chunks = text_splitter.split_documents(documents)
    store = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=str(PERSIST_DIR),
        collection_name=COLLECTION_NAME,
    )
    store.persist()
    return store


def setup_rag() -> None:
    if not LANGCHAIN_AVAILABLE:
        logger.info("LangChain/ChromaDB disabled: RAG vector store setup skipped for ultra-fast startup.")
        return
    embeddings = _create_embeddings()
    if embeddings is None:
        logger.warning("Skipping RAG setup because embeddings are unavailable")
        return

    if not PERSIST_DIR.exists() or not any(PERSIST_DIR.iterdir()):
        logger.info("Creating a new RAG vector store")
        _build_store(embeddings)
        logger.info("RAG vector store created")
    else:
        logger.info("Using existing RAG vector store")


def _get_store(embeddings) -> Chroma:
    return Chroma(
        persist_directory=str(PERSIST_DIR),
        embedding_function=embeddings,
        collection_name=COLLECTION_NAME,
    )


def retrieve_relevant_docs(query: str, top_k: int = 3) -> str:
    logger.info("Retrieving RAG documents for query")
    embeddings = _create_embeddings()
    if embeddings is None:
        logger.warning("RAG retrieval disabled because embeddings are unavailable")
        return ""

    if not PERSIST_DIR.exists() or not any(PERSIST_DIR.iterdir()):
        logger.info("Vector store is missing, rebuilding store before retrieval")
        _build_store(embeddings)

    store = _get_store(embeddings)
    retriever = store.as_retriever(search_type="similarity", search_kwargs={"k": top_k})
    docs = retriever.get_relevant_documents(query)
    return "\n\n".join(
        f"{doc.page_content.strip()}\n(source: {doc.metadata.get('source', 'unknown')})"
        for doc in docs
    )
