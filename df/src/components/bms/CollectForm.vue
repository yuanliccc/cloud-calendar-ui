<template>
  <div class="collect-form-container">
    <div class="collect-form-main">
      <el-form label-width="80px">
        <div v-for="(item, index) in widgetForm.list" :key="index">
          <div v-if="item.type === 'grid'">
            <el-row>
              <el-col v-for="(col, colIndex) in item.columns" :key="colIndex" :span="col.span">
                <form-item  v-for="(element, elementIndex) in col.list"
                            :element="element"
                            :key="elementIndex">
                </form-item>
              </el-col>
            </el-row>
          </div>
          <div v-else>
            <el-row>
              <el-col :span="24">
                <form-item :element="item"></form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <el-button @click="saveCollectForm">保存</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import FormItem from './FormItem.vue'
export default {
  name: 'collectForm',
  components: {
    FormItem
  },
  data () {
    return {
      formId: null,
      widgetForm: {
        list: [],
        config: {
          name: '',
          method: '',
          id: '',
          enctype: '',
          employeeId: null,
          createTime: null,
          action: ''
        }
      }
    }
  },
  methods: {
    // 点击保存按钮后的操作
    saveCollectForm: function () {
      this.$axios.post('/df/collect/form/saveCollectForm', this.widgetForm)
        .then(res => {
          const code = res.data.code
          if (code === 200) {
            this.$message.success('保存成功')
            this.$router.push({path: '/main/dfList'})
          }
        })
        .catch(error => {
          this.$message.error(error)
        })
    },
    // 处理单个栅栏表单域
    handleGrid (data) {
      const grid = {
        type: data.type,
        label: data.label,
        id: data.id,
        formId: data.formId,
        name: data.name,
        value: data.value,
        parentId: data.parentId,
        displayIndex: data.displayIndex,
        key: data.key,
        model: data.model,
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
        options: {}
      }
      return grid
    },
    // 处理栅栏列表
    handleGrids: function (grids, gridItems, components) {
      for (let i = 0; i < grids.length; i++) {
        let grid = this.handleGrid(grids[i])

        for (let j = 0; j < gridItems.length; j++) {
          // 如果当前表单域是该栅栏中的元素
          if (gridItems[i].parentId === grid.id) {
            grid.columns[j].list.push(this.handleField(gridItems[j]))
          }
        }

        components.push(grid)
      }
    },
    // 处理表单域中的表单条目信息
    handleFieldItem: function (field, dfFormItems) {
      const options = []
      for (let i = 0; i < dfFormItems.length; i++) {
        options.push({
          id: dfFormItems[i].id,
          formFieldId: dfFormItems[i].formFieldId,
          value: dfFormItems[i].value,
          label: dfFormItems[i].label,
          itemIndex: dfFormItems[i].itemIndex
        })
      }
      field.options.options = options
      return field
    },
    // 解析后台传递过来的单个表单域信息
    handleField: function (data) {
      // 将查询出来的表单域信息封装成一个对象并返回
      const field = {
        id: data.id,
        formId: data.formId,
        label: data.label,
        type: data.type,
        options: {
          defaultValue: data.value,
          options: []
        },
        parentId: data.parentId,
        displayIndex: data.displayIndex,
        key: data.key,
        model: data.model
      }

      return field
    },
    // 处理后台传递过来的表单域信息列表,将其转化为前端可以解析的格式
    handleFields: function (data) {
      const components = []
      const grids = []
      const gridItems = []

      for (let i = 0; i < data.length; i++) {
        // 如果当前遍历的表单域不是栅栏类型,并且不是栅栏中的子元素
        if (data[i].dfFormField.type !== 'grid' && data[i].dfFormField.parentId === null) {
          let field = this.handleField(data[i].dfFormField)

          // 对于含有表单条目的表单域(单选框,多选框,下拉框需要进行额外的处理)
          if (field.type === 'radio' || field.type === 'checkbox' || field.type === 'select') {
            field = this.handleFieldItem(field, data[i].dfFormItems)
          }

          // 对于多选框,转换其值
          if (field.type === 'checkbox') {
            if (field.options.defaultValue !== null) {
              field.options.defaultValue = field.options.defaultValue.split(',')
            }
          }

          // 从查询出的数组中删除已经解析过的组件
          data.splice(i--, 1)

          components.push(field)
        } else {
          if (data[i].dfFormField.type === 'grid') {
            grids.push(data[i].dfFormField)
          } else {
            gridItems.push(data[i].dfFormField)
          }
        }
      }

      // 处理栅栏及其栅栏中的元素
      this.handleGrids(grids, gridItems, components)
      this.widgetForm.list = components
    },
    // 根据表单Id查询动态表单中的表单域信息
    findFormFieldsByFormId: function (formId) {
      this.$axios.get('/df/form/field/findDynamicFormFieldsByFormId/' + formId)
        .then(res => {
          const code = res.data.code
          if (code === 200) {
            const data = res.data.data
            this.handleFields(data)
            console.log(this.widgetForm)
          }
        })
        .catch(error => {
          this.$message.error(error)
        })
    },
    // 根据表单Id查询动态表单信息
    findDynamicFormByFormId: function (formId) {
      this.$axios.get('/df/dynamic/form/' + formId)
        .then(res => {
          const code = res.data.code
          if (code === 200) {
            const data = res.data.data
            data.createTime = this.dateFormat(data.createTime)
            this.widgetForm.config = data
            this.findFormFieldsByFormId(formId)
          }
        })
        .catch(error => {
          this.$message.error(error)
        })
    },
    dateFormat: function (date) {
      let format = 'yyyy-MM-dd HH:mm:ss'
      date = new Date(date)
      var o = {
        'M+': date.getMonth() + 1, // month
        'd+': date.getDate(), // day
        'H+': date.getHours(), // hour
        'm+': date.getMinutes(), // minute
        's+': date.getSeconds(), // second
        'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
        'S': date.getMilliseconds() // millisecond
      }
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }

      for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        }
      }

      return format
    }
  },
  mounted () {
    this.formId = this.$route.params.formId
    this.findDynamicFormByFormId(this.formId)
  }
}
</script>

<style scoped>
  .collect-form-container {
    height: 90vh;
    width: 60%;
    margin:0 auto;
    padding: 15px;
  }
</style>
