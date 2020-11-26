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
        include: /src/,
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false,
              loose: true,
              exclude: [
                'transform-async-to-generator',
                'transform-template-literals',
                'transform-regenerator',
              ],
            },
          ],
          ['@babel/preset-react', {}],
        ],
        plugins: [
          // Stage 0
          '@babel/plugin-proposal-function-bind',

          // Stage 1
          '@babel/plugin-proposal-export-default-from',
          '@babel/plugin-proposal-logical-assignment-operators',
          ['@babel/plugin-proposal-optional-chaining', { loose: false }],
          ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
          [
            '@babel/plugin-proposal-nullish-coalescing-operator',
            { loose: false },
          ],
          '@babel/plugin-proposal-do-expressions',

          // Stage 2
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          '@babel/plugin-proposal-function-sent',
          '@babel/plugin-proposal-export-namespace-from',
          '@babel/plugin-proposal-numeric-separator',
          '@babel/plugin-proposal-throw-expressions',

          // Stage 3
          '@babel/plugin-syntax-dynamic-import',
          '@babel/plugin-syntax-import-meta',
          ['@babel/plugin-proposal-class-properties', { loose: true }],
          '@babel/plugin-proposal-json-strings',

          ['babel-plugin-transform-hoist-nested-functions', {}],

          [
            'babel-plugin-macros',
            {
              styledComponents: {
                ssr: true,
                displayName: true,
                fileName: false,
                minify: true,
                transpileTemplateLiterals: true,
                pure: true,
                namespace: '∇',
              },
            },
          ],

          ['babel-plugin-jsx-control-statements', {}],

          ['@babel/plugin-transform-react-inline-elements', {}],

          ['babel-plugin-react-persist', {}],
        ],

        exclude: /node_modules/,
        sourceMaps: true,
      }),
      !isDevelopment && terser(),
    ].filter(Boolean),
    preserveModules: true,
    preserveSymlinks: true,
    shimMissingExports: true,
  };

  return config;
};
