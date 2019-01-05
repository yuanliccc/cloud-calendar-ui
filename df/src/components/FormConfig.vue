<template>
  <div class="form-config-container">
    <!-- label-position属性可以改变表单域标签的位置,可选值为top,left,right -->
    <el-form :label-position="labelPosition">
      <el-form-item label="表单名称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="请求方式">
        <el-input></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'top'
    }
  }
}
</script>

<style>
</style>
