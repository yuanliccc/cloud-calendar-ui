import moduleRoute from './module/moduleRoute'
import roleRoute from './role/roleRoute'
import userRoute from './user/userRoute'
import permissionRoute from  './permission/permissionRoute'
import  organizationRoute from './organization/organizationRoute'
import noticeRoute from './notice/noticeRoute'
import orgCalenderRoute from './orgCalender/orgCalenderRoute'
import scheduleRoute from './schedule/scheduleRoute'
import eventRoute from './event/eventRoute'
import workArrange from './workArrange/workArrangeRoute'
import orgInvite from './orgInvite/orgInviteRoute'
import orgApply from  './orgApply/orgApplyRoute'
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
      {
        path: '/manager/calender',
        name: 'managerCalender',
        meta: {
          label: '主页日历展示',
          requireAuth: true,
          permission: ''
        },
        component: () => import('./calender'),
      },
      {
        path: '/manager/index',
        name: 'managerIndex',
        meta: {
          label: '主页展示',
          requireAuth: true,
          permission: ''
        },
        component: () => import('./index'),
      },
      ...moduleRoute,
      ...roleRoute,
      ...userRoute,
      ...permissionRoute,
      ...organizationRoute,
      ...noticeRoute,
      ...orgCalenderRoute,
      ...scheduleRoute,
      ...eventRoute,
      ...workArrange,
      ...orgApply,
      ...orgInvite
    ]
  }
]
