/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: ['en', 'ar', 'ar-MA', 'fr'],
  sourceLocale: 'en',
  catalogs: [
    {
      path: 'src/locales/{locale}/messages',
      include: ['src'],
      exclude: ['**/node_modules/**'],
    },
  ],
  format: 'po',
  formatOptions: {
    lineNumbers: false,
  },
  orderBy: 'messageId',
  pseudoLocale: 'pseudo',
  fallbackLocales: {
    'ar-MA': 'ar',
    default: 'en',
  },
  runtimeConfigModule: ['@lingui/core', 'i18n'],
};
