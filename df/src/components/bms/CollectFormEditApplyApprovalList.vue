<template>
  <div class="approval-list-container flex-column" v-if="this.selectCondition.holderId != null">
    <div class="approval-list-header flex-row"></div>
    <div class="approval-list-line"></div>
    <div class="approval-list-main flex-column">
      <div class="approval-list-main-table">
        <el-table
          border
          style="width: 100%"
          :data="applyInfo"
          max-height="350">
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column prop="dfDynamicForm.name" fixed label="表单名称"></el-table-column>
          <el-table-column prop="applyUser.name" fixed label="申请人"></el-table-column>
          <el-table-column prop="holder.name" fixed label="表单所有人"></el-table-column>
          <el-table-column prop="applyInfo.state" fixed label="状态"></el-table-column>
          <el-table-column prop="applyInfo.applyDate" fixed label="申请日期"></el-table-column>
          <el-table-column prop="applyInfo.handleDate" fixed label="处理日期"></el-table-column>
          <el-table-column prop="applyInfo.message" fixed label="申请信息"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <div class="flex-row">
                <el-button v-if="scope.row.applyInfo != null && scope.row.applyInfo.state === '审核中'" size="mini" type="text" @click="clickAdoptApplyBtn(scope.row)">通过</el-button>
                <el-button v-if="scope.row.applyInfo != null && scope.row.applyInfo.state === '审核中'" size="mini" type="text" @click="clickRefuseApplyBtn(scope.row)">拒绝</el-button>
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
</template>

<script>
import moment from 'moment'
export default {
  name: 'collectFormEditapprovalApprovalList',
  props: ['userInfo'],
  components: {
    moment
  },
  data () {
    return {
      applyInfo: [],
      selectCondition: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        holderId: this.userInfo.id
      }
    }
  },
  methods: {
    refuseApply: function (applyId) {
      if (applyId !== null) {
        this.$axios.get('/df/collect/form/edit/apply/refuseApply/' + applyId)
          .then(res => {
            const code = res.data.code
            if (code === 200) {
              this.selectCondition.pageNum = 1
              this.findCollectFormEditApply()
            }
          })
          .catch(error => {
            this.$message.error(error)
          })
      }
    },
    // 点击拒绝申请按钮后的操作
    clickRefuseApplyBtn: function (entity) {
      this.$confirm('确定拒绝该申请吗', '是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.refuseApply(entity.applyInfo.id)
        })
        .catch(() => {
        })
    },
    // 通过申请
    adoptApply: function (applyId) {
      if (applyId !== null) {
        this.$axios.get('/df/collect/form/edit/apply/adoptApply/' + applyId)
          .then(res => {
            const code = res.data.code
            if (code === 200) {
              this.selectCondition.pageNum = 1
              this.findCollectFormEditApply()
            }
          })
          .catch(error => {
            this.$message.error(error)
          })
      }
    },
    // 点击通过申请按钮后的操作
    clickAdoptApplyBtn: function (entity) {
      this.$confirm('确定通过该申请吗', '是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.adoptApply(entity.applyInfo.id)
        })
        .catch(() => {
        })
    },
    // 分页当前页码改变时的回调方法
    handleCurrentPageChange: function (currentPage) {
      this.selectCondition.pageNum = currentPage
      this.findCollectFormEditApply()
    },
    // 分页每页显示的条目数改变时的回调方法
    handlePageSizeChange: function (pageSize) {
      this.selectCondition.pageSize = pageSize
      this.findCollectFormEditApply()
    },
    // 查询当前用户的申请信息
    findCollectFormEditApply: function () {
      console.log(this.userInfo)
      this.$axios.post('/df/collect/form/edit/apply/findCollectFormEditApply', this.selectCondition)
        .then(res => {
          const code = res.data.code
          if (code === 200) {
            const data = res.data.data
            for (let i = 0; i < data.list.length; i++) {
              if (data.list[i].applyInfo.applyDate !== null) {
                data.list[i].applyInfo.applyDate = this.timeGST(data.list[i].applyInfo.applyDate)
              }
              if (data.list[i].applyInfo.handleDate !== null) {
                data.list[i].applyInfo.handleDate = this.timeGST(data.list[i].applyInfo.handleDate)
              }
            }
            this.applyInfo = data.list
            this.selectCondition.total = data.total
            console.log(this.applyInfo)
          }
        })
        .catch(error => {
          this.$message.error(error)
        })
    },
    timeGST (utcTime) {
      return moment(utcTime).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  mounted () {
    this.findCollectFormEditApply()
  }
}
</script>

<style scoped>
  .approval-list-container {
    padding-top:25px;
    width: 80%;
    margin: 0 auto;
  }
  .approval-list-line {
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
