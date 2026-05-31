/**
 * Foundation exporter for React/JSX code generation from page layouts.
 */
export function exportToReact(pageData) {
  if (!pageData || !Array.isArray(pageData.components)) {
    return '// No components to export';
  }

  const componentImports = new Set();
  const componentBlocks = [];

  pageData.components.forEach((comp) => {
    // Capitalize type name to form valid React component identifiers
    const typeClean = String(comp.type).toLowerCase();
    const componentName = typeClean.charAt(0).toUpperCase() + typeClean.slice(1);
    componentImports.add(componentName);

    const propsStr = Object.entries(comp.props || {})
      .map(([key, val]) => `${key}={${JSON.stringify(val)}}`)
      .join(' ');

    componentBlocks.push(`      <${componentName} ${propsStr} />`);
  });

  const importsList = Array.from(componentImports)
    .map((name) => `import ${name} from './components/${name}';`)
    .join('\n');

  return `import React from 'react';
${importsList}

export default function ExportedPage() {
  return (
    <div className="space-y-8 min-h-screen bg-slate-950 text-slate-100 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
${componentBlocks.join('\n')}
      </div>
    </div>
  );
}
`;
}
