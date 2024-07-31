import type { Config } from 'tailwindcss';
import email from 'tailwindcss-preset-email';

export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [email],
} satisfies Config;
