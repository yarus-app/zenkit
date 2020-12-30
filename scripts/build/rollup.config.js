import path from 'path';
import del from 'rollup-plugin-delete';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import url from '@rollup/plugin-url';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

const PACKAGE_ROOT = process.cwd();
const { LERNA_PACKAGE_NAME } = process.env;
const PACKAGE_TITLE = LERNA_PACKAGE_NAME.replace(/[/@]/g, '-')
  .split('-')
  .filter(Boolean)
  .join('-')
  .toLowerCase();
const PACKAGE_NAME = PACKAGE_TITLE.split('-')
  .map((item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase())
  .join('');

const LIB_PATH = 'lib';
const PABLIC_FILE_NAME = 'public/[name].[hash][extname]';

const extensions = ['.js', '.jsx', '.mjs', '.json'];

export default async (commandLineArguments) => {
  const isDevelopment = commandLineArguments.watch;

  const PKG = await import(path.resolve(PACKAGE_ROOT, 'package.json'));

  const { name, dependencies = {}, peerDependencies = {} } = PKG;

  const external = [
    /@babel\/runtime/,
    ...Object.keys(dependencies),
    ...Object.keys(peerDependencies),
  ].map((e) => new RegExp(e));

  const getBanner = ({ extension }) => `
  /** @license ${name}
   * ${PACKAGE_TITLE}.${extension}
   *
   * Copyright © '2020' 'Yaroslav Usenko'
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */`;

  const config = {
    input: {
      [PACKAGE_TITLE]: 'src/index',
    },
    output: [
      {
        name: PACKAGE_NAME,
        dir: 'lib',
        format: 'cjs',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: PABLIC_FILE_NAME,
        banner: getBanner({ extension: 'js' }),
        exports: 'named',
      },
    ],

    plugins: [
      !isDevelopment &&
        del({
          targets: [`${LIB_PATH}/*`],
        }),
      resolve({
        extensions,
        browser: true,
        modulesOnly: true,
      }),
      commonjs({ include: /node_modules/ }),
      json(),
      url({
        fileName: PABLIC_FILE_NAME,
        sourceDir: path.join(PACKAGE_ROOT, 'src'),
      }),
      babel({
        extensions,
        rootMode: 'upward',
        babelHelpers: 'runtime',
        exclude: /node_modules/,
        sourceMap: true,
        minified: true,
      }),
      !isDevelopment &&
        terser({
          format: {
            ascii_only: false,
            beautify: true,
            braces: false,
            // comments
            indent_level: 2,
            indent_start: 0,
            inline_script: true,
            keep_numbers: false,
            keep_quoted_props: false,
            max_line_len: 100,
            // preamble
            // quote_keys
            // quote_style
          },
          keep_classnames: false,
          keep_fnames: false,
          toplevel: true,
        }),
    ].filter(Boolean),
    external,

    preserveSymlinks: true,
    shimMissingExports: true,
    inlineDynamicImports: false,
    treeshake: true,
  };

  return config;
};
