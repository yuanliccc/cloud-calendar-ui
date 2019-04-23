<template>
  <div class="collect-list-container flex-column">
    <div class="collect-list-header flex-row">
      <div class="create-form-block">
        <el-button icon="el-icon-arrow-left" @click="cancel">返回</el-button>
      </div>
      <div class="query-box-block">
        <el-select
          v-model="selectCondition.userId"
          filterable
          remote
          clearable
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="findUserLikeName"
          :loading="loading">
          <el-option
            v-for="item in userOptions"
            :key="item.name"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="query-condition-block">
        <el-button icon="el-icon-arrow-left" @click="findCollectFormByCondition">查询</el-button>
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
            <el-table-column prop="dynamicForm.name" fixed label="表单名称"></el-table-column>
            <el-table-column prop="submiter.name" fixed label="提交人"></el-table-column>
            <el-table-column prop="collectForm.submitTime" fixed label="提交时间"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <div class="flex-row">
                  <el-button size="mini" type="text" @click="displayCollectFormItem(scope.row)">查看详情</el-button>
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
  name: 'collectList',
  components: {
    moment
  },
  data () {
    return {
      selectCondition: {
        userId: null,
        formId: null,
        pageSize: 10,
        pageNum: 1,
        total: 0

      },
      collectFormInfo: [],
      multipleSelection: [],
      loading: false,
      userOptions: []
    }
  },
  methods: {
    // 点击查看详情按钮后进行的操作
    displayCollectFormItem: function (entity) {
      this.$router.push({path: '/collectDisplay', query: {formId: entity.collectForm.id}})
    },
    // 根据用户名称模糊查询用户信息
    findUserLikeName: function (name) {
      if (name != null && name !== '') {
        this.loading = true
        this.$axios.get('/df/user/findUserLikeName/' + name)
          .then(res => {
            const code = res.data.code
            if (code === 200) {
              const data = res.data.data
              this.userOptions = data
              this.loading = false
            }
          })
          .catch(error => {
            this.$message.error(error)
          })
      }
    },
    // 根据条件查询收集表单信息
    findCollectFormByCondition: function () {
      this.$axios.post('/df/collect/form/findCollectFormByCondition', this.selectCondition)
        .then(res => {
          const code = res.data.code
          if (code === 200) {
            const data = res.data.data
            const listInfo = data.listInfo
            if (listInfo == null) {
              this.selectCondition.total = 0
              this.collectFormInfo = []
              return
            }
            for (let i = 0; i < listInfo.length; i++) {
              listInfo[i].collectForm.submitTime = this.timeGST(listInfo[i].collectForm.submitTime)
            }

            this.collectFormInfo = listInfo
            this.selectCondition.total = data.total
          }
        })
        .catch(error => {
          this.$message.error(error)
        })
    },
    // 分页当前页码改变时的回调方法
    handleCurrentPageChange: function (currentPage) {
      this.selectCondition.pageNum = currentPage
      this.findCollectFormByCondition()
    },
    // 分页每页显示的条目数改变时的回调方法
    handlePageSizeChange: function (pageSize) {
      this.selectCondition.pageSize = pageSize
      this.findCollectFormByCondition()
    },
    // 点击选择框时的回调操作
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 点击返回按钮后的操作
    cancel: function () {
      this.$router.go(-1)
    },
    // 将时间转化为GST格式
    timeGST (utcTime) {
      return moment(utcTime).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  mounted () {
    this.selectCondition.formId = this.$route.query.formId
    this.findCollectFormByCondition()
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
