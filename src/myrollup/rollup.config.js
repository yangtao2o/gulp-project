import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  // output: {
  //   file: 'boundle.js',
  //   format: 'umd'
  // },
  // plugins: [
  //   resolve(),
  //   babel({
  //     exclude: 'node_modules/**'
  //   })
  ],
  dest: 'build/bundle.js'
}