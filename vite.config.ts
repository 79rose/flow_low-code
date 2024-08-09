import type { ConfigEnv, UserConfig } from 'vite';
import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { createVitePlugins } from './config';
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  return {
    base: './',
    plugins: createVitePlugins(),
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '~': resolve(__dirname, '../'),
        // framework
        api: resolve(__dirname, 'src/framework/api'),
        const: resolve(__dirname, 'src/framework/const'),
        router: resolve(__dirname, 'src/framework/router'),
        store: resolve(__dirname, 'src/framework/store'),
        interface: resolve(__dirname, 'src/framework/interface'),
        utils: resolve(__dirname, 'src/framework/utils'),
        enums: resolve(__dirname, 'src/framework/enums'),
        styles: resolve(__dirname, 'src/framework/styles'),
        module: resolve(__dirname, 'src/module'),
        hooks: resolve(__dirname, 'src/hooks'),
      },
    },
    server: {
      host: true,
      port: 8001,
      // proxy: createProxy(VITE_PROXY),
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ''),
        },
      },
      watch: {
        usePolling: true,
      },
    },
    build: {
      modulePreload: false,
      outDir: 'dist',
      emptyOutDir: true,
      assetsInlineLimit: 4096,
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`,
          manualChunks: (_id: string) => {
            if (_id.indexOf('node_modules') !== -1) {
              return 'vendor';
            }
          },
        },
      },
    },
  };
});
