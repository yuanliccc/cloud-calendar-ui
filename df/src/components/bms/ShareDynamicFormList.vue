<template>
  <div>
    <div class="share-list-container flex-column">
      <div class="share-list-header flex-row">
        <div class="share-list-header-query-block">
          <el-form ref="selectForm" :model="selectCondition" label-width="100px" style="width: 100%;">
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="创建人">
                    <el-select
                      v-model="selectCondition.holderId"
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
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item>
                    <el-button type="primary" @click="findNormalSharedDynamicFormByCondition">查询</el-button>
                    <el-button @click="resetSelect">重置</el-button>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="share-list-line"></div>
      <div class="share-list-main flex-column">
        <div class="share-list-main-table">
          <el-table
            v-if="this.userInfo != null"
            border
            style="width: 100%"
            :data="shareFormInfo"
            max-height="350">
            <el-table-column prop="form.name" label="表单名称"></el-table-column>
            <el-table-column prop="holder.name" label="创建人"></el-table-column>
            <el-table-column prop="sharedDynamicForm.shareTime" label="分享时间"></el-table-column>
            <el-table-column prop="sharedDynamicForm.clonedCount" label="被克隆次数"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <div class="flex-row">
                  <el-button @click="displaySharedForm(scope.row)" size="mini" type="text">预览</el-button>
                  <el-button @click="clickClone(scope.row)" size="mini"
                              v-if="userInfo.id != scope.row.holder.id" type="text">克隆</el-button>
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
  name: 'shareList',
  props: ['userInfo'],
  data () {
    return {
      selectCondition: {
        pageSize: 10,
        pageNum: 1,
        total: 0,
        holderId: null
      },
      shareFormInfo: [],
      userOptions: [],
      loading: false
    }
  },
  methods: {
    cloneDynamicForm: function (sharedId, formId) {
      this.$axios.get('/df/shared/dynamic/form/cloneDynamicForm/' + sharedId + '/' + formId)
        .then(res => {
          const code = res.data.code
          if (code === 200) {
            this.$message.success('克隆成功')
            this.selectCondition.pageNum = 1
            this.findNormalSharedDynamicFormByCondition()
          }
        })
        .catch(error => {
          this.$message.error(error)
        })
    },
    // 点击克隆按钮按钮后的操作
    clickClone: function (entity) {
      this.$confirm('确定克隆该表单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const sharedId = entity.sharedDynamicForm.id
          const formId = entity.form.id
          this.cloneDynamicForm(sharedId, formId)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    // 点击预览按钮后的操作
    displaySharedForm: function (entity) {
      const formId = entity.form.id
      this.$router.push({path: '/dynamicFormDisplay', query: {formId: formId}})
    },
    // pageNum改变时调用的方法
    handleCurrentPageChange: function (currentPage) {
      this.selectCondition.pageNum = currentPage
      this.findNormalSharedDynamicFormByCondition()
    },
    // pageSize改变时调用的方法
    handlePageSizeChange: function (pageSize) {
      this.selectCondition.pageSize = pageSize
      this.findNormalSharedDynamicFormByCondition()
    },
    // 点击重置按钮后进行的操作
    resetSelect: function () {
      this.selectCondition.pageSize = 10
      this.selectCondition.pageNum = 1
      this.selectCondition.total = 0
      this.selectCondition.holderId = null
      this.findNormalSharedDynamicFormByCondition()
    },
    // 根据用户名称模糊查询用户信息
    findUserLikeName: function (name) {
      this.$axios.get('/df/user/findUserLikeName/' + name)
        .then(res => {
          const code = res.data.code
          if (code === 200) {
            const data = res.data.data
            this.userOptions = data
          }
        })
        .catch(error => {
          this.$message.error(error)
        })
    },
    // 根据条件查询分享的表单
    findNormalSharedDynamicFormByCondition: function () {
      this.$axios.post('/df/shared/dynamic/form/findNormalSharedDynamicFormByCondition', this.selectCondition)
        .then(res => {
          const code = res.data.code
          if (code === 200) {
            const data = res.data.data
            this.shareFormInfo = data.listInfo
            this.selectCondition.total = data.total

            for (let i = 0; i < this.shareFormInfo.length; i++) {
              this.shareFormInfo[i].sharedDynamicForm.shareTime = this.dateFormat(this.shareFormInfo[i].sharedDynamicForm.shareTime)
            }
          }
        })
        .catch(error => {
          this.$message.error(error)
        })
    },
    // 时间格式转化,解决时间相差8小时的问题
    dateFormat: function (date) {
      let format = 'yyyy-MM-dd HH:mm:ss'
      date = new Date(date)
      var o = {
        'M+': date.getMonth() + 1, // month
        'd+': date.getDate(), // day
        'H+': date.getHours() + 8, // hour+8小时
        'm+': date.getMinutes(), // minute
        's+': date.getSeconds(), // second
        'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
        'S': date.getMilliseconds() // millisecond
      }
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }

      for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        }
      }

      return format
    }
  },
  mounted () {
    this.findNormalSharedDynamicFormByCondition()
  }
}
</script>

<style scoped>
  .share-list-container {
    padding-top:25px;
    width: 80%;
    margin: 0 auto;
  }
  .share-list-header-query-block {
    width: 100%;
  }
  .share-list-line {
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
