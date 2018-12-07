<template>
    <div class="full">
      <div class="calendar-title flex-row">
        <div class="flex-grow">
          <button>今天</button>
        </div>

        <div class="flex-row">
          <div>
            <span class="glyphicon glyphicon-chevron-left"></span>
          </div>
          <div>
            2018 年 12 月
          </div>
          <div>
            <span class="glyphicon glyphicon-chevron-right"></span>
          </div>
        </div>

        <div class="flex-grow">

        </div>
      </div>
      <div class="flex-row flex-wrap" style="height: 500px">
        <div class="calendar-item-common calendar-item-title" v-for="item in weekInfo" :key="item">{{item}}</div>
        <div class="calendar-item-common calendar-item" v-for="(item, index) in list" :key="index">{{item.content}}</div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'calendar',
  data: function () {
    return {
      list: [],
      weekInfo: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
    }
  },
  mounted: function () {
    this.calculateDate()
  },
  methods: {
    calculateDate: function () {
      let date = new Date()
      let years = date.getFullYear()
      let month = date.getMonth()
      this.list = this.howMuchInWeek(years, month, 1, this.howMuchDays(years, month))
    },
    howMuchDays: function (year, month) {
      let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        daysInMonth[1] = 29
      }
      return daysInMonth[month]
    },
    howMuchInWeek: function (year, month, day, days) {
      // 获得指定年月的1号是星期几
      let targetDay = new Date(year, month, day).getDay()
      // 将要在calendar__main中渲染的列表
      let list = []
      let preNum = targetDay
      // 首先先说一下，我们的日期是(日--六)这个顺序也就是(0--6)
      // 有了上述的前提我们可以认为targetDay为多少，我们就只需要在list的数组中push几个content为''的obj作为占位
      if (targetDay > 0) {
        for (let i = 1; i < preNum; i++) {
          let obj = {
            type: 'pre',
            content: ''
          }
          list.push(obj)
        }
      }
      for (let i = 0; i < days; i++) {
        let obj = {
          type: 'normal',
          content: i + 1
        }
        list.push(obj)
      }
      let nextNum = 6 - new Date(year, month + 1, 0).getDay()
      // 与上面的type=pre同理
      for (let i = 0; i <= nextNum; i++) {
        let obj = {
          type: 'next',
          content: ''
        }
        list.push(obj)
      }
      return list
    }
  }
}
</script>

<style scoped>

  .calendar-title {
    margin-top: 20px;
  }

  .calendar-item-common {
    width: 14%;
  }

  .calendar-item-title {
    margin-top: 20px;
  }

  .calendar-item {
    border: 1px solid red;
    height: 14%;
    border-bottom: none;
    border-right: none;
  }
</style>
