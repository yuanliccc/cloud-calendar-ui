<template>
  <div>
    <div class="list-item flex-row flex-center" v-for="(item, index) in scheduleList" :key="index">
      <div class="" style="width: 80%">
        <div class="flex-row flex-start schedule-content-block">
          <div class="schedule-create-user-block flex-column flex-center">
            <div>
              <el-tooltip v-bind:content="item.createUserName" placement="top">
                <el-button type="success" circle>{{item.createUserName.substring(0, 1)}}</el-button>
              </el-tooltip>
            </div>
          </div>
          <div class="text-left" style="width: 90%; ">
            <div class="schedule-time-block flex-column flex-center">
              <div>
                <el-tooltip content="创建时间" placement="top">
                  <i class="el-icon-time color-green pointer">{{item.createTime | formatDate}}</i>
                </el-tooltip>
                <i class="el-icon-d-arrow-right"></i>
                <el-tooltip content="截止时间" placement="top">
                  <i class="el-icon-time color-green pointer">{{item.deadline | formatDate}}</i>
                </el-tooltip>
              </div>
            </div>
            <div class="schedule-content">
              {{item.content}}
            </div>
            <div>
              <div class="flex-row flex-start flex-grow" style="margin-bottom: 10px;">
                <div style="margin-right: 10px" v-for="(receiver, receiverIndex) in item.receivers" :key="receiverIndex">
                  <el-tooltip v-bind:content="receiver.name" placement="top">
                    <el-button v-if="receiver.isComplete === '否'" type="danger" circle>{{receiver.name.substring(0, 1)}}</el-button>
                    <el-button v-else type="success" circle>{{receiver.name.substring(0, 1)}}</el-button>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="width: 230px" class="flex-column flex-center">
        <!--<el-progress type="circle" v-bind:percentage="item.completeRate * 100"></el-progress>-->
        <el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="50" status="exception"></el-progress>
      </div>
      <div style="width: 40px;" class="flex-column flex-center">
        <div class="control-item">
          <el-button type="success" icon="el-icon-view" circle></el-button>
        </div>
        <div class="control-item">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
        </div>
        <div class="control-item">
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "scheduleList-diy"
    }
</script>

<style scoped>

</style>
