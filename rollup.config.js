const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { babel } = require('@rollup/plugin-babel');
const terser = require('@rollup/plugin-terser');
const postcss = require('rollup-plugin-postcss');

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
      postcss({
        inject: 'whiskr.css',
        minimize: true,
      }),
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
      postcss({
        inject: 'whiskr.css',
        minimize: true,
      }),
      babel({ babelHelpers: 'bundled' }),
      terser(),
    ],
  },
];
