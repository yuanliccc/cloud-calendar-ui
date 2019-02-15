import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/base/index.vue'
import df from '../components/df.vue'
import signup from '../components/base/Signup.vue'
import login from '../components/base/Login.vue'
// import Home from '../components/form-editor/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: df,
      children: [
        {
          path: '/',
          name: 'index',
          meta: {index: 0},
          component: index
        },
        {
          path: 'login',
          name: 'login',
          meta: {index: 1},
          component: login
        },
        {
          path: 'signup',
          name: 'signup',
          meta: {index: 2},
          component: signup
        }
      ]
    }
  ]
})
