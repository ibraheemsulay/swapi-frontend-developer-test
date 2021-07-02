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
  {
    path: "/planets",
    name: "AllPlanets",
    component: () => import("../views/AllPlanets.vue"),
  },
  {
    path: "/description/:category/:name",
    name: "Description",
    component: () => import("../views/Description.vue"),
    meta: {
      hideHeader: true,
    },
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
