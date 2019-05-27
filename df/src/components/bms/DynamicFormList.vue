<template>
  <div>
    <div class="form-container flex-column">
      <div class="form-header flex-row">
        <div class="create-form-block">
          <el-button type="primary" icon="el-icon-plus" @click="addDynamicForm">创建表单</el-button>
        </div>
        <div class="query-box-block">
          <el-input  placeholder="请输入表单名查询......" class="input-with-select" v-model="selectCondition.name">
            <el-button slot="append" icon="el-icon-search" @click="selectDynamicForm"></el-button>
          </el-input>
        </div>
        <div class="query-condition-block">
        </div>
      </div>
      <div class="form-line">
      </div>
      <div class="form-list flex-column">
        <div class="list-block">
          <el-table border style="width: 100%" :data="dynamicFormInfo" @selection-change="handleSelectionChange" max-height="350">
            <el-table-column type="selection">
            </el-table-column>
            <el-table-column  prop="dfDynamicForm.name" label="表单名称"></el-table-column>
            <el-table-column  prop="dfDynamicForm.method" label="请求方式"></el-table-column>
            <el-table-column  prop="dfDynamicForm.createTime" label="创建时间"></el-table-column>
            <el-table-column  prop="holder.name" label="创建人"></el-table-column>
            <el-table-column  prop="dfDynamicForm.publishState" label="发布状态"></el-table-column>
            <el-table-column  prop="sharedForm.state" label="分享状态"></el-table-column>
            <el-table-column fixed="right" label="操作" width="350">
              <template slot-scope="scope">
                <div class="flex-row">
                  <el-button @click="editDynamicForm(scope.row)" size="mini" type="text">编辑</el-button>
                  <el-button @click="clickShare(scope.row)" size="mini" type="text"
                             v-if="scope.row.sharedForm == null || scope.row.sharedForm.state !== '正常'">分享</el-button>
                  <el-button @click="cancelShare(scope.row)" size="mini" type="text"
                             v-if="scope.row.sharedForm != null && scope.row.sharedForm.state === '正常'">取消分享</el-button>
                  <el-button @click="clickPublish(scope.row)" size="mini" type="text"
                             v-if="scope.row.dfDynamicForm.publishState !== '已发布'">发布</el-button>
                  <el-button @click="getPublishLink(scope.row)" size="mini" type="text"
                             v-if="scope.row.dfDynamicForm.publishState === '已发布'">发布地址</el-button>
                  <el-button @click="handleDelete(scope.row)" size="mini" type="text">删除</el-button>
                  <el-button v-if="scope.row.dfDynamicForm.publishState !== '未发布'"
                             @click="clickCollectInfoBtn(scope.row)" size="mini" type="text">信息收集</el-button>
                  <el-button v-if="scope.row.dfDynamicForm.publishState === '已发布'"
                             @click="clickCloseCollectBtn(scope.row)" size="mini" type="text">关闭发布</el-button>
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
import base64 from 'js-base64'
export default {
  name: 'dfList',
  components: {
    moment
  },
  data () {
    return {
      dynamicFormInfo: [],
      multipleSelection: [],
      selectCondition: {
        name: '',
        pageSize: 10,
        pageNum: 1,
        total: 0
      }
    }
  },
  mounted () {
    this.findDynamicFormByCondition()
  },
  methods: {
    // 关闭发布
    closePublishForm: function (formId) {
      this.$axios.get('/df/dynamic/form/closePublishForm/' + formId)
        .then(res => {
          const code = res.data.code
          if (code === 200) {
            this.$message.success('操作成功')
            this.selectCondition.pageNum = 1
            this.findDynamicFormByCondition()
          }
        })
        .catch(error => {
          this.$message.error(error)
        })
    },
    // 点击关闭发布按钮后的操作
    clickCloseCollectBtn: function (entity) {
      this.$confirm('是否关闭已经发布的表单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.closePublishForm(entity.dfDynamicForm.id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    // 点击信息收集按钮后的操作
    clickCollectInfoBtn: function (entity) {
      this.$router.push({path: '/collectList', query: {formId: entity.dfDynamicForm.id}})
    },
    // 取消分享
    cancelShare: function (entity) {
      this.$confirm('是否取消该表单的分享?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$axios.get('/df/shared/dynamic/form/cancelShareDynamicForm/' + entity.dfDynamicForm.id)
          .then(res => {
            this.$message.success('操作成功')
            this.selectCondition.pageNum = 1
            this.findDynamicFormByCondition()
          })
          .catch(error => {
            this.$message.error(error)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    // 点击获取发布链接后的操作
    getPublishLink: function (entity) {
      let formId = entity.dfDynamicForm.id
      formId = base64.Base64.encode(formId)
      this.$alert(window.location.host + '/collectForm/' + formId, '发布地址', {
        confirmButtonText: '确定',
        callback: (action) => {}
      })
    },
    // 点击发布按钮后的操作
    clickPublish: function (entity) {
      this.$confirm('是否分享该表单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.publishForm(entity.dfDynamicForm.id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    // 发布表单
    publishForm: function (formId) {
      this.$axios.get('/df/dynamic/form/publishDynamicForm/' + formId)
        .then(res => {
          const code = res.data.code
          if (code === 200) {
            let encodeId = formId
            encodeId = base64.Base64.encode(encodeId)
            this.$alert(window.location.host + '/collectForm/' + encodeId, '发布地址', {
              confirmButtonText: '确定',
              callback: (action) => {
                this.$message.info(action)
                this.selectCondition.pageNum = 1
                this.findDynamicFormByCondition()
              }
            })
          }
        })
        .catch(error => {
          this.$message.error(error)
        })
    },
    // 点击分享后的操作
    clickShare: function (entity) {
      this.$confirm('该操作将会分享该模板, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.share(entity.dfDynamicForm.id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    // 分享
    share: function (formId) {
      this.$axios.get('/df/dynamic/form/shareDynamicForm/' + formId)
        .then(res => {
          const code = res.data.code
          if (code === 200) {
            this.$message({
              message: '分享成功',
              type: 'success'
            })
            this.selectCondition.pageNum = 1
            this.findDynamicFormByCondition()
          }
        })
        .catch(error => {
          this.$message.error(error)
        })
    },
    // 点击发布模板后的操作
    publish: function () {

    },
    // 根据条件查询表单信息
    selectDynamicForm: function () {
      this.selectCondition.pageNum = 1
      this.findDynamicFormByCondition()
    },
    handlePageSizeChange: function (pageSize) {
      this.selectCondition.pageSize = pageSize
      this.findDynamicFormByCondition()
    },
    handleCurrentPageChange: function (currentPage) {
      this.selectCondition.pageNum = currentPage
      this.findDynamicFormByCondition()
    },
    addDynamicForm () {
      this.$router.push({path: '/dfWorkSpace', query: {operator: 'add'}})
    },
    editDynamicForm (row) {
      this.$router.push({path: '/dfWorkSpace', query: {operator: 'edit', formId: row.dfDynamicForm.id}})
    },
    // 点击删除按钮后的操作
    handleDelete: function (entity) {
      if (entity.sharedForm != null && entity.sharedForm.state === '正常') {
        this.$message.info('不允许删除已经被分享的表单信息')
        return
      }
      this.$confirm('此操作将删除表单信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteDynamicForm(entity)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    deleteDynamicForm: function (entity) {
      this.$axios.delete('/df/dynamic/form/deleteDynamicForm/' + entity.dfDynamicForm.id)
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.selectCondition.pageNum = 1
            this.findDynamicFormByCondition()
          }
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(val)
    },
    findDynamicFormByCondition: function () {
      this.$axios.post('/df/dynamic/form/findDynamicFormByCondition', this.selectCondition)
        .then(res => {
          const data = res.data
          if (data != null) {
            const result = data.data.listInfo

            for (let i = 0; i < result.length; i++) {
              if (result[i].dfDynamicForm.createTime != null) {
                result[i].dfDynamicForm.createTime = this.timeGST(result[i].dfDynamicForm.createTime)
              }
            }

            this.dynamicFormInfo = result
            this.selectCondition.total = data.data.total
          }
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    timeGST (utcTime) {
      return moment(utcTime).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>
<style scoped>

  .form-container {
    padding-top:25px;
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

  .pagination-block {
    padding-top: 5px;
  }
</style>
