import ReactEcharts from 'echarts-for-react'
import {formatTimestamp} from './util/convertTimestamp'
import { APPtimeStamp, APPvalue } from './util/APP';
import { DLRValue, DLRtimeStamp } from './util/dlr';

function App() {
  const colors = ['#5470C6', '#EE6666'];
  

  const chartOptions = {
    color: colors,
    tooltip: {
      trigger: 'none',
      axisPointer: {
        type: 'cross'
      }
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    legend: {},
    grid: {
      top: 70,
      bottom: 50
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: colors[1]
          }
        },
        axisPointer: {
          label: {
            formatter: function (params) {
              return (
                'Precipitation  ' +
                params.value +
                (params.seriesData.length ? '：' + params.seriesData[0].data : '')
              );
            }
          }
        },
        // prettier-ignore
        data: APPtimeStamp,
        axisLabel: {
              formatter: function(value) {
                return formatTimestamp(value)
              }
        }
      },
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: colors[0]
          }
        },
        axisPointer: {
          label: {
            formatter: function (params) {
              return (
                'Precipitation  ' +
                params.value +
                (params.seriesData.length ? '：' + params.seriesData[0].data : '')
              );
            }
          }
        },
        // prettier-ignore
        data: DLRtimeStamp,
          axisLabel: {
              formatter: function(value) {
                return formatTimestamp(value)
              }
      }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
      
    ],
    dataZoom: [
      {
        type: 'inside',
        throttle: 50
      }
    ],
    series: [
      {
        name: 'DLR',
        type: 'line',
        xAxisIndex: 1,
        smooth: true,
        emphasis: {
          focus: 'series'
        },
        data: DLRValue
      },
      {
        name: 'APP',
        type: 'line',
        smooth: true,
        emphasis: {
          focus: 'series'
        },
        data: APPvalue
      }
    ]
  };



  return (
    <div style={{height: '100vh', width: '100%'}}>
      <h1>Meu App com ECharts</h1>
      <ReactEcharts option={chartOptions} style={{ height: '400px', width: '100%' }}/>
    </div>
  )
  }

export default App
