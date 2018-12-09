<template>
  <div class="calendar">
    <div class="calendar-title flex-row">
      <div class="flex-grow flex-column">
        <button class="calendar-common-btn">今天</button>
      </div>

      <div class="flex-row">
        <div class="calendar-control-button flex-column" @click="preMonth">
          <span class="glyphicon glyphicon-chevron-left"></span>
        </div>
        <div class="calendar-control-view-block flex-column">
          {{year}} 年 {{month + 1}} 月
        </div>
        <div class="calendar-control-button flex-column" @click="nextMonth">
          <span class="glyphicon glyphicon-chevron-right"></span>
        </div>
      </div>

      <div class="flex-grow">

      </div>
    </div>
    <div class="flex-row flex-wrap calendar-common-margin">
      <div class="calendar-item-common calendar-item-title" v-for="item in weekInfo" :key="item">{{item}}</div>
    </div>
    <div class="flex-row flex-wrap calendar-common-margin" style="height: 500px">
      <div class="calendar-item-common calendar-item" v-bind:class="[item.type==='normal' ? '' : 'un-normal']" v-for="(item, index) in list"
           :key="index">{{item
        .content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'calendar',
  data: function () {
    return {
      year: Number,
      month: Number,
      list: [],
      showLunarDate: Object,
      weekInfo: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
      lunar: {
        tg: '甲乙丙丁戊己庚辛壬癸',
        dz: '子丑寅卯辰巳午未申酉戌亥',
        number: '一二三四五六七八九十',
        year: '鼠牛虎兔龙蛇马羊猴鸡狗猪',
        month: '正二三四五六七八九十冬腊',
        monthadd: [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
        calendar: [0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497,
          0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95
          , 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695
          , 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA
          , 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A
          , 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA
          , 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957
          , 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E
          , 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B
          , 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95]
      }
    }
  },
  mounted: function () {
    this.showToday()
  },
  methods: {
    preMonth: function () {
      if (this.month === 0) {
        this.year = this.year - 1
        this.month = 11
      }
      else {
        this.month = this.month - 1
      }
      this.list = this.howMuchInWeek(this.year, this.month, 1, this.howMuchDays(this.year, this.month))
    },
    nextMonth: function () {
      if(this.month === 11) {
        this.year = this.year + 1
        this.month = 0
      }
      else {
        this.month = this.month + 1
      }
      this.list = this.howMuchInWeek(this.year, this.month, 1, this.howMuchDays(this.year, this.month))
    },
    showToday: function () {
      let date = new Date()
      this.year = date.getFullYear()
      this.month = date.getMonth()
      this.list = this.howMuchInWeek(this.year, this.month, 1, this.howMuchDays(this.year, this.month))
      this.showLunarDate = this.lunarDateToStr(this.getLunar(this.year, this.month, date.getDate()))
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
        let preMonth = month === 0 ? 11 : month - 1
        let preYear = month === 0 ? year - 1 : year
        let preMonthDays = this.howMuchDays(preYear, preMonth)

        for (let i = 1; i < preNum; i++) {
          let obj = {
            type: 'pre',
            content: "" + (preMonthDays--)
          }
          list.push(obj)
        }
        list.reverse()
      }
      for (let i = 0; i < days; i++) {
        let obj = {
          type: 'normal',
          content: i + 1
        }
        list.push(obj)
      }
      //let nextNum = 6 - new Date(year, month + 1, 0).getDay()
      let len = list.length
      // 与上面的type=pre同理
      for (let i = 0; i < 42 - len; i++) {
        let obj = {
          type: 'next',
          content: "" + (i + 1)
        }
        list.push(obj)
      }
      return list
    },
    getLunar: function (year, month, day) {
      if (year < 1921 || year > 2020) {
        return {}
      }

      var total, m, n, k, bit, lunarYear, lunarMonth, lunarDay;
      var isEnd = false
      var tmp = year

      if (tmp < 1900) {
        tmp += 1900
      }
      total = (tmp - 1921) * 365
        + Math.floor((tmp - 1921) / 4)
        + this.lunar.monthadd[month] + day - 38

      if (year % 4 == 0 && month > 1) {
        total++
      }
      for (m = 0;; m++) {
        k = (this.lunar.calendar[m] < 0xfff) ? 11 : 12
        for (n = k; n >= 0; n--) {
          bit = (this.lunar.calendar[m] >> n) & 1
          if (total <= 29 + bit) {
            isEnd = true
            break
          }
          total = total - 29 - bit
        }
        if (isEnd) break
      }
      lunarYear = 1921 + m
      lunarMonth = k - n + 1
      lunarDay = total
      if (k == 12) {
        if (lunarMonth == Math.floor(this.lunar.calendar[m] / 0x10000) + 1) {
          lunarMonth = 1 - lunarMonth
        }
        if (lunarMonth > Math.floor(this.lunar.calendar[m] / 0x10000) + 1) {
          lunarMonth--
        }
      }

      return {
        lunarYear: lunarYear,
        lunarMonth: lunarMonth,
        lunarDay: lunarDay,
      }
    },
    lunarDateToStr: function (lunarDate) {
      if (!lunarDate.lunarDay) return

      let data = {},
        lunarYear = lunarDate.lunarYear,
        lunarMonth = lunarDate.lunarMonth,
        lunarDay = lunarDate.lunarDay

      data.tg = this.lunar.tg.charAt((lunarYear - 4) % 10)
      data.dz = this.lunar.dz.charAt((lunarYear - 4) % 12)
      data.year = this.lunar.year.charAt((lunarYear - 4) % 12)
      data.month = lunarMonth < 1
        ? '(闰)' + this.lunar.month.charAt(-lunarMonth - 1)
        : this.lunar.month.charAt(lunarMonth - 1);

      data.day = (lunarDay < 11) ? '初' : ((lunarDay < 20) ? '十' : ((lunarDay < 30) ? '廿' : '三十'));
      if (lunarDay % 10 != 0 || lunarDay == 10) {
        data.day += this.lunar.number.charAt((lunarDay - 1) % 10);
      }

      return data
    }
  }
}
</script>

<style scoped>

  .calendar-common-margin {
    margin-left: 10px;
    margin-right: 10px;
  }

  .calendar {
    background: white;
    margin: 10px;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
  }

  .calendar-common-btn {
    width: 50px;
    height: 25px;
    background: #e1e5eb;
    border: none;
    border-radius: 2px;
    outline: none;
  }

  .calendar-common-btn:hover {
    background: #d5d9de;
  }

  .calendar-title {
    height: 60px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .calendar-control-button {
    height: 100%;
    width: 20px;
    font-size: 20px;
    cursor: pointer;
    color: #e1e5eb;
  }

  .calendar-control-button:hover {
    color: rgb(33, 150, 243);
  }

  .calendar-control-view-block {
    margin-left: 5px;
    margin-right: 5px;
  }

  .calendar-item-common {
    width: 14.285%;
  }

  .calendar-item-title {
    margin-top: 20px;
  }

  .un-normal {
    color: #9E9E9E;
  }

  .calendar-item {
    border: 1px solid #f2f2f2;
    height: 16.667%;
    border-bottom: none;
    border-right: none;
  }
</style>
