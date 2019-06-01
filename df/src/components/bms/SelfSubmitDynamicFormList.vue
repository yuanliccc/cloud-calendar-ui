<template>
  <div v-if="this.user != null">
    <div class="self-submit-form-container flex-column">
      <div class="self-submit-form-header flex-row">
        <div class="self-submit-form-header-query-box">
          <div class="query-box-block">
            <el-select
              v-model="selectCondition.formId"
              filterable
              remote
              clearable
              reserve-keyword
              placeholder="请输入表单名称"
              :remote-method="findFormLikeName"
              :loading="loading">
              <el-option
                v-for="item in formOptions"
                :key="item.dynamicForm.name"
                :label="item.dynamicForm.name"
                :value="item.dynamicForm.id">
              </el-option>
            </el-select>
            <el-button type="primary" @click="findSelfSubmitFormByCondition">查询</el-button>
          </div>
          <!--<el-form ref="selectForm" :model="selectCondition" label-width="100px" style="width: 100%;">
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="表单名称">
                    <el-select
                      v-model="selectCondition.formId"
                      filterable
                      remote
                      clearable
                      reserve-keyword
                      placeholder="请输入关键词"
                      :remote-method="findFormLikeName"
                      :loading="loading">
                      <el-option
                        v-for="item in formOptions"
                        :key="item.dynamicForm.name"
                        :label="item.dynamicForm.name"
                        :value="item.dynamicForm.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item>
                    <el-button type="primary" @click="findSelfSubmitFormByCondition">查询</el-button>
                    <el-button @click="resetSelect">重置</el-button>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
            </el-row>
          </el-form>-->
        </div>
      </div>
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
            <el-table-column prop="dynamicForm.publishState" label="发布状态"></el-table-column>
            <el-table-column prop="collectForm.submitTime" fixed label="提交时间"></el-table-column>
            <el-table-column prop="collectForm.state" fixed label="状态"></el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <div class="flex-row">
                  <el-button size="mini" type="text" @click="displayFormInfo(scope.row)">查看详情</el-button>
                  <el-button v-if="scope.row.collectForm.state === '禁止编辑' && scope.row.dynamicForm.publishState !== '关闭'" size="mini" type="text" @click="openApplyDialog(scope.row)">申请编辑</el-button>
                  <el-button v-if="scope.row.collectForm.state === '可编辑'" size="mini" type="text" @click="editCollectForm(scope.row)">编辑</el-button>
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
        <el-dialog
          title="编辑收集表单申请"
          :visible.sync="dialogVisible"
          width="30%">
          <el-form ref="applyForm" :model="applyInfo" label-width="80px">
            <el-form-item label="申请理由">
              <el-input type="textarea" v-model="applyInfo.message"/>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitCollectFormEditApply">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import base64 from 'js-base64'
export default {
  name: 'selfSubmitDynamicForm',
  props: ['userInfo'],
  components: {
    base64
  },
  data () {
    return {
      user: this.userInfo,
      selectCondition: {
        pageSize: 10,
        pageNum: 1,
        total: 0,
        userId: this.userInfo.id,
        formId: null
      },
      selfSubmitFormInfo: [],
      multipleSelection: [],
      loading: false,
      formOptions: [],
      dialogVisible: false,
      applyInfo: {
        collectFormId: null,
        message: ''
      }
    }
  },
  methods: {
    // 点击编辑按钮后的操作
    editCollectForm: function (entity) {
      let formId = entity.dynamicForm.id
      formId = base64.Base64.encode(formId)
      let path = '/collectForm/' + formId
      this.$router.push({path: path})
    },
    // 提交编辑收集表单申请
    submitCollectFormEditApply: function () {
      if (this.applyInfo.collectFormId == null) {
        this.$message.warning('请选择要申请修改的表单')
        return
      }
      this.$axios.post('/df/collect/form/edit/apply/submitCollectFormEditApply', this.applyInfo)
        .then(res => {
          const code = res.data.code
          if (code === 200) {
            this.$message.success('申请成功,请等待表单所有人审批')
            this.applyInfo = {
              collectFormId: null,
              message: ''
            }
            this.dialogVisible = false
            this.selectCondition.pageNum = 1
            this.findSelfSubmitFormByCondition()
          }
        })
        .catch(error => {
          this.$message.error(error)
        })
    },
    // 点击申请编辑按钮后的操作
    openApplyDialog: function (entity) {
      this.applyInfo.collectFormId = entity.collectForm.id
      this.dialogVisible = true
    },
    // 根据表单的名称模糊查询表单信息
    findFormLikeName: function (formName) {
      this.loading = true
      this.$axios.get('/df/collect/form/findFormLikeName/' + formName)
        .then(res => {
          this.loading = false
          const code = res.data.code
          if (code === 200) {
            this.formOptions = res.data.data
          }
        })
        .catch(error => {
          this.loading = false
          this.$message.error(error)
        })
    },
    // 点击查询按钮后调用的方法
    resetSelect: function () {
      this.selectCondition.pageSize = 10
      this.selectCondition.pageNum = 1
      this.selectCondition.userId = this.user.id
      this.selectCondition.formId = null
      this.findSelfSubmitFormByCondition()
    },
    // 查询当前用户所填写的表单记录
    findSelfSubmitFormByCondition: function () {
      if (this.selectCondition.formId === '') {
        this.selectCondition.formId = null
      }
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
  .self-submit-form-header-query-box {
    width: 100%;
  }
</style>
