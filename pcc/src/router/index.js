import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index.vue'
import pcc from '../components/pcc.vue'
import login from '../components/login.vue'
import signup from '../components/signup.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component:pcc,
      children:[
        {
          path: '/',
          name: 'index',
          component: index
        },
        {
          path:'login',
          name:'login',
          component:login
        },
        {
          path:'signup',
          name: 'signup',
          component:signup
        }
      ]
    }
  ]
})
