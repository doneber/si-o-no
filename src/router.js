import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Room from './views/Room.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/room',
      component: Room,
    },
  ],
})
