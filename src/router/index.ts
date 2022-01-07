import Vue from "vue";
import VueRouter, { NavigationGuard, NavigationGuardNext, Route, RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Inbox from "@/views/Inbox.vue";
import Social from "@/views/Social.vue";
import Play from "@/views/Play.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Logout from "@/views/Logout.vue";
import AdminPanel from "@/views/AdminPanel.vue";
import AdminPanelUsers from "@/components/AdminPanelUsers.vue";
import AdminPanelReports from "@/components/AdminPanelReports.vue";
import PageNotFound from "@/views/PageNotFound.vue"
import { component } from "vue/types/umd";

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
  {
    path: "/learn",
    name: "Learn",
    component: Play,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Sign Up",
    component: Register,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminPanel,
    children: [
      {
        path: 'users',
        name: "Admin",
        component: AdminPanelUsers
      },
      {
        path: 'reports',
        name: "Admin",
        component: AdminPanelReports
      },
    ],
  },
  {
    path: "*",
    name: "NotFound",
    component: PageNotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to:Route, from:Route, next:NavigationGuardNext) => {
  
// });

export default router;
