<template>
  <div style="background: #f5f5f5;">
    <div class="flex-row flex-start title-block">
      <!--<div class="search-form flex-row flex-start">-->
        <!--<div class="title-select-block">-->
          <!--<el-select v-model="filters[0].key" placeholder="请选择">-->
            <!--<el-option-->
              <!--v-for="item in filterOpinions"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.value">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</div>-->
        <!--<div>-->
          <!--<el-input-->
            <!--placeholder="请输入内容"-->
            <!--prefix-icon="el-icon-search"-->
            <!--v-model="filters[0].value">-->
          <!--</el-input>-->
        <!--</div>-->
        <!--<div>-->
          <!--<el-button type="primary" icon="el-icon-search"></el-button>-->
        <!--</div>-->
      <!--</div>-->
      <div class="flex-grow flex-row flex-end title-control-block">
        <el-button-group>
          <el-button type="primary" icon="el-icon-plus" @click="openAddScheduleDialog">新增</el-button>
        </el-button-group>
      </div>
    </div>
    <div>
      <div class="list">
        <div class="list-content flex-row flex-around">
          <div class="list-item-block">
            <div class="list-item-block-title flex-column flex-center text-center">所有相关任务</div>
            <schedule-list :schedule-items="scheduleList" listTitle="所有相关任务" @reloadList="init"></schedule-list>
          </div>
          <div class="list-item-block">
            <div class="list-item-block-title flex-column flex-center text-center">创建的任务</div>
            <schedule-list :schedule-items="createList" listTitle="创建的任务" @reloadList="init"></schedule-list>
          </div>
          <div class="list-item-block">
            <div class="list-item-block-title flex-column flex-center text-center">待完成任务</div>
            <schedule-list :schedule-items="untreatedList" listTitle="待完成任务" @reloadList="init"></schedule-list>
          </div>
          <div class="list-item-block">
            <div class="list-item-block-title flex-column flex-center text-center">已完成任务</div>
            <schedule-list :schedule-items="treatedList" listTitle="已完成任务" @reloadList="init"></schedule-list>
          </div>
        </div>
      </div>
      <el-dialog title="新增任务" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="schedule" label-width="80px">
          <el-form-item label="任务内容">
            <el-input type="textarea" v-model="schedule.content"></el-input>
          </el-form-item>
          <el-form-item label="接收人">
            <el-checkbox-group class="flex-row flex-wrap flex-start"
                               v-model="scheduleReceivers"
                               v-loading="friendsLoading"
                               element-loading-spinner="el-icon-loading">
              <el-checkbox-button v-for="(item, index) in friends"
                                  :label="item.id"
                                  :key="index">
                {{item.name}}
              </el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="提醒服务">
            <el-checkbox-group v-loading="remindServiceLoading"
                               element-loading-spinner="el-icon-loading"
                               class="flex-row flex-wrap flex-start"
                               v-model="selectRemindService"
            >
              <el-checkbox v-for="(item, index) in remindServices"
                           :label="item.id"
                           :key="index">
                {{item.name}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <!--<el-form-item label="提醒时间">-->
            <!--<el-date-picker class="flex-row flex-start"-->
                            <!--v-model="schedule.remindTime"-->
                            <!--type="datetime"-->
                            <!--placeholder="选择日期时间"-->
                            <!--align="left"-->
                            <!--:picker-options="pickerOptions">-->
            <!--</el-date-picker>-->
          <!--</el-form-item>-->
          <el-form-item label="截止时间">
            <el-date-picker class="flex-row flex-start"
                            v-model="schedule.deadline"
                            type="datetime"
                            placeholder="选择日期时间"
                            align="left"
                            :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="完成条件">
            <el-checkbox-group v-loading="remindServiceLoading"
                               element-loading-spinner="el-icon-loading"
                               class="flex-row flex-wrap flex-start"
                               v-model="selectAdditionalInfoTypes"
            >
              <el-checkbox v-for="(item, index) in additionalInfoTypes"
                           :label="item.id"
                           :key="index">
                {{item.name}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="addSchedule">提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>

  import DateUtil from '../util/DateUtil'
  import scheduleList from './schedule/scheduleList'

  export default {
    name: "schedule",
    data: function () {
      return {
        scheduleList: [],
        createList: [],
        untreatedList: [],
        treatedList: [],
        activeItem: 'list',
        completeConditions:[{}],
        schedule: {
          pccUserId: this.$store.getters.userInfo.id
        },
        filters: [{key: '', value: ''}],
        filterOpinions: [{value: 'name', label: '名字'}, {value: 'remark', label: '备注'}, {value: 'phone', label: '电话'},
          {value: 'email', label: '邮箱'}, {value: 'sex', label: '性别'}],
        dialogFormVisible: false,
        scheduleReceivers: [],
        remindServices: [],
        selectRemindService: [],
        selectAdditionalInfoTypes: [],
        friends: [],
        friendsLoading: false,
        remindServiceLoading: false,
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        additionalInfoTypeLoading: false,
        additionalInfoTypes: []
      }
    },
    components: {
      scheduleList
    },
    mounted: function () {
      this.init()
    },
    filters: {
      formatDate: function (dateStr) {
        if (!dateStr) {
          return ''
        }
        const date = new Date(dateStr)
        return DateUtil.formatDate(date, 'yyyy-MM-dd')
      }
    },
    methods: {
      init: function() {
        this.relationList()
        this.getCreateList()
        this.getTreatedList()
        this.getUntreatedList()
      },
      getUntreatedList: function () {
        this.$store.commit('showLoading')
        // 请求
        this.$axios.get('/pcc/schedule/untreated', {
          params: {
            page: 1,
            size: 20,
            pccUserId: this.$store.getters.userInfo.id
          }
        })
          .then(res => {
            const data = res.data
            if (data.data == null) {
              // 弹框
            }
            else {
              this.untreatedList = this.parseList(data.data.list)
            }
            console.log(res.data)
            this.$store.commit('hideLoading')
          })
          .catch(err => {
            this.$store.commit('hideLoading')
          })
      },
      getTreatedList: function () {
        this.$store.commit('showLoading')
        // 请求
        this.$axios.get('/pcc/schedule/treated', {
          params: {
            page: 1,
            size: 20,
            pccUserId: this.$store.getters.userInfo.id
          }
        })
          .then(res => {
            const data = res.data

            if (data.data == null) {
              // 弹框
            }
            else {
              this.treatedList = this.parseList(data.data.list)
            }

            console.log(res.data)
            this.$store.commit('hideLoading')
          })
          .catch(err => {
            this.$store.commit('hideLoading')
          })

      },
      getCreateList: function () {
        this.$store.commit('showLoading')

        // 请求
        this.$axios.get('/pcc/schedule/create', {
          params: {
            page: 1,
            size: 20,
            pccUserId: this.$store.getters.userInfo.id
          }
        })
          .then(res => {
            const data = res.data

            if (data.data == null) {
              // 弹框
            }
            else {
              this.createList = this.parseList(data.data.list)
            }

            console.log(res.data)
            this.$store.commit('hideLoading')
          })
          .catch(err => {
            this.$store.commit('hideLoading')
          })

      },
      relationList: function () {
        this.$store.commit('showLoading')

        // 请求
        this.$axios.get('/pcc/schedule/relation', {
          params: {
            page: 1,
            size: 20,
            pccUserId: this.$store.getters.userInfo.id
          }
        })
          .then(res => {
            const data = res.data

            if (data.data == null) {
              // 弹框
            }
            else {
              this.scheduleList = this.parseList(data.data.list)
            }

            console.log(res.data)
            this.$store.commit('hideLoading')
          })
          .catch(err => {
            this.$store.commit('hideLoading')
          })

      },
      parseList: function (list) {
        for (var i = 0; i < list.length; i++) {
          let receivers = []

          let receiverNames = list[i].receiverNames.split(',')
          let receiverIds = list[i].receiverIds.split(',')
          let psuIds = list[i].psuIds.split(',')
          let isCompletes = list[i].isCompletes.split(',')

          let completeCount = 0
          for (var j = 0; j < receiverIds.length; j++) {
            let receiver = {}
            receiver.id = parseInt(receiverIds[j])
            receiver.name = receiverNames[j]
            receiver.isComplete = isCompletes[j]
            receiver.psuId = parseInt(psuIds[j])

            if (receiver.isComplete === '是') {
              completeCount++
            }
            receivers.push(receiver)
          }
          list[i].receivers = receivers
          list[i].completeRate = completeCount / list[i].receiverCount
        }
        return list
      },
      addSchedule: function () {
        this.dialogFormVisible = false
        this.schedule.remindTime = this.schedule.deadline
        this.$store.commit('showLoading')
        let data = {
          pccSchedule: this.schedule,
          scheduleReceivers: this.scheduleReceivers,
          remindServices: this.selectRemindService,
          additionalInfoTypes: this.selectAdditionalInfoTypes
        }
        // 请求
        this.$axios.post('/pcc/schedule/add', data)
          .then(res => {
            const data = res.data
            if (data.data == null) {
              // 弹框
            }
            else {
            }
            console.log(res.data)
            this.$store.commit('hideLoading')
            this.$message({message: '添加任务成功',type: 'success'})
            this.init()
          })
          .catch(err => {
            this.$store.commit('hideLoading')
            this.$message.error('添加任务失败');
          })
      },
      getRemindService: function () {
        this.remindServiceLoading = true
        // 请求
        this.$axios.get('/pcc/remind/service', {
          params: {
            page: 1,
            size: 20
          }
        })
          .then(res => {
            const data = res.data

            if (data.data == null) {
              // 弹框
            }
            else {
              this.remindServices = data.data.list
            }

            console.log(res.data)
            this.remindServiceLoading = false
          })
          .catch(err => {
            this.remindServiceLoading = false
          })
      },
      getAdditionalInfoType: function () {
        this.additionalInfoTypeLoading = true
        // 请求
        this.$axios.get('/pcc/additional/info/type', {
          params: {
            page: 1,
            size: 20
          }
        })
          .then(res => {
            const data = res.data

            if (data.data == null) {
              // 弹框
            }
            else {
              this.additionalInfoTypes = data.data.list
            }

            console.log(res.data)
            this.additionalInfoTypeLoading = false
          })
          .catch(err => {
            this.additionalInfoTypeLoading = false
          })
      },
      getFriends: function () {
        this.friendsLoading = true
        // 请求
        this.$axios.get('/pcc/user/friends', {
          params: {
            pccUserId: this.$store.getters.userInfo.id
          }
        })
          .then(res => {
            const data = res.data

            if (data.data == null) {
              // 弹框
            }
            else {
              this.friends = data.data
            }
            let userInfo = this.$store.getters.userInfo
            let mine = {}
            mine.id = userInfo.id
            mine.name = '自己'
            this.scheduleReceivers = []
            this.scheduleReceivers.push(mine.id)

            this.friends.push(mine)
            console.log(res.data)
            this.friendsLoading = false
          })
          .catch(err => {
            this.friendsLoading = false
          })
      },
      openAddScheduleDialog: function () {
        this.schedule = {pccUserId: this.$store.getters.userInfo.id}
        this.getFriends()
        this.getRemindService()
        this.getAdditionalInfoType()
        this.dialogFormVisible = true
      }
    }
  }
</script>

<style scoped>



  .list-content {
    width: 100%;
  }

  .list-item-block {
    width: 23%;
  }

  .list-item-block-title {
    border-bottom: 1px solid #ebeef5;
    height: 40px;
  }

  .control-item {
    margin-bottom: 5px;
  }

  .list-item {
    border-bottom: 1px solid #ebeef5;
  }

  .schedule-content {
    height: 70px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .schedule-time-block {
    height: 30px;
  }

  .schedule-create-user-block {
    width: 80px;
  }

  .schedule-content-block {
  }

  .title-control-block {
    margin-right: 20px;
  }

  .title-select-block {
    width: 100px;
  }

  .search-form {
    width: 50%;
  }

  .title-block {
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 10px;
  }

  .add {
    margin: 10px;
  }

  .active-title-item {
    background: var(--commonColor);
    color: white;
  }

  .title-item {
    width: 80px;
    height: 100%;
    cursor: pointer;
  }

  .title-item:hover {
    background: var(--commonColor);
    color: white;
  }

  .title-block {
    width: 100%;
  }
</style>
