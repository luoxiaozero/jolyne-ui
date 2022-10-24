import { getTransformedVueSrc } from "./utils/get-transformed-vue-src";
import { HmrContext } from "vite";
import createVuePlugin from "@vitejs/plugin-vue";
const fileRegex = /\.(md)$/;
const vuePlugin = createVuePlugin({
  include: [/\.md$/],
});

export function createDemoPlugin() {
  const demoPlugin = {
    name: "vite-plugin-vue-demo",
    transform(code: string, id: string) {
      if (fileRegex.test(id)) {
        return getTransformedVueSrc(id);
      }
    },
    async handleHotUpdate(ctx: HmrContext) {
      const { file } = ctx;
      if (fileRegex.test(file)) {
        const code = await getTransformedVueSrc(file) || "";
        return vuePlugin.handleHotUpdate?.({
          ...ctx,
          read: () => code,
        });
      }
    },
  };
  return [demoPlugin, vuePlugin];
}
