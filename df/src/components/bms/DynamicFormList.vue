<template>
  <div>
    <div class="form-container flex-column">
      <div class="form-header flex-row">
        <div class="create-form-block">
          <el-button type="primary" icon="el-icon-plus" @click="addDynamicForm">创建表单</el-button>
        </div>
        <div class="query-box-block">
          <el-input  placeholder="请输入表单名查询......" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
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
            <el-table-column fixed prop="dfDynamicForm.name" label="表单名称"></el-table-column>
            <el-table-column fixed prop="dfDynamicForm.method" label="请求方式"></el-table-column>
            <el-table-column fixed prop="dfDynamicForm.createTime" label="创建时间"></el-table-column>
            <el-table-column fixed prop="holder.name" label="创建人"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <div class="flex-row">
                  <el-button @click="editDynamicForm(scope.row)" size="mini" type="text">编辑</el-button>
                  <el-button @click="handleDelete(scope.row)" size="mini" type="text">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination-block flex-center">
          <el-pagination
            :page-size="pageSize"
            :current-page="pageNum"
            layout="prev, pager, next"
            @size-change="handlePageSizeChange"
            @current-change="handleCurrentPageChange"
            :total="dataCount">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'dfList',
  components: {
    moment
  },
  data () {
    return {
      pageSize: 10,
      pageNum: 1,
      dataCount: 0,
      dynamicFormInfo: [],
      multipleSelection: []
    }
  },
  mounted () {
    this.findDynamicFormList(this.pageNum, this.pageSize)
  },
  methods: {
    handlePageSizeChange: function (pageSize) {
      this.pageSize = pageSize
      this.findDynamicFormList(this.pageNum, this.pageSize)
    },
    handleCurrentPageChange: function (currentPage) {
      this.pageNum = currentPage
      this.findDynamicFormList(this.pageNum, this.pageSize)
    },
    addDynamicForm () {
      this.$router.push({path: '/dfWorkSpace', query: {operator: 'add'}})
    },
    editDynamicForm (row) {
      this.$router.push({path: '/dfWorkSpace', query: {operator: 'edit', formId: row.dfDynamicForm.id}})
    },
    // 点击删除按钮后的操作
    handleDelete: function (entity) {
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
            this.pageNum = 1
            this.findDynamicFormList(this.pageNum, this.pageSize)
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
    findDynamicFormCount: function () {
      this.$axios.get('/df/dynamic/form/findDynamicFormCount')
        .then(res => {
          const data = res.data
          if (data != null) {
            this.dataCount = data.data
          }
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    findDynamicFormList: function (pageNum, pageSize) {
      this.$axios.get('/df/dynamic/form/findDynamicFormByLimit?pageNum=' + pageNum + '&pageSize=' + pageSize)
        .then(res => {
          const data = res.data
          if (data != null) {
            const result = data.data

            for (let i = 0; i < result.length; i++) {
              result[i].dfDynamicForm.createTime = this.timeGST(result[i].dfDynamicForm.createTime)
            }

            this.dynamicFormInfo = result
            this.findDynamicFormCount()
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
