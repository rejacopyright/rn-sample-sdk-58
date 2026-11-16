const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ['dist/*', '.expo/*'],
  },
  {
    // Functions in src/api intentionally have no "use" prefix (getProducts, createProduct, etc.)
    // so they are not confused with pure hooks, so this rule is turned off for this folder only.
    files: ['src/api/**/*.{ts,tsx}'],
    rules: { 'react-hooks/rules-of-hooks': 'off' },
  },
])
