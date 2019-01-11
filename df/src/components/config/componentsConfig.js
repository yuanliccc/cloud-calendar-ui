export const basicComponents = [
  {
    type: 'input',
    name: '单行文本框',
    options: {
      defaultValue: ''
    }
  },
  {
    type: 'textarea',
    name: '多行文本框',
    options: {
      defaultValue: ''
    }
  },
  {
    type: 'checkbox',
    name: '多选框',
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
    type: 'radio',
    name: '单选框',
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
    name: '下拉框',
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
    name: '日期选择器',
    options: {
      defaultValue: ''
    }
  }
]

export const layoutComponents = [
  {
    type: 'grid',
    name: '栅栏式布局',
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
