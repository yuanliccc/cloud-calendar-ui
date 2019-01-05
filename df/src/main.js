import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import DynamicForm from './index'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/regular/keyboard'
import 'vue-awesome/icons/regular/trash-alt'
import 'vue-awesome/icons/regular/clone'
import 'vue-awesome/icons/regular/dot-circle'
import 'vue-awesome/icons/regular/check-square'
import 'vue-awesome/icons/bars'
import 'vue-awesome/icons/regular/calendar-alt'
import 'vue-awesome/icons/regular/clock'
import 'vue-awesome/icons/th'
import 'vue-awesome/icons/sort-numeric-up'
import 'vue-awesome/icons/regular/star'
import 'vue-awesome/icons/palette'
import 'vue-awesome/icons/regular/caret-square-down'
import 'vue-awesome/icons/toggle-off'
import 'vue-awesome/icons/sliders-h'
import 'vue-awesome/icons/regular/image'
import 'vue-awesome/icons/chalkboard'

Vue.component('icon', Icon)

Vue.use(DynamicForm)

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small' })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')
