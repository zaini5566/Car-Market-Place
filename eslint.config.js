import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import"; // ✅ Add this

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin, // ✅ Register plugin
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // ✅ Add these import rules
      "import/no-unresolved": "error",
      "import/no-extraneous-dependencies": "error",
      "import/no-mutable-exports": "error",
      "import/no-named-as-default": "warn",
      "import/no-default-export": "off",
      "import/no-deprecated": "warn",
      "import/no-case-sensitive": "error", // 🔥 THIS CATCHES YOUR PROBLEM
    },
  },
];
