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
    path: '/search/:mode/:keyword/:page',
    name: 'Search',
    component: () => import('@/views/SearchResults.vue'),
  },
  {
    path: '/preview/repo/:owner/:name',
    name: 'Repository',
    component: () => import('@/views/RepoPreview.vue'),
  },
  {
    path: '/preview/user/:name',
    name: 'User',
    component: () => import('@/views/UserPreview.vue'),
  },
  {
    path: '*',
    component: () => import('@/views/NotFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
