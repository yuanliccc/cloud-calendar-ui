import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import  App from '../App.vue'
import store from '../store'
import indexRouter from '../components/index/indexRouter'
import  manageRouter from '../components/manager/manageRouter'

Vue.use(Router)

const routes = [
  {
    path: '/404',
    component: App,
    meta: {
      label: '默认页面',
      icon: 'icon iconfont icon-fl-origin',
      requireAuth: false
    },
  },
    ...indexRouter,
    ...manageRouter,
]
const router = new Router({
  routes,
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  /** 判断用户是否已经登录 */
  if (store.state.userInfo != undefined) {
    /** 已经登录情况下访问 /login, 则直接进入 /admin */
    if (to.path === '/login') {
      next();
      NProgress.done()
    } else {
      next();
    }
  } else {
    if (noPermission(to.path) || (to.meta.requireAuth == false)) {
      next();
    } else {
      next('/');
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done()
});

function noPermission(path) {
  return ['/404',].indexOf(path) > -1
}

export default router;
