import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index.vue'
import df from '../components/df.vue'
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
          component: index
        }
      ]
    }
  ]
})
