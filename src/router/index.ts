import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import MainView from '@/views/Main.vue';

Vue.use(VueRouter);

export const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Main',
    component: MainView,
  },
  {
    path: '/search/:mode/:keyword',
    name: 'Search',
    component: () => import('@/views/SearchResults.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
