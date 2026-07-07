from typing import List, Optional
from pydantic import BaseModel, Field

class UserIntent(BaseModel):
    primary_industry: str = Field(description="The industry or domain of the requested design (e.g., 'e-commerce', 'portfolio', 'saas', 'blog').")
    page_type: str = Field(description="The specific type of page requested (e.g., 'landing page', 'dashboard', 'pricing page').")
    theme: str = Field(description="The general aesthetic or theme (e.g., 'minimalist', 'dark mode', 'playful').")

class ExtractedRequirements(BaseModel):
    explicit_colors: List[str] = Field(default_factory=list, description="Any specific colors mentioned by the user.")
    required_sections: List[str] = Field(default_factory=list, description="Specific sections explicitly requested (e.g., 'navbar', 'hero', 'testimonials').")
    special_features: List[str] = Field(default_factory=list, description="Any unique features or interactions requested (e.g., 'parallax scrolling', 'carousel').")
    brand_name: Optional[str] = Field(default=None, description="The name of the brand or product if mentioned.")

class DesignPlan(BaseModel):
    product_name: str = Field(description="The generated or requested name of the product.")
    tagline: str = Field(description="A short, catchy tagline for the product.")
    layout_archetype: str = Field(description="The primary layout structure (e.g., 'centered-stack', 'left-sidebar', 'bento-grid').")
    content_flow: List[str] = Field(description="The high-level content sections in order (e.g., ['Hero', 'Features', 'Testimonials', 'Footer']).")

class ThemePlan(BaseModel):
    font_heading: str = Field(description="The font family for headings (e.g., 'Inter', 'Space Grotesk').")
    font_body: str = Field(description="The font family for body text (e.g., 'Roboto', 'Inter').")
    primary_color: str = Field(description="The primary brand color (e.g., 'indigo-500', '#3b82f6').")
    secondary_color: str = Field(description="The secondary brand color.")
    bg_color: str = Field(description="The main background color (e.g., 'bg-white', 'bg-slate-950').")
    text_color: str = Field(description="The main text color (e.g., 'text-slate-900', 'text-slate-50').")
    visual_style: str = Field(description="The visual aesthetic (e.g., 'glassmorphism', 'flat', 'neumorphism', 'brutalism').")

class ComponentSpec(BaseModel):
    name: str = Field(description="PascalCase name of the component (e.g., 'HeroSection')")
    role: str = Field(description="The primary purpose of this component in the layout.")
    assets_needed: List[str] = Field(default_factory=list, description="Any images, icons, or placeholders required.")

class LayoutPlan(BaseModel):
    navbar: str = Field(description="'top', 'side', or 'none'")
    sidebar: str = Field(description="'left', 'right', or 'none'")
    grid_system: str = Field(description="High level grid structure (e.g., '12-column CSS grid', 'flex-column stack')")
    spacing_rules: str = Field(description="Spacing strategy (e.g., 'spacious', 'compact')")

class ComponentPlan(BaseModel):
    components: List[ComponentSpec] = Field(description="Detailed list of all components to be built.")
    global_assets: List[str] = Field(default_factory=list, description="Global assets needed (e.g. logos).")

class DesignContext(BaseModel):
    prompt: str = Field(description="The original user prompt.")
    intent: Optional[UserIntent] = Field(default=None, description="The parsed user intent.")
    requirements: Optional[ExtractedRequirements] = Field(default=None, description="The explicitly extracted requirements.")
    
    design_plan: Optional[DesignPlan] = Field(default=None, description="The structural design blueprint.")
    theme_plan: Optional[ThemePlan] = Field(default=None, description="The visual theme and styling choices.")
    
    layout_plan: Optional[LayoutPlan] = Field(default=None, description="The detailed layout and grid strategy.")
    component_plan: Optional[ComponentPlan] = Field(default=None, description="The exact component specifications.")
