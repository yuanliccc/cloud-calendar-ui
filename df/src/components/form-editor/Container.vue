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
              <span>{{item.name}}</span>
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
              <span>{{item.name}}</span>
            </a>
          </li>
        </draggable>
      </div>
    </el-aside>
    <!-- Element中的direction属性用来设置子元素的排列方向,vertical指垂直排列 -->
    <el-container class="center-container" direction="vertical">
      <!-- el-header:顶栏容器 -->
      <el-header>
        <div style="text-align:center">这里后期会有几个按钮:预览,保存</div>
        <el-button type="text" size="medium" icon="el-icon-tickets" @click="saveDynamicForm">保存</el-button>
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
export default {
  name: 'df-container',
  components: {
    Draggable,
    WidgetForm,
    FormConfig,
    WidgetConfig
  },
  data () {
    return {
      basicComponents,
      layoutComponents,
      /**
       * widgetForm是传递给子组件的数据
       * list:存放拖拽带工作区的组件
       * config:为子组件中的el-form设置labelWidth,labelPosition属性
       */
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'left',
          name: '',
          method: ''
        }
      },
      widgetFormSelect: null,
      configTab: 'form'
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
    saveDynamicForm () {
      this.jsonTemplate = this.widgetForm

      // 判断组件列表是否为空
      if (this.jsonTemplate.list.length === 0) {

      } else {
        this.$axios.post('/df/dynamic/form/addDynamicForm', this.jsonTemplate)
          .then(res => {
            console.log('sucess')
            // 跳转路由
          })
          .catch(err => {
            console.log('error' + err)
          })
      }
    }
  },
  watch: {
    widgetForm: {
      deep: true,
      handler: function (val) {
        console.log(this.$refs.widgetForm)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/form-editor/index.scss';
</style>
