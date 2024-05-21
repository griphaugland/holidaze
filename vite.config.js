import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["chunk-zw7wj6xu.js", "chunk-ceqrfmjq.js"],
  },
});
