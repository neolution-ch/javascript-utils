import neolutionEslintConfig from "@neolution-ch/eslint-config-neolution";

export default [...neolutionEslintConfig.configs.flat.typescript, { rules: { "unicorn/no-null": "off" } }];
