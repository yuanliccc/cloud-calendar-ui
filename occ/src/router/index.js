import Vue from 'vue'
import Router from 'vue-router'
import occ from '../App.vue'
import index from '../components/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: occ,
      children: [
        {
          path: '/',
          name: 'index',
          component: index
        }
      ]
    }
  ]
})
