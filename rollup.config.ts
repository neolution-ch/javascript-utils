import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "rollup-plugin-typescript2";
import { defineConfig } from "rollup";
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
  typescript({
    clean: true,
    exclude: ["**/__tests__", "**/*.test.ts", "**/stories/**/*", "**/coverage"],
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
  {
    input,
    output: {
      file: "dist/index.umd.js",
      format: "umd",
      name: "JavaScriptUtilities",
      sourcemap: true,
      exports: "named",
    },
    plugins,
  },
]);
