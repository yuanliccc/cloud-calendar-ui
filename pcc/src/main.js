// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import axios from './axios'
import elementUI from './element'
import 'font-awesome/css/font-awesome.min.css'
import './assets/common.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  elementUI,
  components: { App },
  template: '<App/>'
})
