import { viteMockServe } from 'vite-plugin-mock';

export function createMockServe() {
  return viteMockServe({
    mockPath: './src/mock',
    localEnabled: true,
    enable: true,
    prodEnabled: true,
    injectCode: ` import { setupProdMockServer } from './mockProdServer'; setupProdMockServer(); `,
  });
}
