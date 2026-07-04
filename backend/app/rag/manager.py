import logging
from pathlib import Path
from typing import List
from langchain_community.vectorstores import Chroma
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter

from backend.app.utils.env import get_env

logger = logging.getLogger("backend.app.rag")
BASE_DIR = Path(__file__).parent
DOCS_DIR = BASE_DIR / "docs"
PERSIST_DIR = BASE_DIR / "chroma_store"
COLLECTION_NAME = "ui_design_components"


def _load_documents() -> List[Document]:
    documents: List[Document] = []
    for path in sorted(DOCS_DIR.glob("*.txt")):
        content = path.read_text(encoding="utf-8").strip()
        if not content:
            continue
        documents.append(Document(page_content=content, metadata={"source": path.name}))
    return documents


def _create_embeddings() -> None:
    # RAG embeddings are currently disabled as OpenAI was removed.
    # Return None or implement an alternative embedding model here.
    return None


def _build_store(embeddings) -> Chroma:
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
