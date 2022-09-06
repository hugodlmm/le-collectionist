import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/favs',
    name: 'favs',
    component: () => import(/* webpackChunkName: "about" */ '../views/Favs.vue')
  },
  {
    path: '/discover',
    name: 'Discover',
    component: () => import(/* webpackChunkName: "about" */ '../views/Discover.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
