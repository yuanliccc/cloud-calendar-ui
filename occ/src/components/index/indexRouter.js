
export default [
  {
    path: '/',
    name: 'index',
    meta: {
      label: '首页',
      permission: '',
      requireAuth: false
    },
    component: () => import('./occ'),
    children:[
      {
        path: '/login',
        name: 'login',
        meta: {
          label: '登录',
          permission: '',
          requireAuth: false
        },
        component: () => import('./login'),
      },
      {
        path: '/register',
        name: 'register',
        meta: {
          label: '注册',
          permission: '',
          requireAuth: false
        },
        component: () => import('./register'),
      },
      {
        path: '/calender',
        name: 'calender',
        meta: {
          label: '日历',
          permission: '',
          requireAuth: false
        },
        component: () => import('./calender'),
      }
    ]
  }
]


