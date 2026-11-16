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
    // Fungsi di src/api sengaja tanpa prefix "use" (getProducts, createProduct, dst)
    // supaya tidak tertukar dengan hooks murni, jadi aturan ini dimatikan khusus folder ini.
    files: ['src/api/**/*.{ts,tsx}'],
    rules: { 'react-hooks/rules-of-hooks': 'off' },
  },
])
