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
    '@typescript-eslint/ban-types': 'off',
    'linebreak-style': 0,
    'operator-linebreak': 'off',
    'no-use-before-define': ['error', { variables: false }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      },
    ],
    'default-param-last': 'off',
    'arrow-body-style': 'off',
    'import/no-duplicates': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-confusing-arrow': 'off',
    'implicit-arrow-linebreak': 'off',
    'dot-notation': 'off',
    'prefer-const': 'off',
    'object-curly-newline': 'off',
    'no-shadow': 'off',
    'nonblock-statement-body-position': 'off',
    'import/prefer-default-export': 'off',
    'no-else-return': 'off',
    'quote-props': 'off',
    'no-var-requires': 'off',
    'no-nested-ternary': 'off',
    indent: 'off',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
