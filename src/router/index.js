import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Idea from '@/components/Idea'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/idea',
      name: 'Idea',
      component: Idea
    }
  ]
})
