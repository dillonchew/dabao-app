import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "../firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../components/Home.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/Settings.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/user/:uid",
    name: "user",
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/User.vue"),
    meta: {
      requiresAuth: true,
    },
  },  
  {
    path: "/requests",
    name: "Requests",
    component: () =>
      import(/* webpackChunkName: "requests" */ "../components/Requests.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/offers",
    name: "Offers",
    component: () =>
      import(/* webpackChunkName: "offers" */ "../components/Offers.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "login" */ "../components/Dashboard.vue"),
  },
  {
    path: "/SSlocations",
    name: 'SSlocations',
    component: () => import('../components/SSlocations.vue')
  },
  {
    path: "/WClocations",
    name: 'WClocations',
    component: () => import('../components/WClocations.vue')
  },
  {
    path: "/Clemlocations",
    name: 'Clemlocations',
    component: () => import('../components/Clemlocations.vue')
  },
  {
    path: "/WCPMacs",
    name: 'WCPMacs',
    component: () => import('../components/WC/WCPMacs.vue')
  },
  {
    path: "/BurgerKing",
    name: 'BurgerKing',
    component: () => import('../components/WC/BurgerKing.vue')
  },
  {
    path: "/RongLiang",
    name: 'RongLiang',
    component: () => import('../components/WC/RongLiang.vue')
  },
  {
    path: "/Macs",
    name: 'Macs',
    component: () => import('../components/Clem/Macs.vue')
  },
  {
    path: "/Crave",
    name: 'Crave',
    component: () => import('../components/Clem/Crave.vue')
  },
  {
    path: "/YaKun",
    name: 'YaKun',
    component: () => import('../components/Clem/YaKun.vue')
  },
  {
    path: "/AlAmaan",
    name: 'AlAmaan',
    component: () => import('../components/SS/AlAmaan.vue')
  },
  {
    path: "/FongSeng",
    name: 'FongSeng',
    component: () => import('../components/SS/FongSeng.vue')
  },
  {
    path: "/Formosa",
    name: 'Formosa',
    component: () => import('../components/SS/Formosa.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('../components/404.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// navigation guard to check for logged in users
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next("/login");
  } else {
    next();
  }
});

export default router;
