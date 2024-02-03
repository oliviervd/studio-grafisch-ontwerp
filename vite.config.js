import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import viteSSR from 'vite-plugin-ssr/plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  server: {
    port: 3000,
  },
});
