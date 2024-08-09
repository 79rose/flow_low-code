import type { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import svgLoader from "vite-svg-loader";
import VueDevTools from "vite-plugin-vue-devtools";
import { createAutoImport } from "./auto-import";
import { createComnponents } from "./components";
export function createVitePlugins() {
  const vitePlugins: Array<PluginOption | PluginOption[]> = [
    createAutoImport(),
    createComnponents(),
    vue(),
    svgLoader({ defaultImport: "component" }),
    VueDevTools(),
    UnoCSS({
      configFile: "uno.config.ts",
    }),
  ];
  return vitePlugins;
}
