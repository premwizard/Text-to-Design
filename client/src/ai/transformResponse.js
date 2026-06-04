/**
 * Helper to attempt recovery of malformed JSON strings,
 * which may have missing braces or markdown tags.
 */
export function parseAndRecoverJSON(rawString) {
  if (typeof rawString !== 'string') return rawString;
  
  let cleaned = rawString.trim();
  
  // Remove markdown JSON code blocks if present
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.substring(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.substring(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.substring(0, cleaned.length - 3);
  }
  
  cleaned = cleaned.trim();
  
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    // Attempt recovery on string
    const match = cleaned.match(/\{[\s\S]*\}/);
    // Count open/close curly braces
    const openBraces = (cleaned.match(/\{/g) || []).length;
    const closeBraces = (cleaned.match(/\}/g) || []).length;
    
    if (openBraces > closeBraces) {
      cleaned += '}'.repeat(openBraces - closeBraces);
    }
    
    // Count open/close square brackets
    const openBrackets = (cleaned.match(/\[/g) || []).length;
    const closeBrackets = (cleaned.match(/\]/g) || []).length;
    
    if (openBrackets > closeBrackets) {
      cleaned += ']'.repeat(openBrackets - closeBrackets);
    }
    
    try {
      return JSON.parse(cleaned);
    } catch (e2) {
      console.error('JSON recovery failed:', e2);
      throw e; // throw original parse error
    }
  }
}

// Stable string hash function
const getStringHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

/**
 * Transforms, cleans, and normalizes validated AI response payloads.
 * Ensures consistent naming of parameters and structure.
 * Implements deterministic design layout randomization.
 */
export function transformResponse(apiResponse) {
  let parsed = apiResponse;
  
  if (typeof apiResponse === 'string') {
    parsed = parseAndRecoverJSON(apiResponse);
  }
  
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Invalid response structure. Expected JSON object.');
  }

  // Create hash seed based on prompt text or components content to make design stable yet unique
  const componentsString = JSON.stringify(parsed.components || []);
  const seed = getStringHash(componentsString + (parsed.page || ''));

  const themeList = ['modern', 'minimal', 'startup', 'glassmorphism', 'bold', 'luxury'];
  const paletteList = ['blue-purple', 'orange-red', 'emerald-cyan', 'black-gold', 'pastel', 'monochrome'];
  const radiusList = ['none', 'md', 'lg', 'xl', '2xl'];
  const spacingList = ['compact', 'comfortable', 'spacious'];

  // Extract or deterministically generate design tokens
  const design = {
    theme: parsed.design?.theme || parsed.designSystem?.theme || themeList[seed % themeList.length],
    palette: parsed.design?.palette || parsed.designSystem?.palette || paletteList[(seed >> 2) % paletteList.length],
    borderRadius: parsed.design?.borderRadius || parsed.designSystem?.borderRadius || radiusList[(seed >> 4) % radiusList.length],
    spacing: parsed.design?.spacing || parsed.designSystem?.spacing || spacingList[(seed >> 6) % spacingList.length],
    font: parsed.design?.font || parsed.designSystem?.typography?.font || (parsed.design?.theme === 'luxury' || parsed.designSystem?.theme === 'luxury' ? 'Playfair Display' : 'Inter'),
    mood: parsed.design?.mood || parsed.designSystem?.mood || parsed.layoutStrategy?.uiStyle || 'default',
    ...parsed.design,
    ...parsed.designSystem
  };

  const components = (parsed.components || []).map((comp, index) => {
    // Normalization of component keys and types
    const rawType = comp.type ? String(comp.type).toLowerCase().trim() : 'hero';
    const typeMapping = {
      'nav': 'navbar',
      'navbar': 'navbar',
      'hero': 'hero',
      'features': 'features',
      'feature': 'features',
      'pricing': 'pricing',
      'testimonials': 'testimonials',
      'testimonial': 'testimonials',
      'feedback': 'testimonials',
      'faq': 'faq',
      'cta': 'cta',
      'footer': 'footer',
      'cards': 'cards',
      'card': 'cards',
      'stats': 'stats',
      'stat': 'stats',
      'dashboard-stat': 'stats',
      'form': 'form',
      'contact': 'form',
      'contact-form': 'form',
      'contactform': 'form'
    };
    const type = typeMapping[rawType] || rawType;
    const id = comp.id || `${type}-${index + 1}`;
    
    // Available visual layout variants per component type
    const variantsMap = {
      hero: ['centered', 'split-image', 'gradient', 'image-left', 'image-right'],
      features: ['grid', 'list', 'alternating-rows'],
      pricing: ['cards', 'highlight-popular', 'minimal-table'],
      testimonials: ['grid', 'rows', 'carousel'],
      navbar: ['standard', 'sticky', 'centered'],
      faq: ['accordion', 'list'],
      cta: ['standard', 'gradient', 'minimal'],
      footer: ['simple', 'grid-columns', 'centered-logo']
    };

    // Assign layout variant deterministically if not explicitly set by the AI
    const allowedVariants = variantsMap[type] || [];
    const variant = comp.variant || (allowedVariants.length > 0 ? allowedVariants[(seed + index) % allowedVariants.length] : 'centered');
    
    const props = comp.props || comp.content || {};
    const content = comp.content || comp.props || {};

    const style = {
      theme: comp.style?.theme || 'auto',
      align: comp.style?.align || 'left',
      padding: comp.style?.padding || 'medium'
    };

    const layout = {
      desktop: comp.layout?.desktop || 'flex',
      tablet: comp.layout?.tablet || 'flex',
      mobile: comp.layout?.mobile || 'stack'
    };

    const animation = {
      type: comp.animation?.type || 'none',
      duration: typeof comp.animation?.duration === 'number' ? comp.animation.duration : 0
    };

    const image = {
      url: comp.image?.url || '',
      alt: comp.image?.alt || ''
    };

    const actions = Array.isArray(comp.actions) ? comp.actions.map(act => ({
      type: act?.type || 'navigate',
      target: act?.target || ''
    })) : [];

    const children = Array.isArray(comp.children) ? comp.children : [];

    return {
      ...comp,
      id,
      type,
      variant,
      props,
      content,
      style,
      layout,
      animation,
      image,
      actions,
      children
    };
  });

  return {
    page: parsed.page || 'landing',
    design,
    components
  };
}
