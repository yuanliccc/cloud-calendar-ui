export default [
  {
    path: '/manager/orgInviteList',
    name: 'orgInviteList',
    meta: {
      label: '机构邀请管理',
      requireAuth: true,
      permission: "orgInvite_left"
    },
    component: () => import('./orgInviteList'),
  },
  {
    path: '/manager/orgInviteForm/add',
    name: 'orgInviteForm_Add',
    meta: {
      label: '新增机构邀请',
      requireAuth: true,
      permission: 'orgInvite_add'
    },
    component: () => import('./orgInviteForm')
  },
  {
    path: '/manager/orgInviteForm/edit/:orgInviteId',
    name: 'orgInviteForm_Edit',
    meta: {
      label: '编辑机构邀请',
      requireAuth: true,
      permission: 'orgInvite_edit'
    },
    component: () => import('./orgInviteForm')
  },
  {
    path: '/manager/orgInviteDisplay/:orgInviteId',
    name: 'orgInviteDisplay',
    meta: {
      label: '查看机构邀请',
      requireAuth: true,
      permission: 'orgInvite_display'
    },
    component: () => import('./orgInviteDisplay')
  }
]
