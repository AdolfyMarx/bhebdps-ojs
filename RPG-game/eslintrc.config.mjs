import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default [
  {
    ignores: [
      'coverage/**',
      'dist/**',
      'node_modules/**',
      'eslintrc.config.mjs',
    ],
  },
  js.configs.recommended,
  ...compat.extends('airbnb-base/legacy'),
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-undef': 'error',
    },
  },
  {
    files: ['**/*.test.js'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        expect: 'readonly',
        test: 'readonly',
      },
    },
  },
];
