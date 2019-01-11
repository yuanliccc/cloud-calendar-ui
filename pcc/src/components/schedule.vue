<template>
  <div>
    <div class="title-block flex-row flex-start">
      <el-menu :default-active="activeItem" class="full-width" mode="horizontal" @select="exchange">
        <el-menu-item index="list">任务列表</el-menu-item>
        <el-menu-item index="add">新增任务</el-menu-item>
      </el-menu>
    </div>
    <div>
      <div class="list" v-if="activeItem === 'list'">
        <el-table
          :data="scheduleList"
          style="width: 100%">
          <el-table-column type="selection">

          </el-table-column>
          <el-table-column
            prop="content"
            label="任务内容" width="200">
          </el-table-column>
          <el-table-column
            prop="createUserName"
            label="创建人"
            width="100px" sortable>
          </el-table-column>
          <el-table-column
            prop="receiverName"
            label="接收人"
            width="100px" sortable>
          </el-table-column>
          <el-table-column
            label="创建时间"
            width="250" sortable>
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.creatTime | formatDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="截止时间"
            width="250" sortable>
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.deadline | formatDate }}</span>
            </template>
          </el-table-column>

          <!--<el-table-column
            prop="isComplete"
            label="是否完成" width="80">
          </el-table-column>-->
          <el-table-column
            label="Tags"  class="text-center">
            <template slot-scope="scope">
              <el-tag type="success">及时完成</el-tag>
              <el-tag type="info">超时完成</el-tag>
              <el-tag type="danger">未完成</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button type="success" icon="el-icon-view" circle></el-button>
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="add" v-if="activeItem === 'add'">
        <div>
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
            <el-form-item label="提醒时间">
              <el-date-picker class="flex-row flex-start"
                v-model="schedule.remindTime"
                type="datetime"
                placeholder="选择日期时间"
                align="left"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="截止时间">
              <el-date-picker class="flex-row flex-start"
                              v-model="schedule.deadline"
                              type="datetime"
                              placeholder="选择日期时间"
                              align="left"
                              :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addSchedule">提交</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import DateUtil from '../util/DateUtil'

  export default {
    name: "schedule",
    data: function () {
      return {
        scheduleList:[],
        activeItem:'list',
        schedule: {
          pccUserId: this.$store.getters.userInfo.id
        },
        scheduleReceivers:[],
        remindServices:[],
        selectRemindService:[],
        friends:[],
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
        }
      }
    },
    mounted: function() {
      this.relationList()
    },
    filters: {
      formatDate: function(dateStr) {

        if(!dateStr) {
          return ''
        }

        const date = new Date(dateStr)

        return DateUtil.formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods: {
      relationList: function() {
        this.$store.commit('showLoading')

        // 请求
        this.$axios.get('/pcc/schedule/relation', {
          params: {
            page:1,
            size: 20,
            pccUserId: this.$store.getters.userInfo.id
          }
        })
          .then(res => {
            const data = res.data

            if(data.data == null) {
              // 弹框
            }
            else {
              this.scheduleList = data.data.list
            }

            console.log(res.data)
            this.$store.commit('hideLoading')
          })
          .catch(err => {
            this.$store.commit('hideLoading')
          })

      },
      addSchedule: function() {
        this.$store.commit('showLoading')

        let data = {
          pccSchedule: this.schedule,
          scheduleReceivers: this.scheduleReceivers,
          remindServices: this.selectRemindService
        }

        // 请求
        this.$axios.post('/pcc/schedule/add', data)
          .then(res => {
            const data = res.data

            if(data.data == null) {
              // 弹框
            }
            else {
            }

            console.log(res.data)
            this.$store.commit('hideLoading')
          })
          .catch(err => {
            this.$store.commit('hideLoading')
          })

      },
      getRemindService: function() {
        this.remindServiceLoading = true
        // 请求
        this.$axios.get('/pcc/remind/service',{
          params: {
            page:1,
            size:20
          }
        })
          .then(res => {
            const data = res.data

            if(data.data == null) {
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
      exchange: function (item) {
        this.activeItem = item
        if(item === 'list') {
          this.relationList()
        }
        else if(item === 'add') {
          this.getFriends()
          this.getRemindService()
        }
      },
      getFriends: function () {
        this.friendsLoading = true
        // 请求
        this.$axios.get('/pcc/user/friends',{
          params: {
            pccUserId:this.$store.getters.userInfo.id
          }
        })
          .then(res => {
            const data = res.data

            if(data.data == null) {
              // 弹框
            }
            else {
              this.friends = data.data
            }
            let userInfo = this.$store.getters.userInfo
            let mine = {}
            mine.id = userInfo.id
            mine.name = '自己'
            this.scheduleReceivers.push(mine.id)

            this.friends.push(mine)
            console.log(res.data)
            this.friendsLoading = false
          })
          .catch(err => {
            this.friendsLoading = false
          })
      }
    }
  }
</script>

<style scoped>

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
