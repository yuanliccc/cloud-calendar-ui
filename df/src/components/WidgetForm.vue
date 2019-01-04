<template>
  <div class="widget-form-container">
    <!--ElementUI表单
    |-- label-position:表单域标签的位置,如果为left或者为right时,则需要设置label-width
    |-- label-width:表单域标签的宽度,作为Form直接子元素的form-item会继承该值
     -->
    <el-form :label-position="data.config.labelPosition" :label-width="data.config.labelWidth + 'px'">
      <!--这里注意,需要给draggable元素设置最小高度,否则当该元素高度为0是,其余地方的组件无法拖动到这里-->
      <draggable class="widget-form-list" v-model="data.list"
        :options="{group:'people', ghostClass: 'ghost'}"
        @end="handleMoveEnd"
        @add="handleWidgetAdd">
        <template v-for="(element, index) in data.list">
          <template v-if="element.type === 'grid'">
            <!-- 当组件被加入到主容器中后会调用handleWidgetAdd方法为组件添加key,通过这个key来确定当前选中的元素 -->
            <div v-if="element && element.key" class="data-grid" :key="index + '_' + element.key">
              <!-- ElementUI Layout布局中对于el-row设置type为flex可以启用flex布局,并可通过justify属性的值定义子元素的排序方式
               justify的值有:start,center,end,space-between,space-around
               -->
              <el-row class="widget-grid" type="flex" justify="start" align="top" @click.native="handleSelectWidget(index)"
                      :class="{active: selectWidget.key == element.key}">
                <el-col v-for="(col, colIndex) in element.columns" :key="colIndex" :span="col.span">
                  <div style="border:1px dashed #999">
                    <!-- sync语法糖会被扩展为自动更新父组件属性的v-on监听器
                     当子组件需要更新父组件传递过去的值时,需要显示的触发一个更新事件
                     即子组件中的this.$emit('update:select', newValue)-->
                    <draggable class="widget-form-list-grid" v-model="col.list"
                      :options="{group:'people', ghostClass: 'ghost'}"
                      @end="handleMoveEnd"
                      @add="handleWidgetColAdd($event, element, colIndex)">
                      <widget-form-item v-for="(el, i) in col.list" :element="el" :index="i"
                        :data="col" :key="el.key + '_' + i" :select.sync="selectWidget">
                      </widget-form-item>
                    </draggable>
                  </div>
                </el-col>
                <el-button style="width: 30px; height:30px;" title="删除"
                  v-if="selectWidget.key == element.key" circle plain type="danger"
                  @click.stop="handleWidgetDelete(index)" icon="el-icon-delete">
                </el-button>
              </el-row>
            </div>
          </template>
          <template v-else>
            <!-- 当组件被加入到主容器中后会调用handleWidgetAdd方法为组件添加key,通过这个key来确定当前选中的元素 -->
            <widget-form-item v-if="element&&element.key" :key="index + '_' + element.key" :element="element"
              :index="index" :data="data" :select.sync="selectWidget"></widget-form-item>
          </template>
        </template>
      </draggable>
    </el-form>

  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import WidgetFormItem from './WidgetFormItem'

export default {
  components: {
    Draggable,
    WidgetFormItem
  },
  /**
   * data代表父组件传递过来的信息
   */
  props: ['data', 'select'],
  data () {
    return {
      selectWidget: this.select
    }
  },
  methods: {
    handleMoveEnd ({newIndex, oldIndex}) {
      console.log('拖拽主容器组件结束,新的下标及初始下标分别为: ', newIndex, oldIndex)
    },
    /**
     * 使用vuedraggable向主容器中拖拽元素时,会将该元素添加到主容器绑定的对象中,即data.list
     * 需要对组件进行一些必要的处理,例如设置key值等
     */
    handleWidgetAdd (evt) {
      console.log('向组容器中添加组件')
      console.log('添加组件的evt: ', evt)
      // 获取拖拽的组件新的下标
      const newIndex = evt.newIndex
      // 获取主容器
      const to = evt.to
      console.log(to)

      // 为拖拽到容器中的元素添加唯一的key
      const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
      // 这里的...代表ES6新增的扩展运算符,它的作用是将一个数组转为用逗号分隔的参数序列
      // 下述代码表示在新的拖动容器中更新组件信息
      this.$set(this.data.list, newIndex, {
        ...this.data.list[newIndex],
        options: {
          ...this.data.list[newIndex].options,
          remoteFunc: 'func_' + key
        },
        key: key,
        model: this.data.list[newIndex].type + '_' + key,
        rules: []
      })

      // 避免重复拖拽下拉框,单选框时显示的选项是遗留选项
      if (this.data.list[newIndex].type === 'radio' || this.data.list[newIndex].type === 'checkbox') {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          options: {
            ...this.data.list[newIndex].options,
            options: this.data.list[newIndex].options.options.map(item => ({
              ...item
            }))
          }
        })
      }

      // 将新的栅栏布局框的内容清空一次,避免带出前一个布局的内容组件
      if (this.data.list[newIndex].type === 'grid') {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          // eslint-disable-next-line
          columns: this.data.list[newIndex].columns.map(item => ({span:item.span, list:[]}))
        })
      }

      this.selectWidget = this.data.list[newIndex]
    },
    handleWidgetColAdd ($event, row, colIndex) {
      console.log('向栅栏组件中添加新组件', $event, row, colIndex)
      const newIndex = $event.newIndex
      const oldIndex = $event.oldIndex
      const item = $event.item

      // 为了防止将栅栏组件拖动到另外的栅栏的组件中
      if (item.className.indexOf('data-grid') >= 0) {
        // 如果是列表中拖拽的元素需要还原到原来位置
        // 用原来的内容替换oldIndex处的内容
        item.tagName === 'DIV' && this.data.list.splice(oldIndex, 0, row.columns[colIndex].list[newIndex])

        // 删除新下标处的内容
        row.columns[colIndex].list.splice(newIndex, 1)

        return false
      }

      const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)

      // 更新组件信息
      this.$set(row.columns[colIndex].list, newIndex, {
        ...row.columns[colIndex].list[newIndex],
        options: {
          ...row.columns[colIndex].list[newIndex].options,
          remoteFunc: 'func_' + key
        },
        key: key,
        // 绑定键值
        model: row.columns[colIndex].list[newIndex].type + '_' + key,
        rules: []
      })

      if (row.columns[colIndex].list[newIndex].type === 'radio' || row.columns[colIndex].list[newIndex].type === 'checkbox') {
        this.$set(row.columns[colIndex].list, newIndex, {
          ...row.columns[colIndex].list[newIndex],
          options: {
            ...row.columns[colIndex].list[newIndex].options,
            options: row.columns[colIndex].list[newIndex].options.options.map(item => ({
              ...item
            }))
          }
        })
      }

      this.selectWidget = row.columns[colIndex].list[newIndex]
    },
    handleSelectWidget (index) {
      console.log('选中了主容器中组件下标为' + index + '的组件')
      this.selectWidget = this.data.list[index]
    },
    handleWidgetDelete (index) {
      // 如果删除的元素时第一个或者最后一个元素,那么接下来默认选中的元素要么为空,要么就是最后一个的上一个元素
      if (this.data.list.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {}
        } else {
          this.selectWidget = this.data.list[index - 1]
        }
      } else {
        // 如果删除的元素时中间的元素,那么接下来默认选中的元素就是下一个元素
        this.selectWidget = this.data.list[index + 1]
      }

      /**
       * Vue实现响应式并不是数据发生变化之后DOM立即变化,而是按一定的策略进行DOM更新
       * $nextTick是在下次DOM更新循环结束之后执行延迟回调,在修改数据之后使用$nextTick,则可以在回调中获取更新后的DOM
       */
      this.$nextTick(() => {
        this.data.list.splice(index, 1)
      })
    }
  },
  watch: {
    select (val) {
      this.selectWidget = val
    },
    /**
     * deep属性代表深度监听
     * 受现在JavaScript的限制,Vue不能检测到对象属性的添加和删除，默认情况下handler只能监听obj这个属性它的引用变化
     * 我们只有给obj赋值的时候它才会监听到,如果需要监听obj里属性的值,就需要使用deep属性
     * deep意思就是深入观察,监听器会一层层往下遍历,给对象的所有属性加上这个监听器
     */
    selectWidget: {
      handler (val) {
        this.$emit('update:select', val)
      },
      deep: true
    }
  }
}
</script>

<style>
</style>
