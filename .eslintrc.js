module.exports = {
  extends: ['react-app', 'airbnb-base'],
  env: {
    browser: true,
    es6: true,
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
