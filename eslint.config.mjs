import eslint from "@eslint/js";
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reacthooks from 'eslint-plugin-react-hooks';
import globals from "globals";
import prettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    // 1. Core ESLint Configuration
  {
    // Ignores common build/config files
    ignores: [
      'dist/',
      'build/',
      'node_modules/',
      '*.config.{js,cjs,mjs}',
    ],
  },

  // 2. JavaScript (ESLint Recommended)
  eslint.configs.recommended,

  // 3. TypeScript Configuration
  ...tseslint.configs.recommended,

  // 3a. TypeScript Parser Configuration for Source Files
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
  },

  // 3b. TypeScript Parser Configuration for Config Files
  {
    files: ['*.config.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.node.json',
      },
    },
  },

  // 4. React Configuration
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react
    },
    settings: {
      react: {
        version: 'detect', // Auto-detect React version
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      'react/no-unescaped-entities': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off', // TypeScript handles prop types
    },
  },

  // 5. React Hooks Configuration
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react-hooks': reacthooks
    },
    rules: {
      ...reacthooks.configs.recommended.rules,
    },
  },

  // 6. Global Environment Setup
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  prettier
];

