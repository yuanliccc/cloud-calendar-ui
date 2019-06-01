<template>
  <div class="container-block flex-row flex-center" v-bind:onresize="resizeCharts">
    <div class="content-container">
      <div class="history-count-block">
        <div class="chart-title">总量统计</div>
        <div class="chart-content">
          <div class="flex-row flex-start">
            <div class="flex-row flex-wrap">
              <div class="progress-item">
                <div  class="progress-title">相关总数</div>
                <div>
                  <el-progress :stroke-width="4" :width="90" type="circle" :percentage="100" status="text">
                    {{historyCounts.relationCount}}
                  </el-progress>
                </div>
              </div>
              <div class="progress-item">
                <div class="progress-title">创建总数</div>
                <div>
                  <el-progress :stroke-width="4" :width="90" type="circle"
                               :percentage="100" status="text" color="rgba(87, 233, 196, 0.74)">
                    {{historyCounts.createCount}}
                  </el-progress>
                </div>
              </div>
              <div class="progress-item">
                <div class="progress-title">参与总数</div>
                <div>
                  <el-progress :stroke-width="4" :width="90"
                               type="circle" :percentage="100" status="text" color="#a1a4d9">
                    {{historyCounts.treatedCount + historyCounts.unTreatedCount}}
                  </el-progress>
                </div>
              </div>
              <div class="progress-item">
                <div class="progress-title">完成总数</div>
                <div>
                  <el-progress :stroke-width="4" :width="90"
                               type="circle" :percentage="100" status="text" color="#13ce66">
                    {{historyCounts.treatedCount}}
                  </el-progress>
                </div>
              </div>
              <div class="progress-item">
                <div class="progress-title">未完成总数</div>
                <div>
                  <el-progress :stroke-width="4" :width="90"
                               type="circle" :percentage="100" status="text" color="rgba(232, 124, 37, 0.75)">
                    {{historyCounts.unTreatedCount}}
                  </el-progress>
                </div>
              </div>
              <div class="progress-item">
                <div class="progress-title">超时完成总数</div>
                <div>
                  <el-progress :stroke-width="4" :width="90"
                               type="circle" :percentage="100" status="text" color="rgba(251, 149, 140, 0.61)">
                    {{historyCounts.treatedOutTimeCount}}
                  </el-progress>
                </div>
              </div>
              <div class="progress-item">
                <div class="progress-title">未完成已超时</div>
                <div>
                  <el-progress :stroke-width="4" :width="90"
                               type="circle" :percentage="100" status="text" color="#ff8478">
                    {{historyCounts.unTreatedOutTimeCount}}
                  </el-progress>
                </div>
              </div>
            </div>
            <div style="height: 330px" class="flex-column flex-center">
              <div id="historyRate" style="width:300px;height: 300px;margin-top: 20px;"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="history-count-block">
        <div class="chart-title flex-row flex-center">
          <div>指派统计</div>
          <div class="flex-grow flex-row flex-end">
            <!--<el-button size="mini" plain>所有</el-button>
            <el-button size="mini" plain>本周</el-button>
            <el-button size="mini" plain>本月</el-button>-->
          </div>
        </div>
        <div class="chart-content ">
          <div class="flex-row flex-around text-center">
            <div id="historyAssign" style="width:400px;height:400px; margin-top: 20px"></div>
            <div id="historyAssigned" style="width:400px;height:400px; margin-top: 20px"></div>
          </div>
        </div>
      </div>
      <div class="history-count-block">
        <div class="chart-title text-left">本周任务统计</div>
        <div class="chart-content flex-row flex-around">
          <div class="week-chart">
            <div id="weekCounts" style="width:800px;height: 500px;"></div>
          </div>
        </div>
      </div>
      <div class="history-count-block">
        <div class="chart-title text-left">本月任务统计</div>
        <div class="chart-content flex-row flex-around">
          <div class="week-chart">
            <div id="monthCounts" style="width:1200px;height: 700px;"></div>
          </div>
        </div>
      </div>
      <div class="bottom-block"></div>
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
        lastWeekChart: {},
        historyCounts: {},
        historyChart: {},
        historyAssignCounts:[],
        historyAssignChart: {},
        historyAssignedCounts: [],
        historyAssignedChart: {},
        weekCountsEchart: {},
        monthCountsEchart: {}
      }
    },
    mounted: function () {
      this.getHistoryCount()
      this.getHistoryAssignCount()
      this.getHistoryAssignedCount()
      this.getWeekCounts()
      this.getMonthCounts()
    },
    methods: {
      resizeCharts: function () {
        this.charts.resize()
      },
      getHistoryCount: function () {
        this.$store.commit('showLoading')
        this.$axios.get('/pcc/schedule/history/count',{params: {pccUserId: this.$store.getters.userInfo.id}})
          .then(res => {
            this.historyCounts = res.data.data
            this.showHistoryChart(res.data.data)
          })
          .catch(err => {
            this.$message.error('获取总量统计失败，' + this.$store.getters.errMessage)
          })
        this.$store.commit('hideLoading')
      },
      showHistoryChart: function (historyCounts) {
        let data = [
          {value:historyCounts.treatedCount - historyCounts.treatedOutTimeCount, name:'按时完成'},
          {value:historyCounts.treatedOutTimeCount, name: '超时完成'},
          {value: historyCounts.unTreatedOutTimeCount, name:'已超时未完成'},
          {value: historyCounts.unTreatedCount - historyCounts.unTreatedOutTimeCount, name:'未超时未完成'}
        ]
        echartsContainer.historyRateEchart(data, this.historyChart, 'historyRate')
      },
      getHistoryAssignCount: function () {
        this.$store.commit('showLoading')
        this.$axios.get('/pcc/schedule/history/assign/count',{params: {pccUserId: this.$store.getters.userInfo.id}})
          .then(res => {
            this.historyAssignCounts = res.data.data
            this.showHistoryAssignChart(res.data.data)
            console.log(res.data.data)
          })
          .catch(err => {
            this.$message.error('获取指派统计数据失败，' + this.$store.getters.errMessage)
          })
        this.$store.commit('hideLoading')
      },
      showHistoryAssignChart: function (historyAssignCount) {
        let data = {}
        data.seriesTitle = '指派给他人的任务数（占比）'
        data.x = []
        data.series = []
        for(var i = 0; i < historyAssignCount.length; i++) {
          data.x.push(historyAssignCount[i].name)
          let item = {}
          item.value = historyAssignCount[i].count
          item.name = historyAssignCount[i].name
          data.series.push(item)
        }
        echartsContainer.historyAssignEchart(data, this.historyAssignChart, 'historyAssign')
      },
      getHistoryAssignedCount: function () {
        this.$store.commit('showLoading')
        this.$axios.get('/pcc/schedule/history/assigned/count',{params: {pccUserId: this.$store.getters.userInfo.id}})
          .then(res => {
            this.historyAssignedCounts = res.data.data
            this.showHistoryAssignedChart(res.data.data)
            console.log(res.data.data)
          })
          .catch(err => {
            this.$message.error('获取被指派统计数据失败，' + this.$store.getters.errMessage)
          })
        this.$store.commit('hideLoading')
      },
      showHistoryAssignedChart: function (historyAssignedCount) {
        let data = {}
        data.seriesTitle = '被指派的任务数（占比）'
        data.x = []
        data.series = []
        for(var i = 0; i < historyAssignedCount.length; i++) {
          data.x.push(historyAssignedCount[i].name)
          let item = {}
          item.value = historyAssignedCount[i].count
          item.name = historyAssignedCount[i].name
          data.series.push(item)
        }
        echartsContainer.historyAssignEchart(data, this.historyAssignedChart, 'historyAssigned')
      },
      getWeekCounts: function () {
        this.$store.commit("showLoading")
        const date = dateUtil.currentWeek(new Date())
        const params = {
          pccUserId: this.$store.getters.userInfo.id,
          startDate: new Date(date.startDate).toDateString(),
          endDate: new Date(date.endDate).toDateString()
        }
        this.$axios.get('/pcc/schedule/day/counts', {params: params})
          .then(res => {
            console.log(res.data.data)
            this.showWeekCountsChart(res.data.data)
          })
          .catch(err => {
            this.$message.error('获取周统计数据失败，' + this.$store.getters.errMessage)
          })
        this.$store.commit("hideLoading")
      },
      showWeekCountsChart: function (data) {
        let re = {}
        re.publish = []
        re.accept = []
        re.complete = []

        for(var i = 0; i < data.length; i++) {
          re.publish.push(data[i].publish)
          re.accept.push(data[i].accept)
          re.complete.push(data[i].complete)
        }
        echartsContainer.weekCountsEchart(re, this.weekCountsEchart, 'weekCounts')
      },
      getMonthCounts: function () {
        this.$store.commit("showLoading")
        const date = dateUtil.currentMonth()
        const params = {
          pccUserId: this.$store.getters.userInfo.id,
          startDate: new Date(date.startDate).toDateString(),
          endDate: new Date(date.endDate).toDateString()
        }
        this.$axios.get('/pcc/schedule/day/counts', {params: params})
          .then(res => {
            console.log(res.data.data)
            this.showMonthCountsChart(res.data.data)
          })
          .catch(err => {
            this.$message.error('获取周统计数据失败，' + this.$store.getters.errMessage)
          })
        this.$store.commit("hideLoading")
      },
      showMonthCountsChart: function (data) {
        let re = {}
        re.publish = []
        re.accept = []
        re.complete = []
        re.time = []

        for(var i = 0; i < data.length; i++) {
          re.publish.push(data[i].publish)
          re.accept.push(data[i].accept)
          re.complete.push(data[i].complete)
          re.time.push(data[i].time.substring(8) + ' 日')
        }
        echartsContainer.monthCountsEchart(re, this.monthCountsEchart, 'monthCounts')
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

  .bottom-block {
    height: 30px;
  }

  .chart-content {
    border: 1px solid #e5e5e5;
    background: white;
  }

  .container-block {
    background: whitesmoke;
  }

  .history-count-block {
    margin-top: 20px;
  }

  .progress-item {
    width: 220px;
    height: 150px;
  }

  .progress-title {
    padding-top: 20px;
    padding-bottom: 10px;
    color: gray;
  }

  .has-filter-chart-title {
    margin-bottom: 5px;
  }

  .chart-title {
    margin-bottom: 12px;
    text-align: left;
  }

  .content-container {
    width: 90%;
  }

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
