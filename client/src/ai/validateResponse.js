import { PageSchema, BaseComponentSchema } from '../schemas/commonSchema';
import { componentRegistry } from '../registry/componentRegistry';

/**
 * Validates the raw JSON payload returned by the AI response.
 * Uses Zod schemas to ensure type-safety.
 * If a component is structurally valid but has invalid props, it will fallback to its defaultProps.
 */
export function validateResponse(data) {
  if (!data || typeof data !== 'object') {
    return {
      success: false,
      errors: [{ message: 'Input data is not an object' }],
      data: null
    };
  }

  // 1. Validate top-level layout wrapper
  const topLevelResult = PageSchema.safeParse(data);
  if (!topLevelResult.success) {
    console.error('Validation failed for top-level page configuration:', topLevelResult.error.format());
    return {
      success: false,
      errors: topLevelResult.error.errors,
      data: null
    };
  }

  const validatedData = topLevelResult.data;
  const validatedComponents = [];
  const componentErrors = [];

  // 2. Validate individual section/component configurations
  if (Array.isArray(data.components)) {
    data.components.forEach((comp, idx) => {
      if (!comp || typeof comp !== 'object') return;

      // Pre-normalize component type casing and ensure ID exists before validation
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
      const typeKey = typeMapping[rawType] || rawType;

      const normalizedComp = {
        ...comp,
        type: typeKey,
        id: comp.id || `${typeKey}-${idx + 1}`
      };

      const baseResult = BaseComponentSchema.safeParse(normalizedComp);
      if (!baseResult.success) {
        componentErrors.push({ index: idx, type: comp?.type || 'unknown', errors: baseResult.error.errors });
        return;
      }

      const parsedComp = baseResult.data;
      const registryEntry = componentRegistry[typeKey];

      if (!registryEntry) {
        componentErrors.push({ index: idx, type: parsedComp.type, errors: [{ message: `Component type "${parsedComp.type}" is unsupported.` }] });
        return;
      }

      // Check component specific props/content validation
      const propsToValidate = parsedComp.props || parsedComp.content || {};
      const componentSchema = registryEntry.schema;
      const propsResult = componentSchema.safeParse(propsToValidate);

      if (!propsResult.success) {
        // Salvage: keep the component structure but apply registry defaults
        parsedComp.props = { ...registryEntry.defaultProps };
        parsedComp.content = parsedComp.props;
        validatedComponents.push(parsedComp);
        
        componentErrors.push({ 
          index: idx, 
          type: parsedComp.type, 
          errors: propsResult.error.errors, 
          salvaged: true 
        });
      } else {
        // Validation succeeded
        parsedComp.props = propsResult.data;
        parsedComp.content = propsResult.data;
        validatedComponents.push(parsedComp);
      }
    });
  }

  return {
    success: validatedComponents.length > 0,
    errors: componentErrors,
    data: {
      ...validatedData,
      components: validatedComponents
    }
  };
}
