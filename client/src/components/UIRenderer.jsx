import React, { Suspense } from 'react';
import { componentRegistry, resolveVariant } from '../registry/componentRegistry';
import { DesignSystemProvider, useDesignSystem } from '../context/DesignSystemContext';
import BackgroundDecorator from './BackgroundDecorator';

// Simple fallback skeleton shown while component lazy-loads
function SectionSkeleton() {
  return (
    <div className="animate-pulse flex flex-col space-y-4 p-8 rounded-[var(--radius)] border border-[var(--secondary)]/20 bg-[var(--surface)]" style={{ minHeight: '240px' }}>
      <div className="h-6 bg-[var(--text)]/20 rounded w-1/4"></div>
      <div className="h-4 bg-[var(--text)]/15 rounded w-2/3"></div>
      <div className="h-24 bg-[var(--text)]/10 rounded mt-4"></div>
    </div>
  );
}

// React Error Boundary to prevent crashes in case of runtime rendering errors
class ComponentErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Component rendering failed:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 rounded-[var(--radius)] border border-rose-500/20 bg-rose-500/5 text-rose-350">
          <p className="font-semibold text-sm">Failed to render section: "{this.props.type}"</p>
          <p className="text-xs mt-2 text-slate-400 font-mono">{this.state.error?.message || 'Runtime exception occurred'}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Responsive layout mapper
const getLayoutClass = (layout) => {
  if (!layout) return 'flex flex-col gap-8';
  
  let classes = '';

  // Mobile layout defaults
  if (layout.mobile) {
    if (layout.mobile.startsWith('grid-')) {
      const cols = layout.mobile.split('-')[1];
      classes += ` grid grid-cols-${cols} gap-4`;
    } else if (layout.mobile === 'flex' || layout.mobile === 'row') {
      classes += ' flex flex-row items-center justify-between gap-4';
    } else {
      classes += ' flex flex-col gap-4';
    }
  } else {
    classes += ' flex flex-col gap-4';
  }
  
  // Tablet layout overrides
  if (layout.tablet) {
    if (layout.tablet.startsWith('grid-')) {
      const cols = layout.tablet.split('-')[1];
      classes += ` md:grid md:grid-cols-${cols} md:gap-6`;
    } else if (layout.tablet === 'flex' || layout.tablet === 'row') {
      classes += ' md:flex-row md:items-center md:justify-between md:gap-6';
    } else if (layout.tablet === 'stack' || layout.tablet === 'column') {
      classes += ' md:flex-col md:gap-6';
    }
  }
  
  // Desktop layout overrides
  if (layout.desktop) {
    if (layout.desktop.startsWith('grid-')) {
      const cols = layout.desktop.split('-')[1];
      classes += ` lg:grid lg:grid-cols-${cols} lg:gap-8`;
    } else if (layout.desktop === 'flex' || layout.desktop === 'row') {
      classes += ' lg:flex-row lg:items-center lg:justify-between lg:gap-8';
    } else if (layout.desktop === 'stack' || layout.desktop === 'column') {
      classes += ' lg:flex-col lg:gap-8';
    }
  }
  
  return classes;
};

// Internal rendering component executing inside the context provider
function RenderedComponents({ components = [], designSystem = {} }) {
  const { theme, spacingClass, cssVars } = useDesignSystem();

  return (
    <div 
      className={`flex flex-col p-4 sm:p-8 rounded-[1.75rem] transition-colors duration-300 bg-[var(--background)] text-[var(--text)] ${spacingClass.gap}`}
      style={{
        ...cssVars,
        fontFamily: 'var(--font), sans-serif'
      }}
    >
      {components.map((component, index) => {
        const typeKey = String(component.type || '').toLowerCase();
        const registryEntry = componentRegistry[typeKey];

        if (!registryEntry) {
          return (
            <div
              key={component.id || index}
              className="p-6 rounded-[var(--radius)] border border-amber-500/20 bg-amber-500/5 text-amber-350"
            >
              <p className="font-semibold text-sm">Skipped Unknown Component: "{component.type || 'unspecified'}"</p>
              <p className="text-xs mt-1 text-slate-400">The component layout definition does not exist in the registry.</p>
            </div>
          );
        }

        // Resolve variant
        let resolvedVariant = component.variant;
        if (!resolvedVariant) {
          resolvedVariant = resolveVariant(typeKey, designSystem);
        }

        // Fetch corresponding variant renderer, fallback to default renderer
        const Component = (registryEntry.variants && registryEntry.variants[resolvedVariant]) || registryEntry.renderer;
        const props = component.props || {};
        const style = component.style || {};
        const layout = component.layout || {};

        const layoutClass = getLayoutClass(layout);

        // Alternate layouts using visual background rhythm decorators
        const isAlternating = theme.design.alternatingBg && index % 2 === 1;
        const bgType = index % 3 === 0 ? 'dots' : (index % 3 === 1 ? 'grid' : 'gradient');

        return (
          <ComponentErrorBoundary key={component.id || index} type={component.type}>
            <Suspense fallback={<SectionSkeleton />}>
              <div 
                className={`relative w-full overflow-hidden transition-all duration-300 ${spacingClass.padding} ${
                  isAlternating 
                    ? 'bg-transparent border border-transparent' 
                    : 'bg-[var(--surface)] border border-[var(--secondary)]/10 rounded-[var(--radius)] shadow-lg'
                }`}
                style={{
                  fontFamily: 'var(--font), sans-serif'
                }}
              >
                {/* Grid, dot or mesh background visual engine patterns */}
                {isAlternating && <BackgroundDecorator type={bgType} />}

                <div className={`relative z-10 max-w-7xl mx-auto ${layoutClass}`}>
                  <Component 
                    {...props} 
                    variant={resolvedVariant} 
                    style={style} 
                  />
                </div>
              </div>
            </Suspense>
          </ComponentErrorBoundary>
        );
      })}
    </div>
  );
}

function UIRenderer({ data, onAction }) {
  if (!data || !Array.isArray(data.components) || data.components.length === 0) {
    return (
      <div className="p-8 rounded-[1.75rem] bg-slate-100 dark:bg-slate-900/50 text-slate-500 text-center border border-dashed border-slate-350 dark:border-slate-800" style={{ minHeight: '160px' }}>
        <p className="text-base font-medium">No UI components have been loaded.</p>
        <p className="text-xs text-slate-400 mt-2">Submit a request to generate and render visual layouts.</p>
      </div>
    );
  }

  // Supply Design System Context tokens to all sections
  return (
    <DesignSystemProvider metadata={data.design || {}} onAction={onAction}>
      <RenderedComponents components={data.components} designSystem={data.design || {}} />
    </DesignSystemProvider>
  );
}

export default UIRenderer;
