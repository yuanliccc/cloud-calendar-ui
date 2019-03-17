import moduleRoute from './module/moduleRoute'
import roleRoute from './role/roleRoute'
import userRoute from './user/userRoute'
import permissionRoute from  './permission/permissionRoute'
import  organizationRoute from './organization/organizationRoute'
import noticeRoute from './notice/noticeRoute'
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
      ...roleRoute,
      ...userRoute,
      ...permissionRoute,
      ...organizationRoute,
      ...noticeRoute
    ]
  }
]
