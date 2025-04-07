import neolutionEslintConfig from "@neolution-ch/eslint-config-neolution";

export default [
  ...neolutionEslintConfig.configs.flat.typescript,
  {
    ignores: ["**/coverage/"],
  },
  {
    ignores: ["**/*.spec.ts"],
    rules: {
      "jsdoc/require-jsdoc": [
        "error",
        {
          publicOnly: false,
          require: {
            ArrowFunctionExpression: true,
            ClassDeclaration: true,
            ClassExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: true,
            MethodDefinition: true,
          },
          contexts: [
            "ArrowFunctionExpression",
            "FunctionDeclaration",
            "FunctionExpression",
            "MethodDefinition",
            "PropertyDefinition",
            "TSDeclareFunction",
            "TSEnumDeclaration",
            "TSInterfaceDeclaration",
            "TSMethodSignature",
            "TSPropertySignature",
            "TSTypeAliasDeclaration",
          ],
          checkGetters: true,
        },
      ],
    },
  },
];
