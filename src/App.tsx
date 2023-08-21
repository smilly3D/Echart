import ReactEcharts from 'echarts-for-react'
import {formatTimestamp} from './util/convertTimestamp'
import { APPtimeStamp, APPvalue, } from './util/APP';
import { DLRValue, DLRtimeStamp, } from './util/dlr';
import { SLRSlice } from './util/SLRSlice';
import MySlider from './components/myslider';
import { useState } from 'react';


function App() {

  const [startTimestamp, setStartTimestamp] = useState(1660759200000);
  const [endTimestamp, setEndTimestamp] = useState(1691772300000);
  const [dateRange, setDateRange] = useState([startTimestamp, endTimestamp]);


  function handleSliderChange(range) {
    const monthToTimestamp = (monthsSinceStart) => {
      const date = new Date(startTimestamp);
      date.setMonth(date.getMonth() + monthsSinceStart);
      return date.getTime();
    };
  
    const startDate = monthToTimestamp(range[0]);
    const endDate = monthToTimestamp(range[1]);
  
    setDateRange([startDate, endDate]);
  }

  const SLRTimeStamp = SLRSlice(DLRtimeStamp)

  const combinedTimestamps = [...APPtimeStamp, ...DLRtimeStamp];
  
  const allTimestamps = Array.from(new Set(combinedTimestamps)).sort((a, b) => a - b);
  const filteredTimestamps = allTimestamps.filter((ts => ts >= dateRange[0] && ts <= dateRange[1]));


  const SLRData = filteredTimestamps.map(ts => {
    const index = SLRTimeStamp.indexOf(ts);
    return index !== -1 ? 1250 : null;
  });

  const APPData = filteredTimestamps.map(ts => {
    const index = APPtimeStamp.indexOf(ts);
    return index !== -1 ? APPvalue[index] : null;
  });
  
  const DLRData = filteredTimestamps.map(ts => {
    const index = DLRtimeStamp.indexOf(ts);
    return index !== -1 ? DLRValue[index] : null;
  });
  


  console.log(filteredTimestamps)


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
      data: filteredTimestamps.map(ts => formatTimestamp(ts))
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
      {startTimestamp && endTimestamp && (
    <MySlider onSliderChange={handleSliderChange} startTimestamp={startTimestamp} endTimestamp={endTimestamp} />
)}
      <ReactEcharts option={chartOptions} style={{ height: '400px', width: '100%' }}/>
    </div>
  )
  }

export default App
