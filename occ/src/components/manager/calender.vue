<template>
  <div class="publicList">
    <el-calendar v-model="today">
      <template slot="dateCell" slot-scope="{date, data}">
        <el-tooltip effect="light" placement="top-start">
          <div slot="content">
            <span style="color: orangered">今日日程：<br/>
              <span v-for="i in detailInfo[date.getDate()]" v-if="date.getMonth() == today.getMonth()">
                <span>{{i.title}} : {{i.content}}</span><br/>
              </span>
            </span>
            <span style="color: red">今日节日：<br/>
            <span v-for="i in festival[date.getDate()]" v-if="date.getMonth() == today.getMonth()">
                <span>{{i.title}}</span><br/>
              </span>
            </span>
          </div>
          <p style="width:100%;height:100%;text-align: center;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
            <span :style="{color:(date.getMonth() == today.getMonth() ? 'green' : '')}">{{date.getDate()}}</span><br/>
            <span v-for="i in festival[date.getDate()]" v-if="date.getMonth() == today.getMonth()">
              <span :style="{color:i.color}">{{i.title}}</span><br/>
            </span>
            <span v-for="(item, index) in detailInfo[date.getDate()]" v-if="date.getMonth() == today.getMonth()">
              <span v-if="index == 0" style="color:lightcoral;">
                ★
              </span>
            </span>
           <!--<span v-if="detailInfo[date.getDate()].length > 0 && date.getMonth() == today.getMonth()" style="color:lightcoral;">
              ★
            </span>-->
          </p>

        </el-tooltip>
      </template>
    </el-calendar>
  </div>
</template>
<script>
  export default{
    name:"managerCalender",
    data(){
        return {
          today: new Date(),
          detailInfo:[],
          schedules:[],
          calenders:[],
          festival:[],
          colors:['#409eff','blue','greenyellow','darkorange']
        }
    },
    watch:{
        today: function(val, old){
          if(val.getMonth() != old.getMonth())
              this.displayCalender();
        }
    },
    mounted: function(){
      this.displayCalender();
    },
    methods:{
      displayCalender: function(){
        this.getAllOrgCalender();
      },
      getAllOrgCalender: function(){
        this.$store.commit("showLoading");
        this.$axios.get("/occ/orgCalender/findAllOrgCalenderThisMonth",{
            params:{dayTime: this.today.toString()}
        }).then(res =>{
          const data = res.data;
          this.calenders = data.data;
          this.$store.commit("hideLoading");
          this.getAllSchedule();
        }).catch(err =>{
          this.$store.commit("hideLoading")
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          });
        });
      },
      getAllSchedule: function(){
        this.$store.commit("showLoading");
        this.$axios.get("/occ/schedule/findAllScheduleThisMonth",{
          params:{dayTime: this.today.toString()}
        }).then(res =>{
          const data = res.data;
          this.schedules = data.data;

          this.flushDetail();
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
      flushDetail: function(){
        const month = this.today.getMonth() + 1;
        const year = this.today.getFullYear();
        const day = this.getDays();
        this.detailInfo = new Array(day + 1);
        this.festival = new Array(day + 1);
        let index = 0;

        for(let j = 0; j < this.detailInfo.length; j++){
          this.detailInfo[j] = [];
          this.festival[j] = [];
        }

        this.calenders.forEach(e =>{
          const start = new Date(e.starttime);
          const end = new Date(e.endtime);

          for (let i = start.getDate(); i <= end.getDate(); i++) {
            this.festival[i].push({
              title: e.title,
              color: 'red',
              content: e.content,
            });
          }
        });

        this.schedules.forEach(item =>{
          let e = item.schedule;
          let start = 1;
          let end = 0;
          const starttime = new Date(e.starttime);
          const endtime = new Date(e.endtime);
          const monthStart = new Date(year + "-" + month + "-01 00:00:00");
          const monthEnd = new Date(year + "-" + month + "-" + day +" 23:59:59");

          if(starttime < monthStart){
            start = 1;
            end = endtime <= monthEnd ? endtime.getDate() : day;
          }else if(starttime > monthStart){
            start = starttime.getDate();
            end = endtime <= monthEnd ? endtime.getDate() : day;
          }

          for(;start <= end; start++){
            this.detailInfo[start].push({
              title:e.title,
              content: e.content,
              level:2,
              color:this.colors[index],
            });
          }
          index++;
        });
      },
      getDays: function(){
        let theDay = this.today;
        const year = theDay.getFullYear();
        const month = theDay.getMonth() + 1;
        let days = 0;
        if(month == 2){
            days = (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) ? 29 : 28;
        }else if(month == 4 || month == 6 || month == 9 || month == 11)
            days = 30;
        else
            days = 31;

        return days;
      }
    }
  }
</script>
<style scoped></style>
