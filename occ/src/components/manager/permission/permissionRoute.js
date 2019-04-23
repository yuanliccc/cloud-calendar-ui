export default [
  {
    path: '/manager/permissionList',
    name: 'permissionList',
    meta: {
      label: '权限点管理',
      requireAuth: true,
      permission: "permission_left"
    },
    component: () => import('./permissionList'),
  },
  {
    path: '/manager/permissionForm/add',
    name: 'permissionForm_Add',
    meta: {
      label: '新增权限点',
      requireAuth: true,
      permission: 'permission_add'
    },
    component: () => import('./permissionForm')
  },
  {
    path: '/manager/permissionForm/edit/:permissionId',
    name: 'permissionForm_Edit',
    meta: {
      label: '编辑权限点',
      requireAuth: true,
      permission: 'permission_edit'
    },
    component: () => import('./permissionForm')
  },
  {
    path: '/manager/permissionDisplay/:permissionId',
    name: 'permissionDisplay',
    meta: {
      label: '查看权限点',
      requireAuth: true,
      permission: 'permission_display'
    },
    component: () => import('./permissionDisplay')
  }
]
