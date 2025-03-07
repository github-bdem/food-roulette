/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    base: "./",
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./vitest.setup.ts",
        coverage: {
            enabled: true,
            include: ["src/**/*.{js,jsx,ts,tsx}"],
            exclude: [
                "node_modules",
                "**/dist",
                "**/*.test.*",
                "**/.cache",
                "**/.git",
                "**/.vscode",
            ],
            reporter: ["lcov", "html"],
        },
    },
    resolve: {
        alias: {
            "@components": path.resolve(__dirname, "./src/components"),
            "@assets": path.resolve(__dirname, "./src/assets"),
        },
    },
    plugins: [react(), tailwindcss(), tsconfigPaths()],
});
