import { createRouter, createWebHashHistory } from 'vue-router';

import RootLayout from '@/views/RootLayout.vue';
import ERouterNames from '@/router/routerNames';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: ERouterNames.ROOT,
      component: RootLayout,
    },
  ],
});

export default router;
