import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index.vue'
import pcc from '../components/pcc.vue'
import login from '../components/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index,
    },
    {
      path: '/pcc',
      component:pcc,
      children:[
        {
          path:'login',
          name:'login',
          component:login
        }
      ]
    }
  ]
})
