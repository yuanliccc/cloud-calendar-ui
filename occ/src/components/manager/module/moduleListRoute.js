export default [
  {
    path: '/manager/moduleList',
    name: 'moduleList',
    meta: {
      label: '模块管理',
      icon: 'icon iconfont icon-fl-origin',
      requireAuth: false
    },
    component: () => import('./moduleList'),
  },
  {
    path: '/manager/moduleForm/add',
    name: 'moduleForm_Add',
    meta: {
      label: '新增模块',
      icon: 'icon iconfont icon-fl-origin',
      requireAuth: false,
    },
    component: () => import('./moduleForm')
  },
  {
    path: '/manager/moduleForm/edit/:moduleId',
    name: 'moduleForm_Edit',
    meta: {
      label: '新增模块',
      icon: 'icon iconfont icon-fl-origin',
      requireAuth: false,
    },
    component: () => import('./moduleForm')
  }
]
