export default [
  {
    path: '/manager/eventList',
    name: 'eventList',
    meta: {
      label: '事件管理',
      requireAuth: true,
      permission: "event_left"
    },
    component: () => import('./eventList'),
  },
  {
    path: '/manager/eventForm/addForSchedule/:scheduleId',
    name: 'eventForm_Add',
    meta: {
      label: '新增事件',
      requireAuth: true,
      permission: "event_left"
    },
    component: () => import('./eventForm'),
  },
  {
    path: '/manager/eventForm/add',
    name: 'eventForm_Add',
    meta: {
      label: '新增事件',
      requireAuth: true,
      permission: 'event_add'
    },
    component: () => import('./eventForm')
  },
  {
    path: '/manager/eventForm/edit/:eventId',
    name: 'eventForm_Edit',
    meta: {
      label: '编辑事件',
      requireAuth: true,
      permission: 'event_edit'
    },
    component: () => import('./eventForm')
  },
  {
    path: '/manager/eventDisplay/:eventId',
    name: 'eventDisplay',
    meta: {
      label: '查看事件',
      requireAuth: true,
      permission: 'event_display'
    },
    component: () => import('./eventDisplay')
  }
]
