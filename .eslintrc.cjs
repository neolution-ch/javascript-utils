module.exports = {
  settings: {},
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "import", "jest"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: ["tsconfig.json"],
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  ignorePatterns: ["dist", "cypress"],
  globals: {},
  rules: {
    // Enforce double quotes
    quotes: [
      "error",
      "double",
      {
        avoidEscape: true,
      },
    ],
    // Prefer string interpolation
    "prefer-template": "error",
    "max-lines": [
      "error",
      {
        max: 200,
      },
    ],
    complexity: [
      "error",
      {
        max: 12,
      },
    ],
    "prefer-destructuring": "error",
    "no-empty-function": "error",
    "arrow-body-style": ["error", "as-needed"],
  },
};
