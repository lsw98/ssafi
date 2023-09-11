module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'linebreak-style': 0,
    'no-confusing-arrow': 'off',
    'implicit-arrow-linebreak': 'off',
    'import/prefer-default-export': 'off',
  },
};
