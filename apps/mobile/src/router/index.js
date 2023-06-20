import { createRouter, createWebHistory } from '@ionic/vue-router';
import store from "../store";
import { Preferences } from '@capacitor/preferences';
import axios from 'axios';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/RegisterPage.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!store.getters["auth/tokenValid"]) {
      const { value } = await Preferences.get({ key: 'token' })
      if (value) {
        store.commit("auth/setToken", value);
        store.commit('auth/setLoggedIn', true);
        axios.defaults.headers.common.Authorization = `Bearer ${value}`;
      }
    }

    await store.dispatch("auth/whoami")
    if (store.getters["auth/isLoggedIn"]) {
      next();
    } else {
      next({ name: "Login" });
    }
  } else {
    next();
  }
});

export default router;
