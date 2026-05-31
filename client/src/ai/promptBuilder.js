export function buildPrompt(userPrompt, options = {}) {
  const {
    theme = 'dark',
    font = 'Inter',
    primaryColor = '#3b82f6',
    borderRadius = 'lg'
  } = options;

  return `
User Request: ${userPrompt}

Design Preference Overrides:
- theme: ${theme}
- font: ${font}
- primaryColor: ${primaryColor}
- borderRadius: ${borderRadius}

Generate the layout JSON following the defined layout structures. Do not return any explanatory text.
`;
}
