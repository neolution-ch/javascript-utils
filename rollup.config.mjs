import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import terser from "@rollup/plugin-terser";
import typescript from "rollup-plugin-typescript2";

const input = "src/index.ts";

const plugins = [
  external({
    includeDependencies: true,
  }),
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
];

export default [
  {
    input,
    output: {
      file: "dist/index.js",
      format: "cjs",
      name: "JavaScriptUtilities",
      sourcemap: true,
      exports: "named",
      sourcemap: true,
      interop: "auto",
    },
    plugins,
  },
  {
    input,
    output: {
      file: "dist/index.modern.js",
      format: "esm",
      name: "JavaScriptUtilities",
      sourcemap: true,
      exports: "named",
      sourcemap: true,
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
      sourcemap: true,
    },
    plugins,
  },
];
