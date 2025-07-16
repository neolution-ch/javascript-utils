import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import terser from "@rollup/plugin-terser";
import typescript from "rollup-plugin-typescript2";
import { defineConfig, InputPluginOption } from "rollup";
import { type Plugin } from "rollup";
import * as fs from "fs";

const input = "src/index.ts";

const cleanDist: Plugin = {
  name: "cleanDist",
  /**
   * Remove some unwanted files from the dist folder before creating the bundle
   */
  writeBundle() {
    fs.rmSync("./dist/rollup.config.d.ts", { force: true });
    fs.rmSync("./dist/jest.config.d.ts", { force: true });
    fs.rmSync("./dist/eslint.config.d.ts", { force: true });
  },
};

const plugins = [
  external({
    includeDependencies: true,
  }) as InputPluginOption,
  typescript({
    clean: true,
    exclude: ["**/__tests__", "**/*.test.ts", "**/stories/**/*", "**/coverage"],
  }),
  commonjs({
    include: /\/node_modules\//,
  }),
  nodeResolve(),
  terser({
    output: { comments: false },
    compress: {
      drop_console: true,
    },
  }),
  cleanDist,
];

export default defineConfig([
  {
    input,
    output: {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true,
      exports: "named",
      interop: "auto",
    },
    plugins,
  },
  {
    input,
    output: {
      file: "dist/index.modern.js",
      format: "esm",
      sourcemap: true,
      exports: "named",
    },
    plugins,
  },
]);
