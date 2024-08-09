import { App } from 'vue';
import { createRouter, createMemoryHistory, RouteRecordRaw } from 'vue-router';
import { createRouterGuards } from './guards';
import type { IModuleType } from './types';

const modules = import.meta.glob<IModuleType>('./modules/**/*.ts', { eager: true });

const routeModuleList: RouteRecordRaw[] = Object.keys(modules).reduce((list, key) => {
  const mod = modules[key].default ?? {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  return [...list, ...modList];
}, [] as RouteRecordRaw[]);
const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: 'flow',
};
export const constantRouter: RouteRecordRaw[] = [RootRoute, ...routeModuleList];

const router = createRouter({
  history: createMemoryHistory(),
  routes: constantRouter,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}

export default router;
