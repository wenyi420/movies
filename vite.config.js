import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    sourcemap: true,
  },
  css: {
    preprocessorOptions: {
      less: {
        // ant-desgin theme color
        modifyVars: {
          "primary-color": "#e50914",
          "link-color": "#e50914",
        },
        javascriptEnabled: true,
      },
    },
  },
});
