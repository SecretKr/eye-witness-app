import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    base: "/eye-witness-app/",
    plugins: [react()],
});
