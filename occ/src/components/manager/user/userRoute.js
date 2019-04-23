export default [
  {
    path: '/manager/userList',
    name: 'userList',
    meta: {
      label: '用户管理',
      requireAuth: true,
      permission: "user_left"
    },
    component: () => import('./userList'),
  },
  {
    path: '/manager/userForm/add',
    name: 'userForm_Add',
    meta: {
      label: '邀请用户',
      requireAuth: true,
      permission: 'user_add'
    },
    component: () => import('./userInvite')
  },
  {
    path: '/manager/userForm/edit/:userId',
    name: 'userForm_Edit',
    meta: {
      label: '编辑用户',
      requireAuth: true,
      permission: 'user_edit'
    },
    component: () => import('./userForm')
  },
  {
    path: '/manager/userDisplay/:userId',
    name: 'userDisplay',
    meta: {
      label: '查看用户',
      requireAuth: true,
      permission: 'user_display'
    },
    component: () => import('./userDisplay')
  }
]
