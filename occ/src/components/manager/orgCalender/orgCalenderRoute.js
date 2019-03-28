export default [
  {
    path: '/manager/orgCalenderList',
    name: 'orgCalenderList',
    meta: {
      label: '机构日历管理',
      requireAuth: true,
      permission: "orgCalender_left"
    },
    component: () => import('./orgCalenderList'),
  },
  {
    path: '/manager/orgCalenderForm/add',
    name: 'orgCalenderForm_Add',
    meta: {
      label: '新增机构日历',
      requireAuth: true,
      permission: 'orgCalender_add'
    },
    component: () => import('./orgCalenderForm')
  },
  {
    path: '/manager/orgCalenderForm/edit/:orgCalenderId',
    name: 'orgCalenderForm_Edit',
    meta: {
      label: '编辑机构日历',
      requireAuth: true,
      permission: 'orgCalender_edit'
    },
    component: () => import('./orgCalenderForm')
  },
  {
    path: '/manager/orgCalenderDisplay/:orgCalenderId',
    name: 'orgCalenderDisplay',
    meta: {
      label: '查看机构日历',
      requireAuth: true,
      permission: 'orgCalender_display'
    },
    component: () => import('./orgCalenderDisplay')
  }
]
