export default [
  {
    path: '/manager/workArrangeList',
    name: 'workArrangeList',
    meta: {
      label: '工作安排管理',
      requireAuth: true,
      permission: "workArrange_left"
    },
    component: () => import('./workArrangeList'),
  },
  {
    path: '/manager/workArrangeForm/add',
    name: 'workArrangeForm_Add',
    meta: {
      label: '新增工作安排',
      requireAuth: true,
      permission: 'workArrange_add'
    },
    component: () => import('./workArrangeForm')
  },
  {
    path: '/manager/workArrangeForm/edit/:workArrangeId',
    name: 'workArrangeForm_Edit',
    meta: {
      label: '编辑工作安排',
      requireAuth: true,
      permission: 'workArrange_edit'
    },
    component: () => import('./workArrangeForm')
  },
  {
    path: '/manager/workArrangeDisplay/:workArrangeId',
    name: 'workArrangeDisplay',
    meta: {
      label: '查看工作安排',
      requireAuth: true,
      permission: 'workArrange_display'
    },
    component: () => import('./workArrangeDisplay')
  }
]
