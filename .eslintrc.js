// eslint-disable-next-line
module.exports = {
  root: true,
  ecmaFeatures: {
    tsx: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'on' : 'warn',
    'react/prop-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  env: {
    node: true,
  },
  ignorePatterns: ['build/**/*.js', 'node_modules/**/*', '**/*.html'],
}
