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

  const config = {
    input: {
      [PACKAGE_TITLE]: 'src/index',
    },
    output: [
      {
        name: PACKAGE_NAME,
        dir: LIB_PATH,
        format: 'cjs',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: PABLIC_FILE_NAME,
        compact: !isDevelopment,
        esModule: true,
        exports: 'named',
        sourcemap: true,
      },
      {
        name: PACKAGE_NAME,
        dir: LIB_PATH,
        format: 'esm',
        entryFileNames: '[name].mjs',
        chunkFileNames: '[name].[hash].mjs',
        assetFileNames: PABLIC_FILE_NAME,
        compact: !isDevelopment,
        esModule: true,
        exports: 'named',
        sourcemap: true,
      },
    ],
    external: [
      ...Object.keys(PKG.dependencies || {}),
      ...Object.keys(PKG.peerDependencies || {}),
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
        babelHelpers: 'bundled',
        exclude: /node_modules/,
      }),
      !isDevelopment && terser(),
    ].filter(Boolean),
    preserveModules: true,
    preserveSymlinks: true,
    shimMissingExports: true,
  };

  return config;
};
