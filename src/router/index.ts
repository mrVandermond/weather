import { createRouter, createWebHashHistory } from 'vue-router';

import RootLayout from '@/views/RootLayout.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'root',
      component: RootLayout,
    },
  ],
});

export default router;
