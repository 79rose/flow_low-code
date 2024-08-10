import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
export function createAutoImport() {
  return AutoImport({
    imports: ['vue', 'pinia', 'vue-router', 'vue-i18n'],
    resolvers: [ElementPlusResolver()],
    dts: './src/types/auto-imports.d.ts',
    dirs: ['src'],
  });
}
