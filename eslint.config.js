import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"

export default [
  // Ignorar pasta de build
  { ignores: ["dist"] },

  // ✅ Override para arquivos de configuração CommonJS
  {
    files: ["**/*config.js", "**/*.config.js"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "script", // ← Necessário para module.exports
      globals: globals.node,
    },
  },

  // ✅ Configuração principal para arquivos React
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module", // ← Necessário para import/export
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
]
