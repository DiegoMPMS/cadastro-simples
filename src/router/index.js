import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/inscricao",
      name: "inscricao",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@pages/Inscricao/Index.vue"),
      redirect: "inscricao/cadastro/dados",
      children: [
        {
          path: "cadastro/dados",
          name: "cadastro_dados",
          meta:{router: "cadastro_dados"},
          component: () =>
            import("@pages/Inscricao/components/DadosPessoais.vue"),
        },
        {
          path: "cadastro/endereco",
          name: "cadastro_endereco",
          component: () =>
            import("@pages/Inscricao/components/Endereco.vue"),
        },
        {
          path: "cadastro/documentos",
          name: "cadastro_documentos",
          component: () =>
            import("@pages/Inscricao/components/Documento.vue"),
        },
      ],
    },
    {
      path: "/perfil_usuario",
      name: "perfil_usuario",
      component: () => import("../views/PerfilUsuarioView.vue"),
    },
  ],
});

export default router;
