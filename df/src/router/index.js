import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/base/index.vue'
import df from '../components/df.vue'
import signup from '../components/base/Signup.vue'
import login from '../components/base/Login.vue'
import main from '../components/bms/Main.vue'
import personal from '../components/bms/Personal.vue'
import dfList from '../components/bms/DynamicFormList.vue'
import dfWorkSpace from '../components/form-editor/Container.vue'

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
        },
        {
          path: 'main',
          component: main,
          meta: {index: 3},
          children: [
            {
              path: 'personal',
              name: 'personal',
              meta: {index: 4},
              component: personal
            },
            {
              path: 'dfList',
              name: 'dfList',
              meta: {index: 5},
              component: dfList
            }
          ]
        },
        {
          path: 'dfWorkSpace',
          name: 'dfWorkSpace',
          meta: {index: 6},
          component: dfWorkSpace
        }
      ]
    }
  ]
})
