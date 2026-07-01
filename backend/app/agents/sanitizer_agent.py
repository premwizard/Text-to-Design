import re

async def run_sanitizer(files: dict) -> dict:
    """
    Cleans AI-generated React + Tailwind files by removing markdown fences,
    normalizing line endings, removing excessive blank lines, and fixing
    malformed names.
    """
    cleaned_files = {}

    for filename, code in files.items():
        if not filename:
            continue
            
        cleaned_name = filename.strip()

        code = code.replace("\r\n", "\n")
        code = re.sub(r"```[a-zA-Z]*", "", code)
        code = code.replace("```", "")
        code = re.sub(r"\n{3,}", "\n\n", code)
        code = code.strip()

        cleaned_files[cleaned_name] = code

    return {"files": cleaned_files}

async def run_code_sanitization(files: dict) -> dict:
    """
    Wrapper for run_sanitizer that returns just the dict of files instead of {"files": cleaned_files}
    """
    res = await run_sanitizer(files)
    return res["files"]
