import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/perfil_usuario',
      name: 'perfil_usuario',
      component: () => import('../views/PerfilUsuarioView.vue')
    },
    {
      path: '/cadastro1',
      name: 'cadastro1',
      component: () => import('../views/CadastroView1.vue')
    },
    {
      path: '/cadastro2',
      name: 'cadastro2',
      component: () => import('../views/CadastroView2.vue')
    },
    {
      path: '/cadastro3',
      name: 'cadastro3',
      component: () => import('../views/CadastroView3.vue')
    }
  ],
})

export default router
