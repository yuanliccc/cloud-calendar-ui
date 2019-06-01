<template>
  <div v-if="show">
    <el-form label-position="top">
      <el-form-item label="标题" v-if="data.type != 'grid'">
        <el-input v-model="data.label"></el-input>
      </el-form-item>
      <el-form-item label="选项" v-if="data.type == 'checkbox' || data.type == 'radio' || data.type == 'select'">
        <template v-if="data.type == 'radio' || data.type == 'select'">
          <el-radio-group v-model="data.options.defaultValue">
            <!-- vuedraggable的options属性中,handle可以配置一个css选择器的字符串,使列表单元中符合选择器的元素
             称为拖动的手柄,只有按住手柄才能使列表单元进行拖动-->
            <draggable element="ul" :list="data.options.options"
              :options="{group:{name:'options'}, ghostClass:'ghost', handle: '.drag-item'}" style="padding-left: 0px;">
              <li v-for="(item, index) in data.options.options" :key="index">
                <el-radio :label="item.value" style="margin-right: 5px;">
                  <el-input style="width: 190px" size="mini" v-model="item.value"></el-input>
                </el-radio>
                <i class="drag-item" style="font-size: 16px; margin: 0 5px; cursor: move;"><icon name="bars"></icon></i>
                <el-button circle plain type="danger"
                  icon="el-icon-minus"
                  style="padding: 4px; margin-left: 5px;"
                  @click="handleOptionsRemove(index)"></el-button>
              </li>
            </draggable>
          </el-radio-group>
        </template>
        <template v-if="data.type == 'checkbox'">
          <el-checkbox-group v-model="data.options.defaultValue">
            <draggable element="ul" :list="data.options.options"
              :options="{group:{name:'options'}, ghostClass:'ghost', handle: '.drag-item'}" style="padding-left: 0px;">
              <li v-for="(item, index) in data.options.options" :key="index">
                <el-checkbox :label="item.value" style="margin-right: 5px;">
                  <el-input style="width: 190px" size="mini" v-model="item.value"></el-input>
                </el-checkbox>
                <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><icon name="bars" ></icon></i>
                <el-button circle plain type="danger"
                  icon="el-icon-minus"
                  style="padding: 4px; margin-left: 5px;"
                  @click="handleOptionsRemove(index)">
                </el-button>
              </li>
            </draggable>
          </el-checkbox-group>
        </template>
        <div style="margin-left: 22px;" v-if="data.type == 'checkbox' || data.type == 'radio' || data.type == 'select'">
          <el-button type="text" @click="handleAddOption">添加选项</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'

export default {
  components: {
    Draggable
  },
  props: ['data'],
  computed: {
    show () {
      /**
       * Object.keys方法仅返回可枚举属性和方法的名称,可以参考一下Java中Map接口的keys方法
       * 下面这个if语句用于判断当前是否有选中组件
       */
      if (this.data && Object.keys(this.data).length > 0) {
        return true
      }
      return false
    }
  },
  methods: {
    handleAddOption () {
      this.data.options.options.push({
        value: '新选项'
      })
    },
    handleOptionsRemove (index) {
      if (this.data.type === 'grid') {
        this.data.columns.splice(index, 1)
      } else {
        this.data.options.options.splice(index, 1)
      }
    }
  }
}
</script>

<style>
</style>
