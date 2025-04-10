import neolutionEslintConfig from "@neolution-ch/eslint-config-neolution";

export default [
  ...neolutionEslintConfig.configs.flat.getConfig({
    ...neolutionEslintConfig.configs.flat.defaults.typescript,
    jest: true,
    jsdocRequireJsdoc: true,
  }),
];
