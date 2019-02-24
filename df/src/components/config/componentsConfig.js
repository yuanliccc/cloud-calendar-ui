export const basicComponents = [
  {
    type: 'input',
    label: '单行文本框',
    options: {
      defaultValue: ''
    }
  },
  {
    type: 'textarea',
    label: '多行文本框',
    options: {
      defaultValue: ''
    }
  },
  {
    type: 'checkbox',
    label: '多选框',
    options: {
      defaultValue: [],
      options: [
        {
          value: '选项1'
        },
        {
          value: '选项2'
        },
        {
          value: '选项3'
        }
      ],
      remoteFunc: ''
    }
  },
  {
    type: 'radio',
    label: '单选框',
    options: {
      defaultValue: '',
      options: [
        {
          value: '选项1'
        },
        {
          value: '选项2'
        },
        {
          value: '选项3'
        }
      ],
      remoteFunc: ''
    }
  },
  {
    type: 'select',
    label: '下拉框',
    options: {
      defaultValue: '',
      options: [
        {
          value: '下拉框1'
        },
        {
          value: '下拉框2'
        },
        {
          value: '下拉框3'
        }
      ],
      remoteFunc: ''
    }
  },
  {
    type: 'date',
    label: '日期选择器',
    options: {
      defaultValue: '',
      format: 'yyyy-MM-dd HH:mm:ss'
    }
  }
]

export const layoutComponents = [
  {
    type: 'grid',
    label: '栅栏式布局',
    columns: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      }
    ],
    options: {

    }
  }
]
