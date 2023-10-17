import pkg from './package.json';
import typescript from '@rollup/plugin-typescript';

export default {
  input: './src/index.ts',
  output: [
    {
      formart: 'cjs',
      file: pkg.main,
    },
    {
      formart: 'es',
      file: pkg.module,
    },
  ],
  plugins: [typescript()],
};
