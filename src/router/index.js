// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // 新しく追加されたルート
    {
      path: '/:id',
      name: 'post-detail',
      component: () => import('../views/PostDetailView.vue')  // 仮のコンポーネント名、実際の名前に修正する
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
});

export default router;
