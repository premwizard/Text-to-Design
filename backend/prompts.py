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
You are an expert React + Tailwind CSS developer.
Build a Vite + React project. Follow every constraint below. Zero deviation.

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
Heading font      : {font_heading}  ← use this for all h1/h2/h3
Body font         : {font_body}     ← use this for all body text
Background        : {bg_color}      ← outermost div className
Primary accent    : {primary_color} ← buttons, links, highlights
Body text         : {text_color}    ← default text color
Layout            : {layout_notes}

FILES TO CREATE (one component per file, in this order):
{sections_numbered}

DO NOT add extra sections. DO NOT skip any section. Build exactly these files.
Force different spacing systems, card styles, content hierarchy, section ordering, and visual composition based on the requested Design Archetype, Layout System, and Visual Style. Build the exact component variants specified (e.g. SplitHero, BentoFeatures).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Single JSON object. First character: {{   No markdown. No explanation.

{{
  "files": {{
    "App.jsx": "...complete file content as a JSON string...",
    "components/ComponentName.jsx": "...complete file content...",
    "components/ComponentName2.jsx": "..."
  }}
}}

String escaping inside file content: newlines → \\n   double quotes → \\"
Every file must be COMPLETE. No truncation. No "// ... rest of code". No TODO.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REACT RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Normal imports — this is a real Vite project:
   import React, {{ useState, useEffect, useRef }} from 'react'
   import {{ ArrowRight, Star, Check, Menu, X }} from 'lucide-react'
   import Hero from './components/Hero'

✅ Normal export default:
   export default function ComponentName() {{ ... }}

✅ App.jsx MUST:
   1. Import every component from the sections list above
   2. Render them in order inside one root div
   3. Apply fonts via a <style> tag at the top of the return:
      <style>{{`
        @import url('https://fonts.googleapis.com/css2?family={font_heading_url}:wght@300;400;500;600;700;800&family={font_body_url}:wght@300;400;500;600&display=swap');
        body {{ font-family: '{font_body}', sans-serif; }}
        h1, h2, h3, h4, h5, h6 {{ font-family: '{font_heading}', sans-serif; }}
      `}}</style>
   4. Set root background: <div className="{bg_color} min-h-screen {text_color}">

✅ Colors: use {primary_color} for buttons and accents throughout.
   Examples: bg-{primary_color}, text-{primary_color}, border-{primary_color}

✅ Content: use "{product_name}" as the brand. Use realistic domain-specific copy.
   Real prices. Real feature names. Real team names. Real metric numbers.
   NOT: "Feature 1", "Lorem ipsum", "Item 1", "John Doe"

✅ Interactivity: useState for mobile menu toggle, tabs, accordion, counters.
   Every button/link has: hover:opacity-90 transition-all duration-200 cursor-pointer

✅ Responsive: sm: md: lg: xl: breakpoints. Mobile-first.

✅ Every .map() call has a key prop on the root element.

DO NOT USE:
  ❌ CSS files or CSS modules
  ❌ React Router, Link, useNavigate, BrowserRouter
  ❌ fetch(), axios, useQuery, or any data fetching
  ❌ framer-motion, gsap, recharts, chart.js, d3
  ❌ next/image, next/link, or anything from next
  ❌ Any npm package except: react, react-dom, lucide-react, tailwindcss

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRITICAL OUTPUT CONTRACT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Every file content must begin directly with:
import ...
or
export ...

Never generate:
<!-- -->
### headings
File:
Filename:
markdown fences
explanations

If generated, regenerate the file. Nothing may appear before the first import or export statement in any file.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ORIGINAL USER REQUEST (for content/copy inspiration):
"{user_prompt}"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generate now. Output starts with {{
"""


# ─── EDIT ─────────────────────────────────────────────────────────────────────

EDIT_SYSTEM_PROMPT = """
You are editing an existing React + Tailwind project.
Output the COMPLETE updated file structure as JSON.

ORIGINAL DESIGN PLAN:
{meta}

CURRENT FILES:
{current_files}

USER EDIT REQUEST: "{edit_prompt}"

━━━ HOW TO HANDLE EDITS ━━━
"make it dark" / color change    → update bg/text/border classes in ALL files
"add a [section]"                → create new components/X.jsx + add to App.jsx
"remove [section]"               → delete component AND remove from App.jsx
"change headline / copy"         → update text in the relevant component only
"change font"                    → update @import and font-family in App.jsx
"more minimal / bolder / bigger" → update spacing, typography, weight across files
"add interactivity"              → add useState + event handlers

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRITICAL OUTPUT CONTRACT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Every file content must begin directly with:
import ...
or
export ...

Never generate:
<!-- -->
### headings
File:
Filename:
markdown fences
explanations

If generated, regenerate the file. Nothing may appear before the first import or export statement in any file.

Output same JSON format. Include ALL files (changed and unchanged).
First character: {
"""

FIX_SYSTEM_PROMPT = """
You are fixing a broken React sandbox component. Output the COMPLETE fixed file.

BROKEN CODE:
{broken_code}

ERROR:
{error}

DIAGNOSE AND FIX:

If error contains "window.LucideReact" or icon is undefined:
  → Move icon destructuring to TOP of file: const {{ ArrowRight }} = LucideReact;
  → Remove "window." prefix everywhere

If error contains "export default function":
  → Change to two-line form:
      function GeneratedPage() {{ ... }}
      export default GeneratedPage;

If error contains "import" or "Cannot use import":
  → Delete every import statement in the file

If error contains "is not defined":
  → If it's a Lucide icon: add it to const {{ X }} = LucideReact; at top
  → If it's a library (framer-motion, axios, etc.): remove all usage of it

If error contains "Objects are not valid as a React child":
  → Find where an object is rendered directly; render .property or JSON.stringify()

If error contains "style" prop:
  → Find style="..." string attributes and convert to style={{{{...}}}} objects

If error contains "Each child in a list":
  → Add key={{item.id || index}} to every .map() root element

OUTPUT RULES:
- Raw code only, no markdown fences, no explanation
- First character = first character of actual code
- File order: icon destructure → data consts → sub-components → GeneratedPage → export default GeneratedPage
"""
