import ReactEcharts from 'echarts-for-react'
import {formatTimestamp} from './util/convertTimestamp'
import { APPtimeStamp, APPvalue, } from './util/APP';
import { DLRValue, DLRtimeStamp, } from './util/dlr';
import { SLRSlice } from './util/SLRSlice';

function App() {

  const SLRTimeStamp = SLRSlice(DLRtimeStamp)

  const combinedTimestamps = [...APPtimeStamp, ...DLRtimeStamp];
  
  const allTimestamps = Array.from(new Set(combinedTimestamps)).sort((a, b) => a - b);

  const SLRData = allTimestamps.map(ts => {
    const index = SLRTimeStamp.indexOf(ts);
    return index !== -1 ? 1250 : null;
  });

  const APPData = allTimestamps.map(ts => {
    const index = APPtimeStamp.indexOf(ts);
    return index !== -1 ? APPvalue[index] : null;
  });
  
  const DLRData = allTimestamps.map(ts => {
    const index = DLRtimeStamp.indexOf(ts);
    return index !== -1 ? DLRValue[index] : null;
  });
  



  const colors = ['#5470C6', '#EE6666', "#c54fd6"];

  const chartOptions = {
    color: colors,
    tooltip: {
      trigger: 'axis',
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
    xAxis: {
      type: 'category',
      data: allTimestamps.map(ts => formatTimestamp(ts))
    },
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
        name: 'APP',
        type: 'line',
        markLine: {
          symbol: ['none', 'none'],
          lineStyle: {
            type: 'dashed',
            width: 3
          },
          data: [{ xAxis: formatTimestamp("1691699400000")}],
          label: {
            position: 'end',
            rotate: 0,
            formatter: 'Esta é a data atual',
            show: true
          },
        },
        data: APPData
      },
      {
        name: 'DLR',
        type: 'line',
        data: DLRData
      },
      {
        name: 'SLR',
        type: 'line',
        data: SLRData
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
