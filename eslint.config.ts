import tsPlugin from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";
import prettierPlugin from "eslint-plugin-prettier";
import tsEslint from "typescript-eslint";
import prettierRecommended from 'eslint-plugin-prettier/recommended';

const config = tsEslint.config([
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      ...prettierRecommended.rules,
      ...tsPlugin.configs?.recommended?.rules,
      "import/extensions": [
        "error",
        {
          ts: "always",
          js: "never",
        },
      ],
      "indent": ["error", 4, { "ignoredNodes": ["PropertyDefinition"] }],
    },
  },
]);


export default config;
