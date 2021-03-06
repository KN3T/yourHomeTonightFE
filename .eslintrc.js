/* eslint-disable no-undef */
/* eslint-env node */

module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: ['react'],
    globals: {
        window: true,
        module: true
      },
  };