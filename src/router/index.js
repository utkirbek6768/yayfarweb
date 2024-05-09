import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DriverView from "../views/DriverView.vue";
import CreatePostView from "../views/CreatePostView.vue";
import Exprement from "../views/Exprement.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/driver",
      name: "driver",
      component: DriverView,
    },
    {
      path: "/createpost",
      name: "createpost",
      component: CreatePostView,
    },
    {
      path: "/exprement",
      name: "exprement",
      component: Exprement,
    },
  ],
});

export default router;
