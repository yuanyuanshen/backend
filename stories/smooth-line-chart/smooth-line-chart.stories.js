import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import smoothLineChart from './smooth-line-chart'

storiesOf('监控图表(平滑折线图)', module).add('平滑折线图', () => ({
  components: { smoothLineChart },
  template: `<div>
<smooth-line-chart
:yAxisCfg="yAxisCfg"
:legendData="legendData"
:seriesData="seriesData"
:unit="unit"/>
</div>`,
  data() {
    return {
      yAxisCfg: [
        {
          legend: 'haha（A）',
          min: 0,
          max: 80
        },
        {
          legend: 'hehe（B）',
          min: 0,
          max: 80
        }
      ],
      legendData: ['haha', 'hehe'],
      seriesData: {
        '2019-07-22 12:00': [0, 25],
        '2019-07-22 12:05': [24, 26],
        '2019-07-22 12:10': [26, 28],
        '2019-07-22 12:15': [25, 30],
        '2019-07-22 12:20': [28, 34],
        '2019-07-22 12:25': [26, 29],
        '2019-07-22 12:30': [22, 24],
        '2019-07-22 12:35': [22, 26],
        '2019-07-22 12:40': [20, 24],
        '2019-07-22 12:45': [18, 20],
        '2019-07-22 12:50': [0, 18]
      },
      unit: ['A', 'B']
    }
  }
}))
