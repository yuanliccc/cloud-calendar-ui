export default [
  {
    path: '/manager/organizationList',
    name: 'organizationList',
    meta: {
      label: '组织机构管理',
      requireAuth: true,
      permission: "organization_left"
    },
    component: () => import('./organizationList'),
  },
  {
    path: '/manager/organizationForm/add',
    name: 'organizationForm_Add',
    meta: {
      label: '新增组织机构',
      requireAuth: true,
      permission: 'organization_add'
    },
    component: () => import('./organizationForm')
  },
  {
    path: '/manager/organizationForm/edit/:organizationId',
    name: 'organizationForm_Edit',
    meta: {
      label: '编辑组织机构',
      requireAuth: true,
      permission: 'organization_edit'
    },
    component: () => import('./organizationForm')
  },
  {
    path: '/manager/organizationDisplay/:organizationId',
    name: 'organizationDisplay',
    meta: {
      label: '查看组织机构',
      requireAuth: true,
      permission: 'organization_display'
    },
    component: () => import('./organizationDisplay')
  }
]
