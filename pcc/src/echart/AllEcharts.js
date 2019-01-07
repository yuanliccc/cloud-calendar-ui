import echarts from 'echarts'

const echartsContainer = {
  weekEchart: function (data, echartObj, id) {
    echartObj = echarts.init(document.getElementById(id))
    echartObj.setOption({
      title: {
        text:data.title,
        x:'center',
        y:'top',
        textAlign:'left',
        textStyle: {
          color: 'black',
          fontWeight: '500',
          align: 'center',
          fontSize: 16
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          crossStyle: {
            color: '#2f4554'
          }
        }
      },
      grid: {
        x:30,
        y:50,
        x2:20,
        y2:20,
        borderWidth:1
      },
      toolbox: {
        feature: {
          saveAsImage: {show: true,title:'下载'}
        }
      },
      legend: {
        show: false
      },
      xAxis: [
        {
          type: 'category',
          data: ['周一','周二','周三','周四','周五','周六','周天'],
          axisPointer: {
            type: 'shadow',
            snap: false
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '任务数量',
          min: 0,
          max: data.maxCount,
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
              color: function(params) {
                // build a color map as your need.
                var colorList = [
                  '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                  '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                  '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                ];
                return colorList[params.dataIndex]
              }
            }
          }
        }
      ]
    })
  }
}

export default echartsContainer
