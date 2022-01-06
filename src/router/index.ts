import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Inbox from "@/views/Inbox.vue";
import Social from "@/views/Social.vue";
import Play from "@/views/Play.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/inbox",
    name: "Inbox",
    component: Inbox,
  },
  {
    path: "/social",
    name: "Social",
    component: Social,
  },
  {
    path: "/play",
    name: "Play",
    component: Play,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
