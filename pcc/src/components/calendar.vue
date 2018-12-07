<template>
    <div class="flex-row flex-wrap">
      <div style="width: 14%; height: 30px; margin: 1px; background: #1e88e5;" v-for="item in list" :key="item">{{item.content}}</div>
    </div>
</template>

<script>
export default {
  name: 'calendar',
  data: function () {
    return {
      list: []
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

</style>
