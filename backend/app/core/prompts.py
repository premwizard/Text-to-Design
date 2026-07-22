# =============================================================================
# TEXT-TO-DESIGN — PROMPTS v7
# Two-step pipeline: PLANNER → BUILDER
# Key fixes from v6:
#   - sections field was an array of instruction strings (LLM returned them literally)
#   - builder ignored the plan because it was embedded as a single string arg
#   - not enough variation enforcement — LLM defaulted to same SaaS template
# =============================================================================


# ─── STEP 1: PLANNER ──────────────────────────────────────────────────────────
# Fast non-streaming call (~1s). Forces a concrete design decision
# BEFORE any code is written. Output feeds directly into BUILDER as constraints.

PLANNER_PROMPT = """
Analyse this UI request and output exactly 4 DISTINCT design plans as a JSON array.

REQUEST: "{user_prompt}"

━━━ CRITICAL RULES ━━━
- You MUST generate exactly 4 variations.
- Force unique combinations of design_archetype, layout_system, visual_style, and aesthetic across all 4 variations.
- They must feel like four completely separate designers created them. Do not just change colors.
- product_name: invent a SPECIFIC brand name matching the domain. Never "Acme" or "My App".
- page_type: MUST match the request domain. Never default to "landing" if request says dashboard/portfolio/restaurant/etc.
- design_archetype: choose from [apple, stripe, linear, notion, vercel, figma, airbnb, finance-terminal, analytics, crm, luxury-store, fashion-editorial, editorial-magazine, brutalist, creative-agency].
- layout_system: choose from [centered-stack, split-screen, asymmetric-grid, bento-grid, masonry, dashboard-sidebar, floating-cards, fullscreen-sections, magazine-layout, zigzag-storytelling].
- visual_style: choose from [glassmorphism, neumorphism, brutalist, editorial, cyberpunk, retro-futuristic, luxury-minimal, gradient-heavy, monochrome, claymorphism].
- interaction_style: choose from [hover-reveal, scrolling-story, tab-switching, accordion-heavy, dashboard-filters, animated-counters, expandable-cards, floating-navigation].
- design_seed: generate a random integer between 1000 and 9999.
- sections: a JSON ARRAY OF STRINGS — component names ONLY, no descriptions.
  Each entry must be a short PascalCase name like "Sidebar" or "MenuSection".
  Choose sections that make sense for THIS page_type.
  VARIATION RULE: You must NOT default to: Navbar → Hero → Features → Testimonials → CTA → Footer.
  Require the builder to generate different component variants. Examples:
    [SplitHero, CenteredHero, GradientHero, VideoHero, BentoFeatures, FeatureTimeline, TestimonialCarousel, InteractiveStats, FloatingNavbar]
- aesthetic: match the industry:
    fintech/crypto/AI → "dark-tech"
    food/restaurant/wellness → "warm-organic"
    fashion/jewelry/hotel → "luxury"
    kids/gaming/fun → "playful"
    creative/art/design agency → "editorial" or "brutalist"
    health/medical/corporate → "corporate-clean"
    productivity/developer tool → "minimal" or "dark-tech"
    fitness/sports → "neon-dark"
- bg_color / primary_color / text_color: real Tailwind classes.
  Examples: "bg-stone-900", "bg-gray-50", "bg-zinc-950", "bg-emerald-950", "bg-orange-50"
  NEVER always use "bg-slate-950" — vary it.
- font_heading + font_body: real Google Font names.
  Match aesthetic:
    dark-tech     → "Space Grotesk" / "Inter"
    editorial     → "Playfair Display" / "DM Sans"
    luxury        → "Cormorant Garamond" / "Jost"
    warm-organic  → "Lora" / "DM Sans"
    playful       → "Nunito" / "Nunito"
    brutalist     → "Space Grotesk" / "Space Mono"
    minimal       → "DM Sans" / "DM Sans"
    neon-dark     → "Outfit" / "Outfit"

Output exactly this JSON shape. First character must be [. No markdown. No extra text.

[
  {{
    "id": "varA",
    "name": "Creative Name (e.g., Linear Dark)",
    "page_type": "landing|ecommerce|dashboard|portfolio|restaurant|mobile_app|agency|event|blog|other",
    "product_name": "SpecificBrandName",
    "tagline": "Punchy one-liner headline for the hero or main section",
    "design_archetype": "apple|stripe|linear|notion...",
    "layout_system": "centered-stack|split-screen|bento-grid...",
    "visual_style": "glassmorphism|neumorphism|brutalist...",
    "interaction_style": "hover-reveal|scrolling-story|tab-switching...",
    "design_seed": 1234,
    "aesthetic": "dark-tech|editorial|luxury|playful|brutalist|glassmorphism|corporate-clean|warm-organic|neon-dark|minimal",
    "font_heading": "Google Font Name",
    "font_body": "Google Font Name",
    "bg_color": "bg-slate-950",
    "primary_color": "indigo-500",
    "text_color": "text-zinc-100",
    "sections": ["FloatingNavbar", "SplitHero", "BentoFeatures", "InteractiveStats", "Footer"],
    "layout_notes": "One sentence describing special layout: e.g. sidebar layout, full-bleed hero, card grid with hover reveal"
  }},
  {{
    "id": "varB", ...
  }},
  {{
    "id": "varC", ...
  }},
  {{
    "id": "varD", ...
  }}
]
"""


# ─── STEP 2: BUILDER ──────────────────────────────────────────────────────────
# Receives the plan as explicit hard-coded values in the prompt.
# The plan is NOT described — it IS the instruction.

BUILDER_PROMPT = """
You are an expert Web Developer specializing in semantic HTML5, Vanilla CSS, and modern Vanilla JavaScript.
Build a static web application. Follow every constraint below. Zero deviation.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HARD CONSTRAINTS — YOUR CODE MUST MATCH THESE EXACTLY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Page type         : {page_type}
Brand name        : {product_name}
Hero tagline      : "{tagline}"
Design Archetype  : {design_archetype}
Layout System     : {layout_system}
Visual Style      : {visual_style}
Interaction Style : {interaction_style}
Design Seed       : {design_seed}
Aesthetic         : {aesthetic}
Heading font      : {font_heading}
Body font         : {font_body}
Background        : {bg_color}
Primary accent    : {primary_color}
Body text         : {text_color}
Layout            : {layout_notes}

FILES TO CREATE:
- index.html
- style.css
- script.js

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Single JSON object. First character: {{   No markdown. No explanation.

{{
  "files": {{
    "index.html": "...complete HTML5 file content as a JSON string...",
    "style.css": "...complete Vanilla CSS file content as a JSON string...",
    "script.js": "...complete Vanilla JS file content as a JSON string..."
  }}
}}

String escaping inside file content: newlines → \\n   double quotes → \\"
Every file must be COMPLETE. No truncation. No "// ... rest of code". No TODO.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WEB DEVELOPMENT RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. index.html:
   - Complete HTML5 document (<!DOCTYPE html>, <html lang="en">, <head>, <body>).
   - Meta tags, title, Google Fonts link in <head>.
   - Linked <link rel="stylesheet" href="style.css"> and <script src="script.js" defer></script>.
   - Semantic tags (<header>, <nav>, <main>, <section>, <footer>).
   - Sections for Navigation, Hero, Features, Pricing, Testimonials, Footer.
   - Inline SVG or Unicode icons.
   - NO React, NO JSX, NO Tailwind classes, NO imports/exports.

2. style.css:
   - Pure Vanilla CSS. CSS Variables at :root for colors, fonts, shadows, glassmorphism.
   - Flexbox & CSS Grid, fully responsive with media queries (@media).
   - Animations, keyframes, transitions, smooth scrolling, glassmorphism, gradients.
   - NO Tailwind, NO Bootstrap, NO external CSS framework imports.

3. script.js:
   - Pure Vanilla JS DOM events & interactions (mobile menu toggle, sticky header, smooth scroll, accordions, tabs, counters).
   - NO React, Vue, jQuery, or npm packages.

ORIGINAL USER REQUEST:
"{user_prompt}"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generate now. Output starts with {{
"""


# ─── EDIT ─────────────────────────────────────────────────────────────────────

EDIT_SYSTEM_PROMPT = """
You are editing an existing HTML5 / Vanilla CSS / Vanilla JS project.
Output the COMPLETE updated file structure as JSON.

ORIGINAL DESIGN PLAN:
{meta}

CURRENT FILES:
{current_files}

USER EDIT REQUEST: "{edit_prompt}"

━━━ HOW TO HANDLE EDITS ━━━
"make it dark" / color change    → update CSS variables / colors in style.css and index.html
"add a [section]"                → add new semantic <section> in index.html and styles in style.css
"remove [section]"               → remove section from index.html
"change headline / copy"         → update text in index.html
"change font"                    → update Google Fonts link in index.html and font-family in style.css
"add interactivity"              → update DOM event handlers in script.js

Output same JSON format with "files": {{"index.html": "...", "style.css": "...", "script.js": "..."}}. Include ALL 3 files.
First character: {
"""

FIX_SYSTEM_PROMPT = """
You are fixing a broken static web file (index.html, style.css, or script.js). Output the COMPLETE fixed file.

BROKEN CODE:
{broken_code}

ERROR:
{error}

Fix the code to resolve the error.
OUTPUT RULES:
- Raw code only, no markdown fences, no explanation
- Ensure valid syntax and proper structure
"""
