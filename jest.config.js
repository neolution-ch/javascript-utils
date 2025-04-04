/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
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
