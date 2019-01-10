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
                                 v-loading="friendsLoading">
                <el-checkbox-button v-for="(item, index) in friends"
                                    :label="item.id"
                                    :key="index">
                  {{item.name}}
                </el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="提醒服务">
              <el-checkbox-group v-loading="remindServiceLoading"
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
            <el-form-item>
              <el-button type="primary" @click="">提交</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "schedule",
    data: function () {
      return {
        activeItem:'add',
        schedule: {

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
      this.getFriends()
      this.getRemindService()
    },
    methods: {
      addSchedule: function() {
        this.$store.commit('showLoading')


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
