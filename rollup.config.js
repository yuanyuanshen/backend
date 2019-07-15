import path from 'path'
import json from 'rollup-plugin-json'
import alias from 'rollup-plugin-alias'
import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import nodeGlobals from 'rollup-plugin-node-globals'
// import { eslint } from 'rollup-plugin-eslint'
import pkg from './package.json'

import { uglify } from 'rollup-plugin-uglify'
import bundleSize from 'rollup-plugin-filesize'
import visualizer from 'rollup-plugin-visualizer'

export const pathResolve = p => path.resolve(__dirname, p)
export const external = Object.keys(pkg.dependencies)
export const browserGlobals = {
  vue: 'Vue',
  echarts: 'echarts',
  lodash: 'lodash'
}
export const UMDName = 'Backend'

const extensions = ['.js', '.vue']

const prodPlugins = [
  resolve({
    extensions,
    browser: true
  }),
  // eslint({
  //   extensions,
  //   exclude: ['**/*.json'],
  //   cache: true,
  //   throwOnError: true
  // }),
  commonjs(),
  nodeGlobals(),
  vue({
    template: {
      isProduction: !process.env.ROLLUP_WATCH,
      compilerOptions: { preserveWhitespace: false }
    },
    css: true
  }),
  babel({
    exclude: 'node_modules/**'
  }),
  alias({
    '@': pathResolve('stories'),
    '~': pathResolve('node_modules')
  }),
  json(),
  bundleSize()
]

export default [
  {
    input: pathResolve('stories/index.js'),
    output: {
      file: pathResolve('dist/bundle.min.js'),
      format: 'umd',
      name: UMDName,
      globals: browserGlobals,
      sourcemap: false
    },
    external,
    plugins: [
      ...prodPlugins,
      uglify(),
      visualizer({
        template: 'treemap'
      })
    ]
  },
  {
    input: pathResolve('stories/index.js'),
    output: {
      file: pathResolve('dist/bundle.js'),
      format: 'umd',
      name: UMDName,
      globals: browserGlobals,
      sourcemap: true
    },
    external,
    plugins: prodPlugins
  },
  {
    input: pathResolve('stories/index.js'),
    output: {
      file: pathResolve('dist/bundle.es.js'),
      format: 'es',
      globals: browserGlobals,
      sourcemap: true
    },
    external,
    plugins: prodPlugins
  }
]
