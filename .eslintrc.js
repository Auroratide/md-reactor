module.exports = {
  parserOptions: {
    'ecmaVersion': 2017
  },
  env: {
    'es6': true,
    'node': true
  },
  extends: ['eslint:recommended'],
  rules: {
    'indent': ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-console': 'warn',
    'dot-notation': 'error',
    'eqeqeq': ['error', 'always'],
    'no-eval': 'error',
    'no-path-concat': 'error',
    'brace-style': 'error',
    'comma-dangle': ['error', 'never'],
    'func-style': ['error', 'expression'],
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
  }
};