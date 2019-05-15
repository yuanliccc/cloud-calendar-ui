<template>
  <!-- el-container:外层容器 -->
  <el-container>
    <!-- el-aside侧边栏容器 -->
    <el-aside style="wdith: 250px;">
      <div class="components-list">
        <div class="widget-cate">基础字段</div>
        <!-- 使用vuedraggable组件
        element:String,默认div.就是<draggable>标签渲染后展现出来的标签类型.也是包含拖动列表和插槽的外部标签,可以用来兼容UI组件
        list:Array,非必需,默认为null.是value的替代品,和v-model不能共用
        options:Object,配置项
          |-- group:分组,同一组的不同list可以相互拖动
          |-- sort:boolean,定义是否可以拖拽
          |-- ghostClass:css选择器的字符串,给拖动列表时产生的影子设置css样式
        move:function,拖拽时调用的函数
        -->
        <draggable element="ul" :list="basicComponents"
          :options="{group:{ name:'people', pull:'clone',put:false}, sort:false, ghostClass: 'ghost'}"
          @end="handleMoveEnd"
          @start="handleMoveStart"
          :move="handleMove">
          <li class="form-edit-widget-label" v-for="(item, index) in basicComponents" :key="index + item.type">
            <a>
              <span>{{item.label}}</span>
            </a>
          </li>
        </draggable>
        <div class="widget-cate">布局格式</div>
        <draggable element="ul" :list="layoutComponents"
          :options="{group:{ name:'people', pull:'clone',put:false}, sort:false, ghostClass: 'ghost'}"
          @end="handleMoveEnd"
          @start="handleMoveStart"
          :move="handleMove">
          <li class="form-edit-widget-label data-grid" v-for="(item, index) in layoutComponents" :key="index + item.type">
            <a>
              <span>{{item.label}}</span>
            </a>
          </li>
        </draggable>
      </div>
    </el-aside>
    <!-- Element中的direction属性用来设置子元素的排列方向,vertical指垂直排列 -->
    <el-container class="center-container" direction="vertical">
      <!-- el-header:顶栏容器 -->
      <el-header>
        <el-button type="text" size="medium" icon="el-icon-back" @click="goback">返回</el-button>
        <el-button type="text" size="medium" icon="el-icon-tickets" @click="saveOrUpdateDynamicForm">保存</el-button>
      </el-header>
      <!-- el-main:主要区域容器 -->
      <el-main>
        <!-- ref:
         |-- 1:ref加在普通的元素上,用this.ref.name获取到的是dom元素
         |-- 2:ref加在子组件上,用this.ref.name获取到的是组件实例,可以使用组件的所有方法
         |-- 3.我们也可以使用this.$refs.name.value来获取组件的value值
         -->
        <widget-form ref="widgetForm" :data="widgetForm" :select.sync="widgetFormSelect"></widget-form>
      </el-main>
    </el-container>
    <el-aside class="widget-config-container">
      <el-header>
        <div class="config-tab" :class="{active: configTab == 'widget'}" @click="handleConfigSelect('widget')">表单域属性</div>
        <div class="config-tab" :class="{active: configTab == 'form'}" @click="handleConfigSelect('form')">表单属性</div>
      </el-header>
      <el-main>
        <form-config v-show="configTab == 'form'" :data.sync="widgetForm"></form-config>
        <widget-config v-show="configTab == 'widget'" :data="widgetFormSelect"></widget-config>
      </el-main>
      <el-main>
      </el-main>
    </el-aside>
  </el-container>
</template>

<script>
import Draggable from 'vuedraggable'
import WidgetForm from './WidgetForm'
import FormConfig from './FormConfig'
import WidgetConfig from './WidgetConfig'
import {basicComponents, layoutComponents} from '../config/componentsConfig.js'
import moment from 'moment'
export default {
  name: 'df-container',
  components: {
    Draggable,
    WidgetForm,
    FormConfig,
    WidgetConfig,
    moment
  },
  data () {
    return {
      basicComponents,
      layoutComponents,
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'left',
          name: '',
          method: '',
          id: null,
          createTime: null,
          employeeId: null,
          enctype: null,
          action: null,
          publishState: ''
        }
      },
      widgetFormSelect: '1550739614000_52521',
      configTab: 'form',
      operator: null,
      formId: null
    }
  },
  methods: {
    handleMoveEnd (evt) {
      console.log('拖拽结束', evt)
    },
    handleMoveStart ({oldIndex}) {
      console.log('拖拽开始', '初始下标为' + oldIndex)
    },
    handleMove () {
      return null
    },
    handleConfigSelect (value) {
      this.configTab = value
    },
    // 点击保存按钮后的操作
    saveOrUpdateDynamicForm: function () {
      if (this.operator === 'add') {
        this.saveDynamicForm(this.widgetForm)
      } else if (this.operator === 'edit') {
        this.updateDynamicForm(this.widgetForm)
      }
    },
    // 新增动态表单
    saveDynamicForm: function (dynamicForm) {
      if (dynamicForm.list.length === 0) {
        alert('请构建有组件的动态表单')
      } else {
        this.$axios.post('/df/dynamic/form/addDynamicForm', dynamicForm)
          .then(res => {
            console.log('sucess')
            this.$router.push({path: '/main/dfList'})
          })
          .catch(err => {
            this.$message.error(err)
          })
      }
    },
    // 更新动态表单
    updateDynamicForm: function (dynamicForm) {
      if (dynamicForm.list.length === 0) {
        alert('请构建有组件的动态表单')
      } else {
        this.$axios.put('/df/dynamic/form/updateDynamicForm', dynamicForm)
          .then(res => {
            this.$router.push({path: '/main/dfList'})
          })
          .catch(err => {
            this.$message.error(err)
          })
      }
    },
    queryParam () {
      this.operator = this.$route.query.operator

      if (this.operator === 'edit') {
        this.formId = this.$route.query.formId

        if (this.formId != null) {
          // 查询对应的表单
          this.findDynamicForm(this.formId)
        }
      }
    },
    findDynamicForm (formId) {
      this.$axios.get('/df/dynamic/form/' + formId)
        .then(res => {
          const data = res.data

          // 处理表单信息
          this.widgetForm.config.name = data.data.name
          this.widgetForm.config.method = data.data.method
          this.widgetForm.config.id = data.data.id
          this.widgetForm.config.createTime = this.timeGST(data.data.createTime)
          this.widgetForm.config.employeeId = data.data.employeeId
          this.widgetForm.config.enctype = data.data.enctype
          this.widgetForm.config.action = data.data.action
          this.widgetForm.config.publishState = data.data.publishState

          // 查询表单条目信息
          this.findDynamicFormFieldsByFormId(formId)
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    timeGST (utcTime) {
      return moment(utcTime).format('YYYY-MM-DD HH:mm:ss')
    },
    findDynamicFormFieldsByFormId (formId) {
      this.$axios.get('/df/form/field/findDynamicFormFieldsByFormId/' + formId)
        .then(res => {
          const code = res.data.code

          if (code === 200) {
            const data = res.data.data
            this.handleFields(data)
          }
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    handleFields (data) {
      // 要显示的组件列表
      const components = []
      // 栅栏列表
      const grids = []
      // 栅栏条目列表
      const gridItems = []

      for (let i = 0; i < data.length; i++) {
        if (data[i].dfFormField.type !== 'grid' && data[i].dfFormField.parentId == null) {
          let field = this.handleField(data[i].dfFormField)

          // 对于单选框,复选框和下拉框需要额外进行条目的处理
          if (field.type === 'radio' || field.type === 'checkbox' || field.type === 'select') {
            field = this.handleFieldItem(field, data[i].dfFormItems)
          }

          // 将例如aaa,bbb形式的字符串转为数字
          if (field.type === 'checkbox') {
            if (field.options.defaultValue !== null) {
              field.options.defaultValue = field.options.defaultValue.split(',')
            }
          }

          // 从数组中删除已经添加的组件
          data.splice(i--, 1)

          // 将当前表单域添加到要显示的组件列表中
          components.push(field)
        } else {
          if (data[i].dfFormField.type === 'grid') {
            grids.push(data[i].dfFormField)
          } else {
            gridItems.push(data[i].dfFormField)
          }
        }
      }

      this.handleGrids(grids, gridItems, components)

      this.widgetFormSelect = components[components.length - 1].id

      this.widgetForm.list = components
    },
    handleGrids (grids, gridItems, components) {
      for (let i = 0; i < grids.length; i++) {
        let grid = this.handleGrid(grids[i])

        for (let j = 0; j < gridItems.length; j++) {
          if (gridItems[j].parentId === grid.id) {
            // 如果该条目是目前栅栏下的条目,将其插入到当前栅栏中
            grid.columns[gridItems[j].displayIndex].list.push(this.handleField(gridItems[j]))
          }
        }

        components.push(grid)
      }
    },
    handleGrid (dfGrid) {
      const grid = {
        type: dfGrid.type,
        label: dfGrid.label,
        id: dfGrid.id,
        formId: dfGrid.formId,
        name: dfGrid.name,
        value: dfGrid.value,
        parentId: dfGrid.parentId,
        displayIndex: dfGrid.displayIndex,
        key: dfGrid.key,
        model: dfGrid.model,
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

      return grid
    },
    handleField (dfFormField) {
      // 将查询出来的表单域信息封装成一个对象
      const field = {
        id: dfFormField.id,
        formId: dfFormField.formId,
        label: dfFormField.label,
        type: dfFormField.type,
        options: {
          defaultValue: dfFormField.value,
          options: []
        },
        parentId: dfFormField.parentId,
        displayIndex: dfFormField.displayIndex,
        key: dfFormField.key,
        model: dfFormField.model
      }

      return field
    },
    handleFieldItem (field, dfFormItems) {
      // 处理表单条目
      const options = []
      for (let j = 0; j < dfFormItems.length; j++) {
        options.push({
          id: dfFormItems[j].id,
          formFieldId: dfFormItems[j].formFieldId,
          value: dfFormItems[j].value,
          label: dfFormItems[j].label,
          itemIndex: dfFormItems[j].itemIndex
        })
      }

      field.options.options = options
      return field
    },
    // 点击返回按钮后的操作
    goback: function () {
      this.$router.go(-1)
    }
  },
  watch: {
    widgetForm: {
      deep: true,
      handler: function (val) {
        console.log(this.$refs.widgetForm)
      }
    }
  },
  mounted () {
    this.queryParam()
  }
}
</script>

<style lang="scss">
@import '../../styles/form-editor/index.scss';
</style>
