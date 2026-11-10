import { defineConfig } from 'vite';
import { readdirSync } from 'fs';
import { resolve } from 'path';

// Site CSS/JS must stay in public/assets, which is copied as-is: the pages load
// classic <script defer> files, which Vite does not bundle.
const pages = (dir) =>
  readdirSync(resolve(__dirname, dir))
    .filter((file) => file.endsWith('.html'))
    .map((file) => resolve(__dirname, dir, file));

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: [...pages('.'), ...pages('projects')],
    },
  },
});
