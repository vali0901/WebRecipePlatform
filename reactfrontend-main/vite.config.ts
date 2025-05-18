/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        babelrc: true,
      },
    }),
    tsconfigPaths(),
  ],
  base: "/",
  server: {
    port: 3000,
    hmr: {
      protocol: "ws",
    },
  },
  resolve: {
    alias: {
      "@assets": resolve(__dirname, "src/assets"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      reporter: ["none"],
    },
  },
});
