import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Convert from "../views/Convert.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/convert",
      name: "convert",
      component: Convert,
    },
  ],
});

export default router;
