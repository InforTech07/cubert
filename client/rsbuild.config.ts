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
  output: {
    distPath: {
      root: '../backend/cmd/server/static', // Build files will go to backend/cmd/server/static for embed
    },
    assetPrefix: '/static/', // Assets will be served from /static/ path
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
