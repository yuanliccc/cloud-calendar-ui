// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from './axios'
import './assets/lib/bootstrap/css/bootstrap.min.css'
import  './assets/lib/public/public.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueWechatTitle from 'vue-wechat-title';

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.use(VueWechatTitle)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  axios,
  components: {
    App,
  },
  template: '<App/>'
})
