import { createRouter, createWebHistory, RouterView } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: "/:locale?", 
      component: RouterView,  
      beforeEnter: I18nManager.routeMiddleware.bind(I18nManager),
      children: [  
        {
          path: '', 
          name: 'home',
          component: HomeView
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/AboutView.vue')
        }
      ]
    }
  ]
})

export default router;