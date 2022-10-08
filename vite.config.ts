import { resolve } from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "~": resolve(__dirname, "./src"),
        },
    },

    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "http://127.0.0.1:8000",
            },
        },
    },
});
