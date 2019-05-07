<template>
  <div v-if="this.user != null">
    <div class="self-submit-form-container flex-column">
      <div class="self-submit-form-header flex-row"></div>
      <div class="self-submit-form-line"></div>
      <div class="self-submit-form-main flex-column">
        <div class="self-submit-form-main-table">
          <el-table
            border
            style="width: 100%"
            :data="selfSubmitFormInfo"
            @selection-change="handleSelectionChange"
            max-height="350">
            <el-table-column type="selection">
            </el-table-column>
            <el-table-column prop="dynamicForm.name" fixed label="表单名称"></el-table-column>
            <el-table-column prop="submiter.name" fixed label="提交人"></el-table-column>
            <el-table-column prop="collectForm.submitTime" fixed label="提交时间"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <div class="flex-row">
                  <el-button size="mini" type="text" @click="displayFormInfo(scope.row)">查看详情</el-button>
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
import moment from 'moment'
export default {
  name: 'selfSubmitDynamicForm',
  props: ['userInfo'],
  data () {
    return {
      user: this.userInfo,
      selectCondition: {
        pageSize: 10,
        pageNum: 1,
        total: 0,
        userId: this.userInfo.id
      },
      selfSubmitFormInfo: [],
      multipleSelection: []
    }
  },
  methods: {
    // 查询当前用户所填写的表单记录
    findSelfSubmitFormByCondition: function () {
      this.$axios.post('/df/collect/form/findSelfSubmitFormByCondition', this.selectCondition)
        .then(res => {
          const code = res.data.code
          if (code === 200) {
            const data = res.data.data
            const listInfo = data.listInfo

            if (listInfo != null) {
              for (let i = 0; i < listInfo.length; i++) {
                listInfo[i].collectForm.submitTime = this.timeGST(listInfo[i].collectForm.submitTime)
              }

              this.selfSubmitFormInfo = listInfo
              this.selectCondition.total = data.total
            }
          }
        })
        .catch(error => {
          this.$message.error(error)
        })
    },
    // 点击选择框时的回调操作
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 点击查看详情按钮后进行的操作
    displayFormInfo: function (entity) {
      this.$router.push({path: '/collectDisplay', query: {formId: entity.collectForm.id}})
    },
    // 当前页码发生变化时的回调方法
    handleCurrentPageChange: function (val) {
      this.selectCondition.pageNum = val
      this.findSelfSubmitFormByCondition()
    },
    // 点每页展示的数量发生变化时的回调方法
    handlePageSizeChange: function (val) {
      this.selectCondition.pageSize = val
      this.findSelfSubmitFormByCondition()
    },
    // 将时间转化为GST格式
    timeGST (utcTime) {
      return moment(utcTime).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  mounted () {
    console.log(this.userInfo)
    if (this.user != null) {
      this.findSelfSubmitFormByCondition()
    }
  }
}
</script>

<style scoped>
  .self-submit-form-container {
    padding-top:25px;
    width: 80%;
    margin: 0 auto;
  }
  .self-submit-form-line {
    width: 100%;
    height: 28px;
    margin: 0 auto;
    border-bottom: 1px solid #ddd;
    margin-bottom: 28px;
    text-align: center;
  }
</style>
