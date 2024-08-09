import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export function createComnponents() {
  return Components({
    resolvers: [ElementPlusResolver()],
    dts: './src/types/components.d.ts',
    dirs: ['src'],
  });
}
