const { dependencies: { react: reactVersion } } = require('./package');

module.exports = {
  plugins: ['react'],
  extends: [
    'airbnb-base',
    'plugin:react/recommended',
  ],
  env: {
    browser: true,
    es6: true,
  },
  settings: {
    react: {
      version: reactVersion,
    },
    'import/resolver': {
      node: {
        extensions: ['.jsx'],
      },
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'arrow-parens': ['error', 'always'],
    'class-methods-use-this': ['error', { 'exceptMethods': ['render'] }],
    'linebreak-style': ['error', 'unix'],
    'newline-per-chained-call': 'off',
    'no-console': 'off',
    'no-plusplus': 'off',
  },
};
