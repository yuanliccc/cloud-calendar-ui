<template>
  <div class="publicFrom">
    <div class="publicTitle">查看机构工作日程</div>
    <div class="public_Display">
      <el-form label-position="left" ref="schedule"class="add_Edit" :model="schedule":inline="true"
            label-width="120px">
        <el-form-item label="标题">
          <el-input v-model="schedule.title" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="schedule.starttime"
            format="yyyy-MM-dd"
            type="datetime"
            disabled="disabled">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="schedule.endtime"
            format="yyyy-MM-dd"
            type="datetime"
            disabled="disabled">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="schedule.state" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="schedule.content"
                    type="textarea" disabled="disabled" resize="none" rows="6"></el-input>
        </el-form-item>
        <el-timeline style="padding-left: 0;">
          <el-timeline-item
            style="padding:0;"
            v-for="(i, index) in timeLine"
            placement="top"
            :timestamp="formatDate(i.time)"
            :color="i.tip == 'start' ? 'red' : 'balck'"
            :key="index">
            <el-card>
              <h4>{{i.title}}</h4>
              <p>{{i.time | formatDate}}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
        <div class="form_Bt">
          <el-form-item>
            <el-button type="primary" @click="reBack">确定</el-button>
            <el-button @click="reBack">取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
  import {formatDate} from '../../../assets/lib/common'
export default{
  name: 'scheduleDisplay',
  data(){
    return {
      schedule: {},
      timeLine:[],
      events:[],
      val:[],
    }
  },
  mounted: function(){
    this.getInfoById(this.$route.params.scheduleId);
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd');
    }
  },
  methods:{
    reBack: function(){
      this.$router.go(-1);
    },
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
    },
    getInfoById: function(scheduleId){

      this.$store.commit("showLoading");
      this.$axios.get('/occ/schedule/detail',{
        params:{id: scheduleId}
      }).then(res =>{
        const data = res.data;
        this.schedule = data.data;
        this.val = [this.schedule.starttime, this.schedule.endtime];
        this.disEvent(this.$route.params.scheduleId);
        this.$store.commit("hideLoading");

      }).catch(err => {
        this.$store.commit("hideLoading");
        this.$message({
          showClose: true,
          message: err,
          type: 'error'
        });
      })
    },
    disEvent: function(scheduleId){
      this.timeLine.push({
        title: '日程开始',
        level: 2,
        time: this.val[0],
        tip: 'start'
      });
      this.timeLine.push({
        title: '日程结束',
        level: 2,
        time: this.val[1],
        tip: 'end'
      });

      this.$store.commit("showLoading");
      this.$axios.get('/occ/event/getTheEventByScheduleId', {
        params:{id: scheduleId }
      }).then(res =>{
        const data = res.data;
        this.events = data.data;

        this.events.forEach(e =>{
          this.timeLine.push({
            title: e.type + ":" + e.title + "开始",
            level: e.level,
            time: e.starttime,
            tip: 'start'
          });

          this.timeLine.push({
            title: e.type + ":" + e.title + "结束",
            level: e.level,
            time: e.endtime,
            tip: 'end'
          });
        });

        this.timeLine.sort(function(a,b){
          if((new Date(a.time).getTime()) - (new Date(b.time).getTime()) == 0 && a.level > b.level)
            return 1;
          else if((new Date(a.time).getTime()) - (new Date(b.time).getTime()) == 0 && a.level < b.level)
            return -1;
          return (new Date(a.time).getTime()) - (new Date(b.time).getTime());
        });

        this.$store.commit("hideLoading");
      }).catch(err =>{
        this.$store.commit("hideLoading");
        this.$message({
          showClose: true,
          message: err,
          type: 'error'
        });
      });
    },
  }
}
</script>

<style scoped>
  .el-textarea__inner{
    height: 80px!important;
    font-weight: bolder!important;
    font-size: 18px!important;
  }
  .el-timeline{
    padding: 0!important;
  }
</style>
