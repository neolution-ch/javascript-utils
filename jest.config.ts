import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  resetMocks: false,
  setupFiles: ["jest-localstorage-mock"],
  collectCoverage: true,
  coverageReporters: ["text", "html", "cobertura"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};

export default config;
