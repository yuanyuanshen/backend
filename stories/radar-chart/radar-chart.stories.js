import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import radarChart from './radar-chart'

storiesOf('监控图标(大屏雷达图)', module).add(
  '雷达图',
  () => ({
    components: { radarChart },
    template: `<div>
  <radar-chart 
  :title="title"
  :legendName="legendName"
  :indicator="indicator"
  :seriesData="seriesData"/>
  </div>`,
    data() {
      return {
        title: '基础雷达图',
        legendName: ['预算分配', '实际开销'],
        indicator: [
          { name: '销售', max: 6500 },
          { name: '管理', max: 16000 },
          { name: '信息技术', max: 30000 },
          { name: '客服', max: 38000 },
          { name: '研发', max: 52000 },
          { name: '市场', max: 25000 }
        ],
        seriesData: [
          {
            value: [4300, 10000, 28000, 35000, 50000, 19000],
            name: '预算分配'
          },
          {
            value: [5000, 14000, 28000, 31000, 42000, 21000],
            name: '实际开销'
          }
        ]
      }
    }
  }),
  {
    info: {
      header: true
    }
  }
)
