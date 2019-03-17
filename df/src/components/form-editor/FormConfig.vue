<template>
  <div class="form-config-container">
    <!-- label-position属性可以改变表单域标签的位置,可选值为top,left,right -->
    <el-form :label-position="labelPosition">
      <el-form-item label="表单名称">
        <el-input v-model="data.config.name"></el-input>
      </el-form-item>
      <el-form-item label="请求方式">
        <el-select v-model="data.config.method">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
      labelPosition: 'top',
      options: [{
        value: 'GET',
        label: 'GET'
      }, {
        value: 'POST',
        label: 'POST'
      }]
    }
  },
  watch: {
    data: {
      handler (val) {
        this.$emit('update:data', val)
      },
      deep: true
    }
  }
}
</script>

<style>
</style>
