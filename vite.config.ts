import { defineConfig } from 'vite';
import maizzle from './src/index';

export default defineConfig({
  plugins: [
    maizzle({
      src: 'maizzle',
      dest: 'mail',
    }),
  ],
});
