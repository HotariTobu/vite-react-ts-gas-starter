import { type RollupOptions } from 'rollup'
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/index.ts',

  output: {
    dir: 'dist',
    format: 'esm',
  },

  plugins: [typescript()],

  context: 'this',
} satisfies RollupOptions
