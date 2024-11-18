import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.browser,
    },
    rules: {
      "semi": ["error", "always"],       // Enforces semicolons
      "indent": ["error", 2],            // Enforces 2-space indentation
      "no-trailing-spaces": "error",             // Disallows trailing spaces
      "space-before-function-paren": ["error", "never"], // Disallows space before function parentheses
      "keyword-spacing": ["error", {             // Enforces spacing around keywords
        "before": true,
        "after": true
      }],
      "object-curly-spacing": ["error", "always"], // Enforces spaces inside curly braces
      "comma-dangle": ["error", "always-multiline"], // Enforces trailing commas in multiline objects/arrays
    },
  },
];
