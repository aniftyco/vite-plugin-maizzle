import { defineConfig } from 'vite';
import maizzle from './dist/index.js';

export default defineConfig({
  plugins: [
    maizzle({
      src: 'maizzle',
      dest: 'mail',
    }),
  ],
});
