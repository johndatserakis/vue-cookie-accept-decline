import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/vue-cookie-accept-decline/', // For GitHub docs support
  build: {
    outDir: '../docs',
  },
  plugins: [vue()],
  root: 'example',
});
