import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/movie/:id",
      name: "movieInfo",
      component: () => import("@/views/MovieInfoView.vue"),
    },
    {
      path: "/movie/netflix/:id",
      name: "netflixMovieInfo",
      component: () => import("@/views/MovieInfoView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("@/views/Signup.vue"),
    },
    {
      path: "/myMovies",
      name: "myMovies",
      component: () => import("@/views/MyMovies.vue"),
    },
  ],
  scrollBehavior() {
    // always scroll to top
    return { top: 0 };
  },
});

export default router;
