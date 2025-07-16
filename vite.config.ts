import { defineConfig } from "vite";
import * as path from "node:path";

// Ensure that src/main.ts exists, since root is set to "src"
export default defineConfig({
    root: "src",
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    css: {
        preprocessorOptions: {
            sass: {},
        },
    },
});
