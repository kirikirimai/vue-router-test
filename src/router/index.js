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
      component: () => import('../views/PostDetailView.vue'),
      children:[
        {
          path: 'photo',
          name: 'photo',
          component: () => import('../views/PhotoView.vue')
        }
      
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
});

export default router;
