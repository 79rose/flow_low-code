import { isNavigationFailure, Router } from "vue-router";
import { storage } from "utils/storage";


export function createRouterGuards(router: Router) {
  router.beforeEach((to, _from, next) => {
    next();
  });

  router.afterEach((_to, _, failure) => {
    // document.title = (to?.meta?.title as string) || document.title;
    if (isNavigationFailure(failure)) {
      // 路由已经激活 重复跳转
      console.log(failure.message);
    }
  });

  router.onError(error => {
    console.log(error, "路由错误");
  });
}
