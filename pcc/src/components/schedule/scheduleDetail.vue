<template>
  <div>
    <el-dialog width="850px" :visible.sync="isShow" :modal="true" :close-on-click-modal="false" :show-close="false">
      <div class="title flex-row flex-start" slot="title">
        <div class="flex-column flex-center">
          <el-checkbox v-model="trueData" disabled>任务</el-checkbox>
        </div>
        <div class="flex-column flex-center" style="margin-left: 10px">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>{{this.$store.getters.userInfo.name}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{listTitle}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="flex-grow flex-row flex-end">
          <div class="el-icon-close pointer" @click="closeDialog"></div>
        </div>
      </div>
      <div class="flex-row flex-center">
        <div class="full-width">
          <div class="content-block full-width text-left" contenteditable="true">{{scheduleDetail.content}}</div>

          <div class="flex-row flex-center column-block">
            <div class="flex-row flex-start column-label-block">
              <div class="fa fa-check-square flex-column flex-center"></div>
              <div class="flex-column flex-center column-label-title">状态</div>
            </div>
            <div class="flex-grow flex-column flex-center text-left">{{scheduleDetail.completeRate == 1 ? '已完成' : '未完成'}}</div>
          </div>

          <div class="flex-row flex-center column-block">
            <div class="flex-row flex-start column-label-block">
              <div class="fa fa-user-o flex-column flex-center"></div>
              <div class="flex-column flex-center column-label-title">创建人</div>
            </div>
            <div class="flex-grow flex-column flex-center text-left">
              {{scheduleDetail.createUserName}}
            </div>
          </div>

          <div class="flex-row flex-center column-block">
            <div class="flex-row flex-start column-label-block">
              <div class="fa fa-clock-o flex-column flex-center"></div>
              <div class="flex-column flex-center column-label-title">创建时间</div>
            </div>
            <div class="flex-grow flex-column flex-center text-left">
              {{scheduleDetail.createTime | formatDate}}
            </div>
          </div>

          <div class="flex-row flex-center column-block">
            <div class="flex-row flex-start column-label-block">
              <div class="fa fa-clock-o flex-column flex-center"></div>
              <div class="flex-column flex-center column-label-title">截止时间</div>
            </div>
            <div class="flex-grow flex-column flex-center text-left">
              {{scheduleDetail.deadline | formatDate}}
            </div>
          </div>

          <div class="flex-row flex-center column-block">
            <div class="flex-row flex-start column-label-block">
              <div class="fa fa-user-o flex-column flex-center"></div>
              <div class="flex-column flex-center column-label-title">参与者</div>
            </div>
            <div class="flex-grow flex-row flex-start">
              <div style="height:40px;margin-right: 10px;" class="flex-column flex-center"
                   v-for="(receiver, receiverIndex) in scheduleDetail.receivers" :key="receiverIndex">
                <el-tooltip v-bind:content="receiver.isComplete === '否' ?
              receiver.name + '（未完成）' : receiver.name + '（已完成）'" placement="top">
                  <div>
                    <el-button v-if="receiver.isComplete === '否'" type="danger" circle>{{receiver.name.substring(0, 1)}}</el-button>
                    <el-button v-else type="success" circle>{{receiver.name.substring(0, 1)}}</el-button>
                  </div>
                </el-tooltip>
              </div>
            </div>
          </div>

          <div class="additional-block" v-loading="isLoadingAdditionInfo" v-if="isShowReceiverSubmits
          && additionalInfo && additionalInfo.length > 0">
            <div class="flex-column flex-center text-left" style="color: #a6a6a6;font-size: 15px;margin-bottom: 10px;">
              完成情况
            </div>
            <div>
              <div v-for="(additional, additionalIndex) in additionalInfo" :key="additionalIndex">
                <div class="flex-row flex-start">
                  <el-button class="additional-user" type="success" circle>{{additional.username.substring(0, 1)}}</el-button>
                  <div class="info-font text-left flex-column flex-center">{{additional.username}}</div>
                  <div class="info-font text-left flex-column flex-center" style="margin-left: 20px">
                    {{additional.completeDate | formatDate}}
                  </div>
                </div>
                <div class="additional-content-block">
                  <div class="text-left info-font" v-for="(text, textIndex) in additional.texts">{{text.content}}</div>
                  <div class="file text-left" v-for="(file, fileIndex) in additional.files" :key="fileIndex">
                    <a class="fa fa-file"></a>
                    <a class="info-font">{{file.name}}</a></div>
                </div>
              </div>
            </div>
          </div>

          <div class="additional-block" v-loading="isLoadingComplete" v-if="isDisplayComplete">
            <div class="flex-column flex-center text-left" style="color: #a6a6a6;font-size: 15px;margin-bottom: 10px;">
              完成任务
            </div>
            <div v-for="(additionalInfoType, additionalInfoTypeIndex) in additionalInfoTypes" :key="additionalInfoTypeIndex">
              <div class="flex-grow additional-block-item" v-if="additionalInfoType.tableName === 'pcc_schedule_file'">
                <file-upload @uploadSuccess="uploadSuccess"></file-upload>
              </div>
              <div class="additional-block-item" v-if="additionalInfoType.tableName === 'pcc_schedule_text'">
                <el-input type="textarea" v-model="additionalText"></el-input>
              </div>
            </div>
            <div class="flex-row flex-end">
              <el-button size="medium" @click="completeSchedule">提交任务</el-button>
            </div>
          </div>
        </div>
        <div style="width: 300px;border-left: 1px solid #e5e5e5;">
          <div class="flex-column flex-center text-center" style="height: 36px;">任务统计</div>
          <div class="flex-row flex-around">
            <el-progress type="circle" :width="80" :percentage="100" status="text">共
              {{scheduleDetail.receivers?scheduleDetail.receivers.length : 0}} 人
            </el-progress>
            <el-progress type="circle" :width="80" :percentage="scheduleDetail.completeRate * 100" status="text">
              {{scheduleDetail.receiverCount * scheduleDetail.completeRate}} 人完成
            </el-progress>
          </div>
          <div class="flex-row flex-around" style="margin-top: 20px">
            <el-progress type="circle" :width="80" :percentage="100" color="#e6a23c">
              {{scheduleDetail.receivers?scheduleDetail.receivers.length : 0}} 人超时
            </el-progress>
            <el-progress type="circle" :width="80" :percentage="100" status="success">
              {{scheduleDetail.receiverCount * scheduleDetail.completeRate}} 人完成
            </el-progress>
          </div>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import fileUpload from '../file/fileUpload'
  import DateUtil from '../../util/DateUtil'

  export default {
    name: "scheduleDetail",
    components: {
      fileUpload
    },
    props: {
      scheduleDetail: Object,
      isShow: Boolean,
      listTitle: String
    },
    data: function () {
      return {
        trueData: true,
        additionalInfoTypes: [],
        files: [],
        additionalText: '',
        isLoadingComplete: false,
        isDisplayComplete: false,
        isShowReceiverSubmits: false,
        isLoadingAdditionInfo: false,
        additionalInfo: []
      }
    },
    filters: {
      formatDate: function (dateStr) {
        if (!dateStr) {
          return ''
        }
        const date = new Date(dateStr)
        return DateUtil.formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods: {
      completeSchedule: function () {
        this.isLoadingComplete = true
        let fileIds = this.parseFiles()

        let postData = {
          pccScheduleId: this.scheduleDetail.id,
          pccUserId: this.$store.getters.userInfo.id,
          fileIds: fileIds,
          text: this.additionalText
        }
        // 请求
        this.$axios.post('/pcc/schedule/complete', postData)
          .then(res => {
            const data = res.data
            // 触发数据更新事件
            this.$emit('dataUpdate')
            this.isLoadingComplete = false
            this.closeDialog()
          })
          .catch(err => {
            this.isLoadingComplete = false
            this.closeDialog()
        })
      },
      initCompleteData: function () {
        this.files = []
        this.additionalText = ''
      },
      closeDialog: function () {
        this.additionalInfoTypes = []
        this.additionalInfo = []
        this.$emit('close');
      },
      parseFiles: function () {
        let result = []
        for (var i = 0; i < this.files.length; i++) {
          result.push(this.files[i].id)
        }
        return result
      },
      getAdditionalInfo: function () {
        this.isLoadingAdditionInfo = true
        // 请求
        this.$axios.get('/pcc/schedule/additional', {
          params: {page: 1, size: 20, pccScheduleId: this.scheduleDetail.id}
        }).then(res => {
          const data = res.data
          if (data.data == null) {
            // 弹框
          }
          else {
            this.additionalInfo = data.data.list
            this.parseAdditionalInfo()
          }
          this.isLoadingAdditionInfo = false
        }).catch(err => {
          this.isLoadingAdditionInfo = false
        })
      },
      parseAdditionalInfo: function () {
        if(!this.additionalInfo || this.additionalInfo.length === 0) {
          return
        }
        for(var i = 0; i < this.additionalInfo.length; i++) {
          if(this.additionalInfo[i].textIds) {
            let texts = []
            const textIds = this.additionalInfo[i].textIds.split(',')
            const textes = this.additionalInfo[i].textes.split('`')
            if(textes.length === textIds.length) {
              for(var j = 0; j < textIds.length; j++) {
                let text = {}
                text.id = textIds[j]
                text.content = textes[j]
                texts.push(text)
              }
            }
            this.additionalInfo[i].texts = texts
          }

          if(this.additionalInfo[i].fileIds) {
            let files = []
            const fileIds = this.additionalInfo[i].fileIds.split(',')
            const fileNames = this.additionalInfo[i].fileNames.split('`')
            const urls = this.additionalInfo[i].urls.split(',')

            if(fileIds.length === fileNames.length && fileNames.length === urls.length) {
              for(var j = 0; j < fileIds.length; j++) {
                let file = {}
                file.id = fileIds[j]
                file.name = fileNames[j]
                file.url = urls[j]
                files.push(file)
              }
            }
            this.additionalInfo[i].files = files
          }
        }
      },
      getAdditionalInfoTypes: function () {
        this.isLoadingComplete = true
        // 请求
        this.$axios.get('/pcc/additional/info/type/list', {
          params: {pccScheduleId: this.scheduleDetail.id}
        }).then(res => {
          const data = res.data
          if (data.data == null) {
            // 弹框
          }
          else {
            this.additionalInfoTypes = data.data
            this.judgeIsCreator()
            this.judgeIsShowComplete()
          }
          this.isLoadingComplete = false
        }).catch(err => {
          this.isLoadingComplete = false
        })
      },
      uploadSuccess: function (files) {
        this.files = files
      },
      judgeIsShowComplete: function () {
        if (this.additionalInfoTypes && this.additionalInfoTypes.length != 0) {
          if (this.judgeCurrentUserIsComplete()) {
            this.isDisplayComplete = false
            this.isShowReceiverSubmits = true
          }
          else {
            this.isDisplayComplete = true
          }
        }
        else {
          this.isDisplayComplete = false
        }
      },
      // 判断登录人是否为任务创建人
      judgeIsCreator: function () {
        let userId = this.$store.getters.userInfo.id
        if (userId === this.scheduleDetail.createUserId) {
          this.isShowReceiverSubmits = true
        }
        else {
          this.isShowReceiverSubmits = false
        }
      },
      // 判断登录人是否已经完成当前任务
      judgeCurrentUserIsComplete: function () {
        let userId = this.$store.getters.userInfo.id

        if (this.scheduleDetail && this.scheduleDetail.receivers && this.scheduleDetail.receivers.length != 0) {
          for (var i = 0; i < this.scheduleDetail.receivers.length; i++) {
            if (userId === this.scheduleDetail.receivers[i].id && '是' === this.scheduleDetail.receivers[i].isComplete) {
              return true
            }
          }
          return false
        }
      }
    },
    watch: {
      'isShow': function (newValue) {
        if (newValue) {
          this.getAdditionalInfoTypes()
          this.getAdditionalInfo()
        }
      }
    }
  }
</script>

<style scoped>

  .additional-content-block {
    margin-left: 36px;
    margin-top: 10px;
  }

  .additional-user {
    margin-right: 10px;
  }

  .file {
    padding: 8px;
    margin: 4px 0;
    cursor: pointer;
    background-color: #f7f7f7;
    border-radius: 4px;
    transition: color 0.2s ease;
    width: 90%;
  }

  .info-font {
    color: #a6a6a6;
    font-weight: 400;
    font-size: 12px;
  }

  .additional-block-item {
    margin-bottom: 15px;
  }

  .additional-block {
    margin-top: 10px;
    padding-top: 20px;
    margin-right: 10px;
    border-top: 1px solid rgb(229, 229, 229);
  }

  .el-button.is-circle {
    padding: 6px;
  }

  .column-label-title {
    margin-left: 10px;
  }

  .column-label-block {
    width: 120px;
    color: #a6a6a6;
    font-size: 15px;
  }

  .column-block {
    height: 36px;
    width: 98%;
    margin-left: 1%;
    margin-top: 12px;
  }

  .content-block {
    padding: 8px;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    border-radius: 4px;
  }

  .content-block:hover {
    background: #f5f5f5;
  }

  .content-block:focus {
    background: #f5f5f5;
    outline: none;
  }

  .el-dialog__header {
    padding: 0 !important;
  }

  .el-dialog__body {
    padding: 0px;
  }

</style>
