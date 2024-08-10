import { createApp } from 'vue';
import App from './App.vue';
import router, { setupRouter } from 'router/index';
import { setupStore } from 'store/index';
import { setupI18n } from '@/locales';
import '@unocss/reset/normalize.css';
import 'virtual:uno.css';

// If you want to use ElMessage, import it.
import 'element-plus/theme-chalk/src/message.scss';
import 'element-plus/theme-chalk/src/notification.scss';
import 'element-plus/theme-chalk/el-input-number.css';
import 'styles/index.scss';

import * as Icons from '@element-plus/icons-vue';

async function bootstrap() {
  const app = createApp(App);
  for (const [key, component] of Object.entries(Icons)) {
    app.component(key, component);
  }

  // 挂载状态管理
  setupStore(app);
  setupI18n(app);

  // 挂载路由
  setupRouter(app);
  // 路由准备就绪后挂载 APP 实例
  // https://router.vuejs.org/api/interfaces/router.html#isready
  await router.isReady();
  app.mount('#app', true);
}

void bootstrap();
