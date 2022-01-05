module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module',
    ecmaVersion: 2018
  },
  plugins: ['react'],
  rules: {
    indent: [0, 2, { SwitchCase: 2 }],
    semi: ['error', 'never'],
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
        avoidEscape: true
      }
    ],
    'space-before-function-paren': [
      'error',
      {
        named: 'never'
      }
    ],
    'multiline-ternary': ['off'],
    'dot-notation': 'error',
    camelcase: 'error',
    'operator-linebreak': [
      2,
      'after',
      { overrides: { '?': 'before', ':': 'before' } }
    ]
  }
}
