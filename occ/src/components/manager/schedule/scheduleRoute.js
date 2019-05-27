export default [
  {
    path: '/manager/scheduleList',
    name: 'scheduleList',
    meta: {
      label: '机构日历管理',
      requireAuth: true,
      permission: "schedule_left"
    },
    component: () => import('./scheduleList'),
  },
  {
    path: '/manager/scheduleForm/add',
    name: 'scheduleForm_Add',
    meta: {
      label: '新增机构日历',
      requireAuth: true,
      permission: 'schedule_add'
    },
    component: () => import('./scheduleForm')
  },
  {
    path: '/manager/scheduleForm/edit/:scheduleId',
    name: 'scheduleForm_Edit',
    meta: {
      label: '编辑机构日历',
      requireAuth: true,
      permission: 'schedule_edit'
    },
    component: () => import('./scheduleForm')
  },
  {
    path: '/manager/scheduleDisplay/:scheduleId',
    name: 'scheduleDisplay',
    meta: {
      label: '查看机构日历',
      requireAuth: true,
      permission: 'schedule_display'
    },
    component: () => import('./scheduleDisplay')
  }
]
