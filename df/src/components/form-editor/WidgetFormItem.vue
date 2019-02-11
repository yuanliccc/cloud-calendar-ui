<template>
  <!-- 在Form表单中,每一个表单域由一个Form-Item组件构成 -->
  <el-form-item v-if="element && element.key" class="widget-view" :label="element.name"
    :class="{active: selectWidget.key == element.key}"
    @click.native="handleSelectWidget(index)">
    <template v-if="element.type == 'input'">
      <el-input v-model="element.options.defaultValue">
      </el-input>
    </template>

    <template v-if="element.type == 'textarea'">
      <el-input type="textarea" :rows="4" v-model="element.options.defaultValue">
      </el-input>
    </template>

    <template v-if="element.type == 'checkbox'">
      <el-checkbox-group v-model="element.options.defaultValue">
        <el-checkbox v-for="(item, index) in element.options.options" :key="item.value + index" :label="item.value"></el-checkbox>
      </el-checkbox-group>
    </template>

    <template v-if="element.type == 'radio'">
      <el-radio-group v-model="element.options.defaultValue">
        <el-radio v-for="(item, index) in element.options.options" :key="item.value + index" :label="item.value"></el-radio>
      </el-radio-group>
    </template>

    <template v-if="element.type == 'select'">
      <el-select v-model="element.options.defaultValue">
        <el-option v-for="item in element.options.options" :key="item.value" :value="item.value" :label="item.value"></el-option>
      </el-select>
    </template>

    <template v-if="element.type == 'date'">
      <el-date-picker v-model="element.options.defaultValue" type="date">
      </el-date-picker>
    </template>

    <el-button title="删除" v-if="selectWidget.key == element.key" circle plain type="danger"
      @click.stop="handleWidgetDelete(index)" icon="el-icon-delete">
    </el-button>
  </el-form-item>
</template>

<script>
export default {
  props: ['element', 'select', 'index', 'data'],
  data () {
    return {
      selectWidget: this.select
    }
  },
  methods: {
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
    },
    handleSelectWidget (index) {
      this.selectWidget = this.data.list[index]
    }
  },
  watch: {
    select (val) {
      this.selectWidget = val
    },
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
