import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/page/Pos'
import HelloWorld from '@/components/page/HelloWorld'
import leftNav from '@/components/common/leftNav'


Vue.use(Router)
Vue.use(leftNav)
Vue.use(HelloWorld)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Pos',
      component: Pos
    },
    {
      path: '/',
      name: 'leftNav',
      component: leftNav
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
