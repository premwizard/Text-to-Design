import re
import os

filepath = 'backend/project_runner.py'
with open(filepath, 'r', encoding='utf-8') as f:
    code = f.read()

# Replace def write_files(files: dict[str, str]) -> list[str]:
# with def write_files(files: dict[str, str], variation_id: str = None) -> list[str]:
code = code.replace("def write_files(files: dict[str, str]) -> list[str]:", "def write_files(files: dict[str, str], variation_id: str = None) -> list[str]:")

# Update dest logic
dest_logic_old = """        dest = SRC_DIR / rel_path
        dest.parent.mkdir(parents=True, exist_ok=True)

        if dest.parent.name == "components":
            new_component_paths.add(dest.resolve())"""

dest_logic_new = """        base_dir = SRC_DIR / variation_id if variation_id else SRC_DIR
        dest = base_dir / rel_path
        dest.parent.mkdir(parents=True, exist_ok=True)

        if dest.parent.name == "components":
            new_component_paths.add(dest.resolve())"""

code = code.replace(dest_logic_old, dest_logic_new)

# Update stale components cleanup logic
stale_cleanup_old = """    # 3. Clean up stale components (files in components/ that weren't generated)
    components_dir = SRC_DIR / "components"
    if components_dir.exists():
        for existing_file in components_dir.glob("*.jsx"):
            if existing_file.resolve() not in new_component_paths:
                try:
                    existing_file.unlink()
                    print(f"Deleted stale component: {existing_file.name}")
                except Exception as e:
                    print(f"Failed to delete stale component {existing_file.name}: {e}")"""

stale_cleanup_new = """    # 3. Clean up stale components (files in components/ that weren't generated)
    components_dir = (SRC_DIR / variation_id / "components") if variation_id else (SRC_DIR / "components")
    if components_dir.exists():
        for existing_file in components_dir.glob("*.jsx"):
            if existing_file.resolve() not in new_component_paths:
                try:
                    existing_file.unlink()
                    print(f"Deleted stale component: {existing_file.name}")
                except Exception as e:
                    print(f"Failed to delete stale component {existing_file.name}: {e}")
                    
    # 3.5. If variation_id is provided, ensure entry points exist
    if variation_id:
        import shutil
        var_dir = SRC_DIR / variation_id
        for boilerplate in ["main.jsx", "index.css", "ErrorBoundary.jsx"]:
            src_file = SRC_DIR / boilerplate
            dst_file = var_dir / boilerplate
            if src_file.exists() and not dst_file.exists():
                shutil.copy2(src_file, dst_file)
                
        # Generate varX.html in sandbox dir
        html_path = SANDBOX_DIR / f"{variation_id}.html"
        html_content = f\"\"\"<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Variation {variation_id}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/{variation_id}/main.jsx"></script>
  </body>
</html>\"\"\"
        html_path.write_text(html_content, encoding="utf-8")"""

code = code.replace(stale_cleanup_old, stale_cleanup_new)

# Replace app_path logging to check the correct App.jsx
app_path_old = """    # STEP 7: Read sandbox/src/App.jsx back from disk and print first 10 lines
    app_path = SRC_DIR / "App.jsx\""""
app_path_new = """    # STEP 7: Read sandbox/src/App.jsx back from disk and print first 10 lines
    app_path = (SRC_DIR / variation_id / "App.jsx") if variation_id else (SRC_DIR / "App.jsx")"""
code = code.replace(app_path_old, app_path_new)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(code)
    
print("Updated project_runner.py")

# ALSO update generate_ui.py to pass variation_id to save_files
filepath_ui = 'backend/routes/generate_ui.py'
with open(filepath_ui, 'r', encoding='utf-8') as f:
    code_ui = f.read()

# Update SaveFilesRequest
req_old = """class SaveFilesRequest(BaseModel):
    files: dict[str, str]"""
req_new = """class SaveFilesRequest(BaseModel):
    files: dict[str, str]
    variation_id: Optional[str] = None"""

code_ui = code_ui.replace(req_old, req_new)

# Update save_files endpoint
save_old = """        # Clean every file after receiving/parsing JSON
        cleaned_files = {k: cleanGeneratedCode(v) for k, v in request.files.items()}
        write_files(cleaned_files)"""

save_new = """        # Clean every file after receiving/parsing JSON
        cleaned_files = {k: cleanGeneratedCode(v) for k, v in request.files.items()}
        write_files(cleaned_files, variation_id=request.variation_id)"""

code_ui = code_ui.replace(save_old, save_new)

with open(filepath_ui, 'w', encoding='utf-8') as f:
    f.write(code_ui)
print("Updated generate_ui.py save_files endpoint")
