import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Room from './views/Room.vue'
import Join from './views/Join.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/room/:codeRoom',
      component: Room,
    },
    {
      path: '/join',
      component: Join,
    },
  ],
})
