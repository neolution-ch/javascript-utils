import neolutionEslintConfig from "@neolution-ch/eslint-config-neolution";
import jestPlugin from "eslint-plugin-jest";

export default [
  ...neolutionEslintConfig.configs.flat.typescript,
  jestPlugin.configs["flat/recommended"],
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
