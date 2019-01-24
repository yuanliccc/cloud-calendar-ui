<template>
  <div>
    <div class="flex-column flex-center text-center none-block" v-if="!scheduleItems || scheduleItems.length == 0">
      暂无
    </div>
    <div class="list-item-block-content-item" v-for="(schedule, index) in scheduleItems" :key="index" @click="showScheduleDetail(schedule)">
      <div class="flex-row flex-start list-item-block-content-item-content">
        <!--<div class="list-item-block-content-item-complete">
          <el-button class="el-icon-check" type="success" circle></el-button>
        </div>-->
        <div class="flex-grow text-left" style="margin-left: 10px;">
          <div>
            {{schedule.content}}
          </div>
          <div class="flex-row flex-start" style="margin-top: 10px;">
            <el-tooltip content="截止时间" placement="top">
              <span class="deadline">{{schedule.deadline | formatDate}} 截止</span>
            </el-tooltip>
          </div>
        </div>
        <div class="list-item-block-content-item-creator">
          <el-tooltip v-bind:content="'任务创建人：' + schedule.createUserName" placement="top">
            <el-button circle>{{schedule.createUserName.substring(0, 1)}}</el-button>
          </el-tooltip>
        </div>
      </div>
      <div style="margin-bottom: 10px;">
        <div class="text-left" style="margin-top: 10px;padding-left: 10px;border-bottom: 1px solid whitesmoke;padding-bottom: 3px;">接收人</div>
        <div class="flex-row flex-start flex-grow" style="overflow: hidden">
          <div style="height:40px;margin-left: 10px;" class="flex-column flex-center"
               v-for="(receiver, receiverIndex) in schedule.receivers" :key="receiverIndex">
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
    </div>
    <schedule-detail :schedule-detail="currentSchedule"
                     :is-show="isShowDetail"
                     :listTitle="listTitle"
                     @close="closeScheduleDetail" @dataUpdate="reloadList"></schedule-detail>
  </div>
</template>

<script>
  import scheduleDetail from './scheduleDetail'
  import DateUtil from '../../util/DateUtil'
export default {
  name: "scheduleList",
  components: {
    scheduleDetail
  },
  data: function() {
    return {
      isShowDetail: false,
      currentSchedule: {}
    }
  },
  props: {
    scheduleItems:{
      type:Array
    },
    listTitle:String
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
    showScheduleDetail: function (schedule) {
      this.currentSchedule = schedule
      this.isShowDetail = true
    },
    closeScheduleDetail: function () {
      this.isShowDetail = false
    },
    reloadList: function () {
      this.$emit('reloadList')
    }
  }
}
</script>

<style scoped>

  .none-block {
    height: 40px;
    background: white;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    font-size: 15px;
    color: rgba(128, 128, 128, 0.76);
  }

  .el-button.is-circle {
    border-radius: 50%;
    padding: 6px;
  }

  .deadline {
    color: #fff;
    background-color: #3da8f5;
    display: inline-block;
    height: 20px;
    padding: 0 8px;
    line-height: 20px;
    font-size: 12px;
    border-radius: 4px;
    vertical-align: middle;
  }

  .list-item-block-content-item-creator {
    width: 50px;
  }

  .list-item-block-content-item-content {
    padding-top: 10px;
  }

  .list-item-block-content-item-complete {
    width: 50px;
  }

  .list-item-block-content-item {
    cursor: pointer;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
  }
</style>
