import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    alias: {
      '@': resolve(__dirname, '.'),
      '@/lib': resolve(__dirname, './lib'),
      '@/components': resolve(__dirname, './components'),
      '@/hooks': resolve(__dirname, './hooks'),
      '@/src': resolve(__dirname, './src'),
    },
  },
  tools: {
    postcss: {
      postcssOptions: {
        plugins: [
          '@tailwindcss/postcss'
        ],
      },
    },
  },
});
