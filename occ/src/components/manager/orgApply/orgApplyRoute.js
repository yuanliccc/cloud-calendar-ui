export default [
  {
    path: '/manager/orgApplyList',
    name: 'orgApplyList',
    meta: {
      label: '机构入驻申请管理',
      requireAuth: true,
      permission: "orgApply_left"
    },
    component: () => import('./orgApplyList'),
  },
  {
    path: '/manager/orgApplyForm/add',
    name: 'orgApplyForm_Add',
    meta: {
      label: '新增机构入驻申请',
      requireAuth: true,
      permission: 'orgApply_add'
    },
    component: () => import('./orgApplyForm')
  },
  {
    path: '/manager/orgApplyForm/edit/:orgApplyId',
    name: 'orgApplyForm_Edit',
    meta: {
      label: '编辑机构入驻申请',
      requireAuth: true,
      permission: 'orgApply_edit'
    },
    component: () => import('./orgApplyForm')
  },
  {
    path: '/manager/orgApplyDisplay/:orgApplyId',
    name: 'orgApplyDisplay',
    meta: {
      label: '查看机构入驻申请',
      requireAuth: true,
      permission: 'orgApply_display'
    },
    component: () => import('./orgApplyDisplay')
  }
]
