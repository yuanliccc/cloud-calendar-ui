<template>
  <div class="collect-list-container flex-column">
    <div class="collect-list-header flex-row">
      <div class="create-form-block">
        <el-button icon="el-icon-arrow-left" @click="cancel">返回</el-button>
      </div>
      <div class="query-box-block">
        <el-input  placeholder="请输入提交人姓名查询......" class="input-with-select" v-model="selectCondition.userName">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="query-condition-block">
      </div>
    </div>
    <div class="collect-list-line">
      <div class="collect-lis-main flex-column">
        <div class="collect-lis-main-table">
          <el-table
            border
            style="width: 100%"
            :data="collectFormInfo"
            @selection-change="handleSelectionChange"
            max-height="350">
            <el-table-column type="selection">
            </el-table-column>
            <el-table-column fixed label="表单名称"></el-table-column>
            <el-table-column fixed label="提交人"></el-table-column>
            <el-table-column fixed label="提交时间"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <div class="flex-row">
                  <el-button size="mini" type="text">查看详情</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination-block flex-center">
          <el-pagination
            :page-size="selectCondition.pageSize"
            :current-page="selectCondition.pageNum"
            layout="prev, pager, next"
            @size-change="handlePageSizeChange"
            @current-change="handleCurrentPageChange"
            :total="selectCondition.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'collectList',
  data () {
    return {
      formId: null,
      selectCondition: {
        userName: '',
        pageSize: 10,
        pageNum: 1,
        total: 0

      },
      collectFormInfo: [],
      multipleSelection: []
    }
  },
  methods: {
    // 分页当前页码改变时的回调方法
    handleCurrentPageChange: function (currentPage) {
      this.selectCondition.pageNum = currentPage
      // TODO 查询收集表信息
    },
    // 分页每页显示的条目数改变时的回调方法
    handlePageSizeChange: function (pageSize) {
      this.selectCondition.pageSize = pageSize
      // TODO 查询收集表信息
    },
    // 点击选择框时的回调操作
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 点击返回按钮后的操作
    cancel: function () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.formId = this.$route.query.formId
  }
}
</script>

<style scoped>
  .collect-list-container {
    padding-top:25px;
    width: 80%;
    margin: 0 auto;
  }
  .collect-list-line {
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
