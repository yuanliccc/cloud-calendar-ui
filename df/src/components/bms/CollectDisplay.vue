<template>
  <div class="collect-display-container">
    <div class="collect-display-form">
      <el-form label-width="80px">
        <div v-for="(item, index) in widgetForm.list" :key="index">
          <div v-if="item.type === 'grid'">
            <el-row>
              <el-col v-for="(col, colIndex) in item.columns" :key="colIndex" :span="col.span">
                <div v-for="(element, elementIndex) in col.list" :key="elementIndex">
                  <el-form-item :label="element.label">
                    <span>{{element.options.defaultValue}}</span>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </div>
          <div v-else>
            <el-row>
              <el-col :span="24">
                <div>
                  <el-form-item :label="item.label">
                    <span>{{item.options.defaultValue}}</span>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <el-button @click="goback">返回</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'collectDisplay',
  data () {
    return {
      collectFormId: null,
      widgetForm: {
        list: []
      }
    }
  },
  methods: {
    // 点击返回按钮后的操作
    goback: function () {
      this.$router.go(-1)
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
    // 处理栅栏及栅栏中的元素
    handleGrids: function (grids, gridItems, components) {
      for (let i = 0; i < grids.length; i++) {
        let grid = this.handleGrid(grids[i])

        for (let j = 0; j < gridItems.length; j++) {
          // 如果当前表单域是该栅栏中的元素
          if (gridItems[j].parentId === grid.id) {
            grid.columns[gridItems[j].displayIndex].list.push(this.handleField(gridItems[j]))
          }
        }

        components.push(grid)
      }
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
    // 处理表单域信息
    handleFields: function (data) {
      const components = []
      const grids = []
      const gridItems = []

      for (let i = 0; i < data.length; i++) {
        // 如果当前遍历的表单域不是栅栏类型,并且不是栅栏中的子元素
        if (data[i].dfFormField.type !== 'grid' && data[i].dfFormField.parentId === null) {
          let field = this.handleField(data[i].dfFormField)

          // 对于含有表单条目的表单域(单选框,多选框,下拉框需要进行额外的处理)
          /* if (field.type === 'radio' || field.type === 'checkbox' || field.type === 'select') {
            field = this.handleFieldItem(field, data[i].dfFormItems)
          } */
          if (field.type === 'checkbox') {
            if (field.options.defaultValue !== '' && field.options.defaultValue != null) {
              field.options.defaultValue = field.options.defaultValue.split(',')
              field.options.defaultValue = field.options.defaultValue.join(',')
            }
          }

          // 从查询出的数组中删除已经解析过的组件
          data.splice(i--, 1)

          components.push(field)
        } else {
          if (data[i].type === 'grid') {
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
    // 根据收集表的Id查询收集表的表单域信息
    findCollectFormFieldByCollectFormId: function (formId) {
      this.$axios.get('/df/form/field/findCollectFormFieldByCollectFormId/' + formId)
        .then(res => {
          const code = res.data.code
          if (code === 200) {
            const data = res.data.data
            this.handleFields(data)
          }
        })
        .catch(error => {
          this.$message.error(error)
        })
    }
  },
  mounted () {
    this.collectFormId = this.$route.query.formId
    this.findCollectFormFieldByCollectFormId(this.collectFormId)
  }
}
</script>

<style>
  .collect-display-container {
    height: 90vh;
    width: 60%;
    margin:0 auto;
    padding: 15px;
  }
</style>
