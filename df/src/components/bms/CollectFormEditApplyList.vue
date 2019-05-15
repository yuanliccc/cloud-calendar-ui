<template>
  <div class="apply-list-container flex-column" v-if="this.selectCondition.applyUserId != null">
    <div class="apply-list-header flex-row"></div>
    <div class="apply-list-line"></div>
    <div class="apply-list-main flex-column">
      <div class="apply-list-main-table">
        <el-table
          border
          style="width: 100%"
          :data="applyInfo"
          max-height="350">
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column prop="" fixed label="表单名称"></el-table-column>
          <el-table-column prop="" fixed label="申请人"></el-table-column>
          <el-table-column prop="" fixed label="表单所有人"></el-table-column>
          <el-table-column prop="" fixed label="状态"></el-table-column>
          <el-table-column prop="" fixed label="申请日期"></el-table-column>
          <el-table-column prop="" fixed label="处理日期"></el-table-column>
          <el-table-column prop="" fixed label="申请信息"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <div class="flex-row">
                <el-button size="mini" type="text">查看详情</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-block flex-center"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'collectFormEditApplyList',
  props: ['userInfo'],
  data () {
    return {
      applyInfo: [],
      selectCondition: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        applyUserId: this.userInfo
      }
    }
  }
}
</script>

<style scoped>
  .apply-list-container {
    padding-top:25px;
    width: 80%;
    margin: 0 auto;
  }
  .apply-list-line {
    width: 100%;
    height: 28px;
    margin: 0 auto;
    border-bottom: 1px solid #ddd;
    margin-bottom: 28px;
    text-align: center;
  }
  .pagination-block {
    padding-top: 5px;
  }
</style>
