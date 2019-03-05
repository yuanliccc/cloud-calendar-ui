export default [
  {
    path: '/manager/moduleList',
    name: 'moduleList',
    meta: {
      label: '模块管理',
      requireAuth: true,
      permission: "module_left"
    },
    component: () => import('./moduleList'),
  },
  {
    path: '/manager/moduleForm/add',
    name: 'moduleForm_Add',
    meta: {
      label: '新增模块',
      requireAuth: true,
      permission: 'module_add'
    },
    component: () => import('./moduleForm')
  },
  {
    path: '/manager/moduleForm/edit/:moduleId',
    name: 'moduleForm_Edit',
    meta: {
      label: '编辑模块',
      requireAuth: true,
      permission: 'module_edit'
    },
    component: () => import('./moduleForm')
  },
  {
    path: '/manager/moduleDisplay/:moduleId',
    name: 'moduleDisplay',
    meta: {
      label: '查看模块',
      requireAuth: true,
      permission: 'module_display'
    },
    component: () => import('./moduleDisplay')
  }
]
