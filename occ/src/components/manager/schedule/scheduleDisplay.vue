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
        <el-timeline>
          <el-timeline-item
            style="padding:0!important;"
            v-for="(i, index) in timeLine"
            color="#0bbd87"
            :timestamp="formatDate(i)"
            :key="index">
            <span v-if="index == 0">开始</span>
            <span v-if="index != 0">结束</span>
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
    timeLine:[]
    }
  },
  mounted: function(){
    this.getInfoById(this.$route.params.scheduleId);
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
        this.timeLine = [this.schedule.starttime, this.schedule.endtime];
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
