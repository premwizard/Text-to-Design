import re

BRAND_ICON_MAP = {
    # Social & Brand icons (not in lucide-react)
    'Facebook': 'Globe',
    'Twitter': 'Share2',
    'Instagram': 'Camera',
    'Linkedin': 'Briefcase',
    'LinkedIn': 'Briefcase',
    'Youtube': 'Video',
    'YouTube': 'Video',
    'Github': 'Code2',
    'GitHub': 'Code2',
    'Google': 'Globe',
    'Slack': 'MessageSquare',
    'Discord': 'MessageSquare',
    'Figma': 'Palette',
    'TikTok': 'Video',
    # Common Lucide icon name hallucinations
    'House': 'Home',
    'CurrencyDollar': 'DollarSign',
    'CurrencyEuro': 'Euro',
    'CurrencyPound': 'PoundSterling',
    'CurrencyYen': 'Yen',
    'Chat': 'MessageSquare',
    'Chats': 'MessageSquare',
    'Envelope': 'Mail',
    'Gear': 'Settings',
    'MagnifyingGlass': 'Search',
    'TrashCan': 'Trash2',
    'PencilPaper': 'Edit',
    'Person': 'User',
    'People': 'Users',
    'PhoneCall': 'Phone',
}


def sanitize_lucide_imports(code: str) -> str:
    """
    Detects and replaces non-existent brand/hallucinated icon imports from 'lucide-react'
    with valid generic Lucide icons to prevent compilation and runtime errors.
    """
    pattern = r"import\s+\{([^}]+)\}\s+from\s+['\"]lucide-react['\"];?"

    all_replacements = {}

    def replace_imports(match):
        raw_imports = match.group(1)
        icons = [icon.strip() for icon in raw_imports.split(",") if icon.strip()]
        
        new_icons = []
        rep_map = {}

        for icon in icons:
            if icon in BRAND_ICON_MAP:
                replacement = BRAND_ICON_MAP[icon]
                rep_map[icon] = replacement
                if replacement not in new_icons:
                    new_icons.append(replacement)
            else:
                if icon not in new_icons:
                    new_icons.append(icon)

        new_import_str = f"import {{ {', '.join(new_icons)} }} from 'lucide-react';"
        return new_import_str, rep_map

    def match_sub(match):
        imp_str, rep_map = replace_imports(match)
        all_replacements.update(rep_map)
        return imp_str

    code = re.sub(pattern, match_sub, code)

    # Replace JSX usages for replaced brand icons (e.g., <Facebook -> <Globe, <House -> <Home)
    for brand_icon, replacement in all_replacements.items():
        code = re.sub(rf"<{brand_icon}(\s|>|/)", rf"<{replacement}\1", code)
        code = re.sub(rf"</{brand_icon}>", rf"</{replacement}>", code)

    return code


async def run_sanitizer(files: dict) -> dict:
    """
    Cleans AI-generated React + Tailwind files by removing markdown fences,
    normalizing line endings, removing excessive blank lines, and fixing
    malformed names and invalid icon imports or invalid CSS imports.
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

        # Remove invalid CSS imports in subcomponents (e.g., import './index.css' inside components/)
        if "/" in cleaned_name:
            code = re.sub(r"import\s+['\"].*index\.css['\"];?\n?", "", code)

        # Sanitize lucide-react brand icon imports
        if filename.endswith(".jsx") or filename.endswith(".js") or filename.endswith(".tsx"):
            code = sanitize_lucide_imports(code)

        cleaned_files[cleaned_name] = code

    return {"files": cleaned_files}


async def run_code_sanitization(files: dict) -> dict:
    """
    Wrapper for run_sanitizer that returns just the dict of files instead of {"files": cleaned_files}
    """
    res = await run_sanitizer(files)
    return res["files"]

