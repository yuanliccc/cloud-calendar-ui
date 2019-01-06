import echarts from 'echarts'

const echartsContainer = {
  weekEchart: function (data, echartObj, id) {
    echartObj = echarts.init(document.getElementById(id))
    echartObj.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#2f4554'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: {show: true, readOnly: false},
          magicType: {show: true, type: ['line', 'bar']},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      legend: {
        data:['发布任务']
      },
      xAxis: [
        {
          type: 'category',
          data: ['星期一','星期二','星期三','星期四','星期五','星期六','星期天'],
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '任务数量',
          min: 0,
          max: data.maxCount,
          interval: 50,
          axisLabel: {
            formatter: '{value}'
          }
        }
      ],
      series: [
        {
          name:'发布任务',
          type:'bar',
          data:data.counts,
          itemStyle: {
            normal: {
              color: '#2f4554'
            }
          }
        }
      ]
    })
  }
}

export default echartsContainer
