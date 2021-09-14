import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { createDemoPlugin } from "./build/vite-plugin-demo";
import path from "path";

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }): unknown => {
  return defineConfig({
    resolve: {
      alias:
        mode === "development"
          ? [
              {
                find: "jolyne-ui",
                replacement: path.resolve(__dirname, "./src"),
              },
            ]
          : undefined,
    },
    plugins: [vue(), vueJsx(), createDemoPlugin()],
  });
};
