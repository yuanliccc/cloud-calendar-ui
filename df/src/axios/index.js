import Vue from 'vue'
import Axios from 'axios'

/* baseURL将被添加到URL前面,除非URL是绝对的 */
Axios.defaults.baseURL = 'http://127.0.0.1:8090/api'

/* 添加请求拦截器 */
Axios.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data)
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }

    return config
  },
  error => {
    /* Promise.reject(reason)方法返回一个带有拒绝原因reason参数的Promise对象 */
    return Promise.reject(error)
  }
)

/* 设置响应拦截器 */
Axios.interceptors.response.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/* 你可能会在很多组件里用到数据/使用工具,但又不想污染全局作用域,这种情况下,可以通过在原型上定义它们使其在每个Vue实例中可用 */
Vue.prototype.$axios = Axios

export default({

})
