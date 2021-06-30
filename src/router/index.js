import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/starships",
    name: "AllStarships",
    component: () => import("../views/AllStarships.vue"),
  },
  {
    path: "/characters",
    name: "AllCharacters",
    component: () => import("../views/AllCharacters.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
