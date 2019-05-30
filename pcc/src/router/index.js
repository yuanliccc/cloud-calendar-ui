import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index.vue'
import pcc from '../components/pcc.vue'
import login from '../components/login.vue'
import signup from '../components/signup.vue'
import mine from '../components/mine'
import chart from '../components/mineChart'
import schedule from '../components/schedule'
import friends from '../components/friends'
import personal from '../components/personal'
import calendar from '../components/calendar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: pcc,
      children: [
        {
          path: '/',
          name: 'index',
          component: index
        },
        {
          path: 'login',
          name: 'login',
          component: login
        },
        {
          path: 'signup',
          name: 'signup',
          component: signup
        },
        {
          path: 'calendar',
          component: calendar
        },
        {
          path: 'mine',
          component: mine,
          children: [
            {
              path: 'chart',
              component: chart
            },
            {
              path: 'schedule',
              component: schedule
            },
            {
              path: 'friends',
              component: friends
            },
            {
              path: 'calendar',
              component: calendar
            }
          ]
        },
        {
          path: 'personal',
          component: personal
        }
      ]
    }
  ]
})
