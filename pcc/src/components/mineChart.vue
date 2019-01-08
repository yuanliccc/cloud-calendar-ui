<template>
  <div class="full flex-row flex-center flex-wrap" v-bind:onresize="resizeCharts">
    <div class="week-chart-block">
      <div class="week-chart-title text-left">
        周表
      </div>
      <div class="flex-row flex-around">
        <div class="week-chart">
          <div id="week" style="width:400px;height: 400px;"></div>
        </div>
        <div class="week-chart">
          <div id="lastWeek" style="width:400px;height: 400px;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import dateUtil from '../util/DateUtil'
  import echartsContainer from '../echart/AllEcharts'

  export default {
    name: "mineChart",
    data: function () {
      return {
        weekChart: {},
        lastWeekChart: {}
      }
    },
    mounted: function () {
      this.weekCount()
      this.lastWeekCount()
    },
    methods: {
      lastWeekCount: function () {
        const date = dateUtil.week(new Date(), -1)
        const data = {
          startDate: date.startDate,
          endDate: date.endDate,
          pccUserId: this.$store.getters.userInfo.id
        }
        // 请求
        this.$axios.get('/pcc/schedule/day/count', {
          params: {
            startDate: new Date(data.startDate).toDateString(),
            endDate: new Date(data.endDate).toDateString(),
            pccUserId: data.pccUserId
          }
        })
          .then(res => {
            const data = res.data

            if (data.data == null) {
              // 弹框
            }
            else {
              echartsContainer.weekEchart(this.parseWeekData(data.data, date, '上周任务数量统计表'), this.lastWeekChart, 'lastWeek')
            }

            console.log(res.data)
            this.$store.commit("hideLoading")
          })
          .catch(err => {
            this.$store.commit("hideLoading")
          })
      },
      weekCount: function () {
        // 显示加载动画
        this.$store.commit("showLoading")
        const date = dateUtil.currentWeek(new Date())
        const data = {
          startDate: date.startDate,
          endDate: date.endDate,
          pccUserId: this.$store.getters.userInfo.id
        }
        // 请求
        this.$axios.get('/pcc/schedule/day/count', {
          params: {
            startDate: new Date(data.startDate).toDateString(),
            endDate: new Date(data.endDate).toDateString(),
            pccUserId: data.pccUserId
          }
        })
          .then(res => {
            const data = res.data

            if (data.data == null) {
              // 弹框
            }
            else {
              echartsContainer.weekEchart(this.parseWeekData(data.data, date, '本周任务数量统计表'), this.weekChart, 'week')
            }

            console.log(res.data)
            this.$store.commit("hideLoading")
          })
          .catch(err => {
            this.$store.commit("hideLoading")
          })
      },
      parseWeekData: function (data, date, title) {
        let result = {
          data: [],
          maxCount: 0,
          counts: [],
        };
        let index = new Date(date.startDate)
        while (index <= date.endDate) {
          result.data.push({time: index.format('YYYY-MM-dd'), count: 0})
          index = dateUtil.nextDate(index, 1)
        }
        var maxCount = 0;
        for (var i = 0; i < result.data.length; i++) {
          for (var j = 0; j < data.length; j++) {
            if (result.data[i].time === data[j].create_time) {
              result.data[i].count = data[j].count
              break
            }
          }
          result.counts[i] = result.data[i].count
          if (maxCount < result.data[i].count) {
            maxCount = result.data[i].count
          }
        }

        result.maxCount = maxCount

        result.title = title
        return result;
      },
      resizeCharts: function () {
        this.charts.resize()
      }
    }
  }

  Date.prototype.format = function (formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];

    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));

    str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
    str = str.replace(/M/g, (this.getMonth() + 1));

    str = str.replace(/w|W/g, Week[this.getDay()]);

    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());

    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());

    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());
    return str;
  }
</script>

<style scoped>

  .week-chart-item-title {
    margin-bottom: 8px;
    font-size: 15px;
  }

  .week-chart-block {
    width: 90%;
  }

  .week-chart-title {
    font-size: 22px;
    margin-top: 20px;
    height: 37px;
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(51, 51, 51, 0.52);
    width: 100%;
  }

  .week-chart {
    margin: 10px;
  }

</style>
