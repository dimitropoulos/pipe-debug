module.exports = {
  extends: 'eslint-config-intense',
  parser: '@typescript-eslint/parser',
  parserOptions: { project: ['./tsconfig.eslint.json'] },
  rules: {
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    'jest/no-hooks': 'off',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
  },
};
