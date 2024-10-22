// rollup.config.js
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { babel } = require('@rollup/plugin-babel');
const terser = require('@rollup/plugin-terser');
const css = require('rollup-plugin-css-only');

module.exports = [
  // UMD Build (for browsers)
  {
    input: 'src/whiskr.js',
    output: {
      file: 'dist/whiskr.umd.js',
      format: 'umd',
      name: 'Whiskr',
      sourcemap: true,
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      css({ output: 'whiskr.css' }),
      babel({ babelHelpers: 'bundled' }),
      terser(),
    ],
  },
  // ES Module Build
  {
    input: 'src/whiskr.js',
    output: {
      file: 'dist/whiskr.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      css({ output: false }),
      babel({ babelHelpers: 'bundled' }),
      terser(),
    ],
  },
];
