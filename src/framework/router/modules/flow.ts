import { RouteRecordRaw } from 'vue-router';
import { DefaultLayout } from '../constant';
const flow: RouteRecordRaw[] = [
  {
    component: DefaultLayout,
    path: '/flow',
    name: 'flow',
    redirect: '/flow/index',
    children: [
      {
        component: () => import('module/mod-demo/index.vue'),
        path: 'index',
        name: 'flow-index',
      },
    ],
  },
];

export default flow;
