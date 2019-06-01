
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
      },{
        path: '/main',
        name: 'main',
        meta: {
          label: '云日历系统机构日历子系统',
          permission: '',
          requireAuth: false
        },
        component: () => import('./index'),
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
        path: '/joinUs',
        name: 'joinUs',
        meta: {
          label: '加入我们',
          permission: '',
          requireAuth: false
        },
        component: () => import('./joinUs'),
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


