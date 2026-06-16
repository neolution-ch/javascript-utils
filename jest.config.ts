import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  coverageProvider: "v8",
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
