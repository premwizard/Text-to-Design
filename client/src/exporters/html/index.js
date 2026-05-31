/**
 * Foundation exporter for static HTML with CDN Tailwind support.
 */
export function exportToHtml(pageData) {
  if (!pageData || !Array.isArray(pageData.components)) {
    return '<!-- No components to export -->';
  }

  const componentBlocks = [];

  pageData.components.forEach((comp) => {
    const content = comp.props || {};
    const title = content.title || content.logo || 'Section';
    const subtitle = content.subtitle || '';
    
    componentBlocks.push(`
    <!-- Section: ${comp.type} -->
    <section class="py-16 px-8 rounded-3xl border border-slate-800 bg-slate-900 text-slate-100 shadow-xl max-w-6xl mx-auto my-8">
      <h2 class="text-3xl font-bold text-center">${title}</h2>
      ${subtitle ? `<p class="mt-4 text-center text-slate-400 max-w-2xl mx-auto">${subtitle}</p>` : ''}
    </section>
    `);
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Page</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen py-10">
  <div class="space-y-8">
    ${componentBlocks.join('\n')}
  </div>
</body>
</html>
`;
}
