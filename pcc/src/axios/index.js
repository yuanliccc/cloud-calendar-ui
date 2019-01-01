import Vue from 'vue'
import Axios from 'axios'

Axios.defaults.timeout = 5000
Axios.defaults.headers.common['Authorization'] = 'qqq'

Vue.prototype.$axios = Axios

export default ({

})
