<template>
  <div>
    <div class="form-container flex-column">
      <div class="form-header flex-row">
        <div class="create-form-block">
          <el-button type="primary" icon="el-icon-plus" >创建表单</el-button>
        </div>
        <div class="query-box-block">
          <el-input  placeholder="请输入表单名查询......" v-model="input5" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div class="query-condition-block">

        </div>
      </div>
      <div class="form-line">
      </div>
      <div class="form-list">
        这里是表格
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'dfList'
}
</script>
<style>
  .form-container {
    width: 80%;
    margin: 0 auto;
  }

  .form-line {
    width: 100%;
    height: 28px;
    margin: 0 auto;
    border-bottom: 1px solid #ddd;
    margin-bottom: 28px;
    text-align: center;
  }
</style>
