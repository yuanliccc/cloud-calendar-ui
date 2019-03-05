import moduleRoute from './module/moduleRoute'
import roleRoute from './role/roleRoute'
export default [
  {
    path: '/manager',
    name: 'manager',
    meta: {
      label: '主页',
      requireAuth: true,
      permission: ''
    },
    component: () => import('./manager'),
    children:[
      ...moduleRoute,
      ...roleRoute
    ]
  }
]
