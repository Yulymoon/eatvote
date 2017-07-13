import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Idea from '@/components/Idea'
import group from '@/components/group'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/idea',
      name: 'Idea',
      component: Idea
    },
    {
      path: '/',
      name: 'group',
      component: group
    }
  ]
})
