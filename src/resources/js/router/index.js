import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue'; // ルート表示用（必要なら Home.vue に分けてもOK）

const routes = [
  { path: '/', component: App },
  { path: '/atte', component: () => import('../components/Atte.vue') },
  { path: '/rese', component: () => import('../components/Rese.vue') },
  { path: '/furima', component: () => import('../components/Furima.vue') },
  { path: '/price', component: () => import('../components/Price.vue') },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
