<template>
  <div class="calender col-lg-12">
    <div class="guide">
      <div class="today">
        <button @click="toDay" class="nextBt">
          今天
        </button>
      </div>
      <div class="toCenter">
        <button @click="preMonth" class="nextBt"><</button>
        <select  v-model="selectDay.year" @change="initDay" class="sel">
          <option v-for="item in selYear">{{item}}</option>
        </select>
        <select  v-model="selectDay.month" @change="initDay" class="sel">
          <option v-for="item in selMonth">{{item}}</option>
        </select>
        <button @click="nextMonth" class="nextBt">></button>
      </div>
    </div>

    <div v-for="(item, index) in days" class="calender_day" >
      {{item}}
    </div>
    <div v-for="(item, index) in list" class="calender_day" @click="changeDay(item)">
      <span v-if="item == today.day" class="red">{{item}}</span>
      <span v-else>{{item}}</span>
      <div class="calender_detail">

      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'calender',
    data: function () {
      return {
        today: {
          year: Number,
          month: Number,
          day: Number
        },
        selectDay: {
          year: Number,
          month: Number,
          day: Number
        },
        year: Number,
        month: Number,
        day: Number,
        months: [31, 1, 31, 30, 31, 30, 31, 31, 30, 31, 30 ,31],
        list: [1,2,3,4,5,6,7,8,9,10],
        days:["日","一","二","三","四","五","六"],
        selYear:[],
        selMonth:[1,2,3,4,5,6,7,8,9,10,11,12],
      }
    },
    mounted: function () {
      for(let i = 1980; i < 2100;i++)
        this.selYear.push(i);
      this.getToday();
      this.initDay();

    },
    methods: {
      getToday: function(){
        let date = new Date();
        this.today.day = date.getDate();
        this.today.month = date.getMonth() + 1; //月数+1位 月
        this.today.year = date.getFullYear();

        this.selectDay.day = date.getDate();
        this.selectDay.month = date.getMonth() + 1; //月数+1位 月
        this.selectDay.year = date.getFullYear();
      },
      toDay: function(){
        this.getToday();
        this.initDay;
      },
      selectDate: function(day){
        let date = new Date(day);
        this.selectDay.day = date.getDate();
        this.selectDay.month = date.getMonth() + 1; //月数+1位 月
        this.selectDay.year = date.getFullYear();
      },
      initDay: function() {
        let startDay = new Date(this.selectDay.year + "-" + this.selectDay.month + "-01");
        this.list = [];
        for (let i = 0; i < startDay.getDay(); i++) {
          this.list.push('');
        }
        let isRunNian = ((this.selectDay.year % 4 == 0) && (this.selectDay.year % 100 != 0)) || (this.selectDay.year % 400 == 0);
        if(this.selectDay.month == 2 && isRunNian)
          this.months[1] = 29;
        else
          this.months[1] = 28;

        for(let i = 1; i <= this.months[this.selectDay.month - 1]; i++)
          this.list.push(i);
        console.log(this.list);
      },
      nextMonth: function(){
        if(this.selectDay.month == 12){
          this.selectDay.month = 1;
          this.selectDay.year += 1;
          this.selectDay.day = 1;
        }else
          this.selectDay.month += 1;

        this.initDay();
      },
      preMonth: function(){
        if(this.selectDay.month == 1){
          this.selectDay.month = 12;
          this.selectDay.year -= 1;
          this.selectDay.day = 1;
        }else
          this.selectDay.month -= 1;

        this.initDay();
      },
      changeDay: function(item){
        if(item != '')
          this.today.day = item;
      },
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
    height: 560px;
    padding-bottom: 20px;
  }
  .calender_day{
    width: 14.28%;
    border: 1px solid #ccc;
    height:80px;
    text-align: center;
    float: left;
    display: inline;
    line-height: 80px;
    cursor: pointer;
  }
  .calender_detail{
    width:50%;
  }
  .nextBt{
    width:50px;
    height:30px;
    border: none;
    background-color: #eeecf8;
  }
  .guide{
    margin: 10px 0;
  }
  .sel{
    width:80px;
    height:30px;
  }
  .toCenter{
    text-align: center;
  }
</style>
