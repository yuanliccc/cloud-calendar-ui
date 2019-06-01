export default [
  {
    path: '/manager/systemconfigList',
    name: 'systemconfigList',
    meta: {
      label: '机构邀请管理',
      requireAuth: true,
      permission: "systemconfig_left"
    },
    component: () => import('./systemconfigList'),
  },
  {
    path: '/manager/systemconfigForm/add',
    name: 'systemconfigForm_Add',
    meta: {
      label: '新增机构邀请',
      requireAuth: true,
      permission: 'systemconfig_add'
    },
    component: () => import('./systemconfigForm')
  },
  {
    path: '/manager/systemconfigForm/edit/:systemconfigId',
    name: 'systemconfigForm_Edit',
    meta: {
      label: '编辑机构邀请',
      requireAuth: true,
      permission: 'systemconfig_edit'
    },
    component: () => import('./systemconfigForm')
  },
  {
    path: '/manager/systemconfigDisplay/:systemconfigId',
    name: 'systemconfigDisplay',
    meta: {
      label: '查看机构邀请',
      requireAuth: true,
      permission: 'systemconfig_display'
    },
    component: () => import('./systemconfigDisplay')
  }
]
