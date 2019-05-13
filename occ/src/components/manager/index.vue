<template>
  <div class="publicList">
    <div class="publicTitle">{{dateTime | formatDate}}</div>
    <el-container style="width: 100%;">
      <el-aside style="width:30%;height: 100%;padding-left: 50px;">
        <h4>今日工作日程</h4>
        <el-collapse accordion>
          <el-collapse-item  v-for="(item, index) in schedules" :key="index" :name="index">
            <template slot="title">{{item.schedule.title}}</template >
            <div>开始时间：<span class="time">{{item.schedule.starttime | formatDate1}}</span></div>
            <div>结束时间：<span class="time">{{item.schedule.endtime | formatDate1}}</span></div>
            <div>内容：{{item.schedule.content}}</div>
            <div>进度：
              <el-progress :text-inside="true" :stroke-width="18" :percentage="getPercentage(item.schedule)"></el-progress>
            </div>
            <div @click="jumpToSchedule(item.schedule.id)" class="detail">详情</div>
          </el-collapse-item>
        </el-collapse>
        <br/>
        <h4>今日节日</h4>
        <el-collapse accordion>
          <el-collapse-item  v-for="(item, index) in orgCalenders" :key="index" :name="index">
            <template slot="title">{{item.title}}</template >
            <div>开始时间：<span class="time">{{item.starttime | formatDate1}}</span></div>
            <div>结束时间：<span class="time">{{item.endtime | formatDate1}}</span></div>
            <div>内容：{{item.content}}</div>
          </el-collapse-item>
        </el-collapse>
      </el-aside>
      <el-container style="padding: 10px;overflow: auto;">
        <el-header class="operator_Icon">
          <div class="icon">
            <el-button type="success" icon="el-icon-chat-round" circle></el-button>
            <br/>
            <span class="icon_Tip">群发通知</span>
          </div>
          <div class="icon">
            <el-button type="success" icon="el-icon-chat-round" circle></el-button>
            <br/>
            <span class="icon_Tip">群发通知</span>
          </div>
          <div class="icon">
            <el-button type="success" icon="el-icon-chat-round" circle></el-button>
            <br/>
            <span class="icon_Tip">群发通知</span>
          </div>
          <div class="icon">
            <el-button type="success" icon="el-icon-chat-round" circle></el-button>
            <br/>
            <span class="icon_Tip">群发通知</span>
          </div>
          <div class="icon">
            <el-button type="success" icon="el-icon-chat-round" circle></el-button>
            <br/>
            <span class="icon_Tip">群发通知</span>
          </div>
          <div class="icon">
            <el-button type="success" icon="el-icon-chat-round" circle></el-button>
            <br/>
            <span class="icon_Tip">群发通知</span>
          </div>
          <div class="icon">
            <el-button type="success" icon="el-icon-chat-round" circle></el-button>
            <br/>
            <span class="icon_Tip">群发通知</span>
          </div>
          <div class="icon">
            <el-button type="success" icon="el-icon-chat-round" circle></el-button>
            <br/>
            <span class="icon_Tip">群发通知</span>
          </div>
        </el-header>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {formatDate} from '../../assets/lib/common'
  export default {
    name: "managerIndex",
    data(){
      return {
        dateTime:new Date(),
        schedules:[],
        orgCalenders:[],
      }
    },
    mounted() {
      let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
      this.timer = setInterval(() => {
        _this.dateTime = new Date(); // 修改数据date
      }, 1000);
      this.getAllSchedule();
      this.findAllOrgCalenderToday();
    },
    beforeDestroy() {
      if(this.timer){
        clearInterval(this.timer);
      }
    },
    filters:{
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      },
      formatDate1(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd');
      },
    },
    methods:{
      getAllSchedule: function(){
        this.$store.commit("showLoading");
        this.$axios.get("/occ/schedule/findAllScheduleToday").then(res =>{
          const data = res.data;
          this.schedules = data.data;
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
      findAllOrgCalenderToday: function(){
        this.$store.commit("showLoading");
        this.$axios.get("/occ/orgCalender/findAllOrgCalenderToday").then(res =>{
          const data = res.data;
          this.orgCalenders = data.data;
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
      jumpToSchedule: function(id){
        this.$router.push('/manager/scheduleDisplay/' + id);
      },
      getPercentage: function(e){
        const start = new Date(e.starttime);
        const end = new Date(e.endtime);
        const now = new Date();
        let dif = end.getTime() - start.getTime();
        let difN = now.getTime() - start.getTime();
        let day = Math.floor(dif / (1000 * 60 * 60 * 24));
        let dayN = Math.floor(difN / (1000 * 60 * 60 * 24));

        return (dayN / day) * 100;

      }
    }
  }
</script>

<style scoped>
  .time{
    color:deepskyblue;
  }
  .content{
    color:#ccc;
  }
  .eventTitle{
    color:#ccc;
  }
  .detail{
    color:cornflowerblue;
    cursor: pointer;
  }
  .detail:hover{
    color:red;
    text-decoration: underline;
  }
  .operator_Icon{
    padding-left: 40px;
    padding-top: 20px;
  }
  .icon{
    text-align: center;
    width: 15%;
    margin-top: 15px;
    cursor: pointer;
    float: left;
  }
  .icon_Tip{
    color:yellowgreen;
    line-height: 25px;
  }
</style>
