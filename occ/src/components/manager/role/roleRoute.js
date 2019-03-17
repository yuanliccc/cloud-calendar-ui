export default [
  {
    path: '/manager/roleList',
    name: 'roleList',
    meta: {
      label: '角色管理',
      requireAuth: true,
      permission: "role_left"
    },
    component: () => import('./roleList'),
  },
  {
    path: '/manager/roleForm/add',
    name: 'roleForm_Add',
    meta: {
      label: '新增角色',
      requireAuth: true,
      permission: 'role_add'
    },
    component: () => import('./roleForm')
  },
  {
    path: '/manager/roleForm/edit/:roleId',
    name: 'roleForm_Edit',
    meta: {
      label: '编辑角色',
      requireAuth: true,
      permission: 'role_edit'
    },
    component: () => import('./roleForm')
  },
  {
    path: '/manager/roleDisplay/:roleId',
    name: 'roleDisplay',
    meta: {
      label: '查看角色',
      requireAuth: true,
      permission: 'role_display'
    },
    component: () => import('./roleDisplay')
  },
  {
    path: '/manager/roleAssignPer/:roleId',
    name: 'roleAssignPer',
    meta: {
      label: '分配权限',
      requireAuth: true,
      permission: 'permission_assign'
    },
    component: () => import('./roleAssign')
  }
]
