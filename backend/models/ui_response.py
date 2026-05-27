from typing import Any, Dict, List, Literal, Optional

from pydantic import BaseModel, Field


class Media(BaseModel):
    url: str = Field(..., description="URL of the image or video")
    alt: Optional[str] = Field(None, description="Alternative text for accessibility")


class Action(BaseModel):
    type: Literal["navigate", "open-modal", "submit-form"] = Field(..., description="Type of action to perform")
    target: str = Field(..., description="Target for the action (URL, modal ID, or form endpoint)")


class DesignTokens(BaseModel):
    primaryColor: str = Field(..., description="Primary theme color (hex)")
    secondaryColor: str = Field(..., description="Secondary theme color (hex)")
    borderRadius: str = Field(..., description="Global border radius (e.g., sm, md, lg, xl, full)")
    font: str = Field(..., description="Primary font family (e.g., Inter, Roboto)")


class UIComponent(BaseModel):
    id: str = Field(..., description="Unique identifier for the component")
    type: str = Field(..., description="Type of component (e.g., hero, navbar, cards, container, text)")
    variant: Optional[str] = Field(None, description="Visual variant of the component")
    style: Optional[Dict[str, Any]] = Field(None, description="Styling configuration (theme, align, padding)")
    layout: Optional[Dict[str, Any]] = Field(None, description="Layout configuration (desktop, tablet, mobile)")
    animation: Optional[Dict[str, Any]] = Field(None, description="Animation settings (type, duration)")
    image: Optional[Media] = Field(None, description="Media asset for the component")
    actions: Optional[List[Action]] = Field(None, description="Interactive actions attached to the component")
    props: Dict[str, Any] = Field(..., description="Component-specific properties")
    children: Optional[List["UIComponent"]] = Field(None, description="Nested child components for complex layouts")


class UIResponse(BaseModel):
    page: Literal["landing", "dashboard", "ecommerce", "portfolio", "blog"]
    design: DesignTokens = Field(..., description="Global design tokens and branding")
    components: List[UIComponent]


# Enable recursive model support for Pydantic V2
UIComponent.model_rebuild()
