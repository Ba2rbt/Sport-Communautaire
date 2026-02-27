import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierPlugin from "eslint-plugin-prettier/recommended";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Prettier — doit être en dernier pour écraser les règles conflictuelles
  prettierPlugin,

  // Règles personnalisées
  {
    rules: {
      // Autorise les console.log uniquement en dev
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // React 19 — pas besoin d'importer React
      "react/react-in-jsx-scope": "off",
      // Prettier intégré comme règle ESLint
      "prettier/prettier": "warn",
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
  ]),
]);

export default eslintConfig;
