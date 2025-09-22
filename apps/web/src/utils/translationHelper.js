// Simple template string replacement for translations
export const interpolateTranslation = (template, variables = {}) => {
  if (!template || typeof template !== 'string') {
    return template;
  }
  
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key] !== undefined ? variables[key] : match;
  });
};
