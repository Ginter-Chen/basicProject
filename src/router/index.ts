import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "/", 
    name: "Home", 
    component: () => import("../views/home/index.vue")},
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router