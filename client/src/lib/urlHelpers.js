export function normalizeUrl(rawUrl, options = {}) {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  let normalized = rawUrl.trim();
  normalized = normalized.replace(/\/+$/, '');
  if (options.stripPreview && normalized.toLowerCase().endsWith('/preview')) {
    normalized = normalized.slice(0, -'/preview'.length);
  }
  return normalized;
}

export function normalizeApiBaseUrl(rawUrl) {
  return normalizeUrl(rawUrl, { stripPreview: true });
}

export function normalizeSandboxUrl(rawUrl) {
  return normalizeUrl(rawUrl);
}
