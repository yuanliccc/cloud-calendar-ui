import moduleRoute from './module/moduleListRoute'

export default [
  {
    path: '/manager',
    name: 'manager',
    meta: {
      label: '主页',
      icon: 'icon iconfont icon-fl-origin',
      requireAuth: false
    },
    component: () => import('./manager'),
    children:[
      ...moduleRoute
    ]
  }
]
