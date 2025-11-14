import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Development should run at root '/' and use the default dev server.
  // For production builds (CI/Pages) you can set VITE_BASE to the repo path.
  const base = mode === "development" ? "/" : process.env.VITE_BASE ?? "./";

  return {
    base,
    // Default production build output. Use --outDir in CI when needed.
    build: {
      outDir: "dist",
      emptyOutDir: true,
    },
    // Use default dev server binding so `npm run dev` behaves normally.
    server: {
      // host and port left as Vite defaults (localhost:5173) to avoid conflicts.
    },
  plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
