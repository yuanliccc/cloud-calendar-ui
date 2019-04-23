<template>
  <div class="calender col-lg-12">
    <div class="guide">
      <div class="today">
        <el-button @click="toDay" class="nextBt">
          今天
        </el-button>
      </div>
      <div class="toCenter">
        <el-button @click="preMonth" class="nextBt"><</el-button>
        <el-select  v-model="year" class="sel">
          <el-option v-for="i in yearList" :key="i.year" :value="i.year">{{i.year}}</el-option>
        </el-select>
        <el-select  v-model="month" class="sel">
          <el-option v-for="i in monthList" :key="i.month" :value="i.month">{{i.month}}</el-option>
        </el-select>
        <el-button @click="nextMonth" class="nextBt">></el-button>
      </div>
    </div>
    <div v-for="(item, index) in days" class="calender_day" >
      {{item}}
    </div>
    <div class="calender_day" v-for="i in space">
      {{i}}
    </div>
    <el-tooltip v-for="(item, index) in list" :key="item" effect="light" placement="top">
      <div slot="content">
        <span style="color: orangered">今日日程：每日9点会议室开会</span><br/>
        <span style="color: red">今日节日：国庆节</span>
      </div>
      <div class="calender_day" @click="changeDay(item)">
        <span :class="[item == day ? 'red':'']">{{item}}</span><br>
        <span style="color: red">国庆节</span><br/>
        <span style="color: orangered">每日9点会议室开会</span>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
  export default{
    name: 'calender',
    data: function () {
      return {
        today:Number,
        year: Number,
        month: Number,
        day: Number,
        months: [31, 1, 31, 30, 31, 30, 31, 31, 30, 31, 30 ,31],
        list: [1,2,3,4,5,6,7,8,9,10],
        days:["一","二","三","四","五","六","日"],
        yearList:[],
        monthList:[],
        showDaily: true,
        space:[]
      }
    },
    mounted: function () {
      for(let i = 1980; i < 2100;i++)
        this.yearList.push({"year":i});
      for(let i = 1; i <= 12; i++)
        this.monthList.push({"month":i});
      this.getToday();
      this.initDay();

    },
    watch:{
      day(value){

      },
      month(value){
        this.initDay();
      },
      year(value){
        this.initDay();
      }
    },
    methods: {
      getToday: function(){
        let date = new Date();
        this.today = date.getDate()
        this.day = date.getDate();
        this.month = date.getMonth() + 1; //月数+1位 月
        this.year = date.getFullYear();
      },
      toDay: function(){
        this.getToday();
        this.initDay;
      },
      selectDate: function(day){
        let date = new Date(day);
        this.day = date.getDate();
        this.month = date.getMonth() + 1; //月数+1位 月
        this.year = date.getFullYear();
      },
      initDay: function() {
        let startDay = new Date(this.year + "-" + this.month + "-01");
        this.list = [];
        this.space = [];
        //星期一为1，星期六为6，星期天为0
        const space = startDay.getDay() > 0 ? startDay.getDay() - 1 : 6;
        for (let i = 0; i < space; i++) {
          this.space.push('');
        }

        let isRunNian = ((this.year % 4 == 0) && (this.year % 100 != 0)) || (this.year % 400 == 0);
        if(this.month == 2 && isRunNian)
          this.months[1] = 29;
        else
          this.months[1] = 28;

        for(let i = 1; i <= this.months[this.month - 1]; i++)
          this.list.push(i);
      },
      nextMonth: function(){
        if(this.month == 12){
          this.month = 1;
          this.year += 1;
          this.day = 1;
        }else
          this.month += 1;

        this.initDay();
      },
      preMonth: function(){
        if(this.month == 1){
          this.month = 12;
          this.year -= 1;
          this.day = 1;
        }else
          this.month -= 1;

        this.initDay();
      },
      showOrClose: function(){
          this.showDaily = !this.showDaily;
      },
      changeDay:function(item){
        this.day = item;
      }
    }
  }
</script>

<style scoped>
  @import url('../../assets/lib/bootstrap/css/bootstrap.css');
  body{
    border: none;
    margin: 0px;
  }

  .today{
    float: left;
  }
  .red{
    color:red;
    font-weight: bolder;
    font-size: 18px;
  }
  .calender{
    border: 2px solid #f5f5f5;
    width:100%;
    overflow:hidden;
    padding-bottom: 20px;
  }
  .calender_day{
    width: 14.28%;
    border: 1px solid #ccc;
    height:90px;
    font-weight: bolder;
    padding-top: 30px;
    text-align: center;
    float: left;
    cursor: pointer;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
  }
  .calender_detail{
    width:50%;
  }
  .toCenter{
    text-align: center;
  }
  .nextBt{
    width:80px;
    height:40px;
    line-height: 14px;
  }
  .guide{
    margin: 10px 0;
  }
  .sel{
    width:80px;
    height:30px;
  }
  .index{
    width:90%;
    margin: 0 auto;
  }
</style>
