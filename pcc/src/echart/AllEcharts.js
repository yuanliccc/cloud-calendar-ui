import echarts from 'echarts'

const echartsContainer = {
  weekEchart: function (data, echartObj, id) {
    echartObj = echarts.init(document.getElementById(id))
    echartObj.setOption({
      title: {
        text:data.title, x:'center', y:'top', textAlign:'left',
        textStyle: {color: 'black', fontWeight: '500', align: 'center', fontSize: 16}
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {type: 'shadow', crossStyle: {color: '#2f4554'}}
      },
      grid: {
        x:30, y:50, x2:20, y2:20, borderWidth:1
      },
      toolbox: {
        feature: {saveAsImage: {show: true,title:'下载'}}
      },
      legend: {
        show: false
      },
      xAxis: [
        {
          type: 'category',
          data: ['周一','周二','周三','周四','周五','周六','周天'],
          axisPointer: {type: 'shadow', snap: false}
        }
      ],
      yAxis: [
        {
          type: 'value', name: '任务数量', min: 0, max: data.maxCount,
          axisLabel: {formatter: '{value}'}
        }
      ],
      series: [
        {
          name:'发布任务', type:'bar', data:data.counts,
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
  },
  historyRateEchart: function (data, echartObj, id) {
    echartObj = echarts.init(document.getElementById(id))
    echartObj.setOption({
      tooltip: {
        trigger: 'item',
        formatter: "{b}: {c} ({d}%)"
      },
      legend: {
        data:['按时完成', '超时完成','已超时未完成','未超时未完成']
      },
      series: [
        {
          name:'访问来源',
          type:'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '16'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data:data
        }
      ]
    })
  },
  historyAssignEchart: function (data, echartObj, id) {
    echartObj = echarts.init(document.getElementById(id))
    echartObj.setOption({
      tooltip: {
        trigger: 'item',
        formatter: "{a} </br>{b}: {c} ({d}%)"
      },
      legend: {
        data:data.x
      },
      series: [
        {
          name:data.seriesTitle,
          type:'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '16'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data:data.series
        }
      ]
    })
  },
  weekCountsEchart: function (data, echartObj, id) {
    echartObj = echarts.init(document.getElementById(id))
    echartObj.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {type: 'shadow', crossStyle: {color: '#2f4554'}}
      },
      toolbox: {
        feature: {
          saveAsImage: {show: true,title:'下载'}
        }
      },
      legend: {
        data:['发布数量','受理数量','完成数量']
      },
      xAxis: [
        {
          type: 'category',
          data: ['周一','周二','周三','周四','周五','周六','周天'],
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '数量',
          min: 0,
          axisLabel: {
            formatter: '{value}'
          }
        }
      ],
      series: [
        {
          name:'发布数量',
          type:'bar',
          data:data.publish
        },
        {
          name:'受理数量',
          type:'bar',
          data:data.accept
        },
        {
          name:'完成数量',
          type:'bar',
          data:data.complete
        }
      ]
    })
  },
  monthCountsEchart: function (data, echartObj, id) {
    echartObj = echarts.init(document.getElementById(id))
    echartObj.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {type: 'shadow', crossStyle: {color: '#2f4554'}}
      },
      toolbox: {
        feature: {
          saveAsImage: {show: true,title:'下载'}
        }
      },
      legend: {
        data:['发布数量','受理数量','完成数量']
      },
      xAxis: [
        {
          type: 'category',
          data: data.time,
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '数量',
          min: 0,
          axisLabel: {
            formatter: '{value}'
          }
        }
      ],
      series: [
        {
          name:'发布数量',
          type:'bar',
          data:data.publish
        },
        {
          name:'受理数量',
          type:'bar',
          data:data.accept
        },
        {
          name:'完成数量',
          type:'bar',
          data:data.complete
        }
      ]
    })
  }
}

export default echartsContainer
