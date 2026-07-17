import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Em produção (GitHub Pages) os assets são servidos de /healthtech-ops-mvp/.
// Em dev, a raiz.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/healthtech-ops-mvp/" : "/",
  plugins: [react(), tailwindcss()],
  server: { port: 5173, open: true },
}));
