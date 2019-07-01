import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import singleLineChart from './singleLineChart'

storiesOf('监控图表', module).add('单数据折线图', () => ({
  components: { singleLineChart },
  template: `<div>
  <single-line-chart 
    :seriesName=seriesName 
    titleText="内存使用率（%）"
    titleSubText="纯属虚构"
    @click="handleChangeTime" />
  </div>`,
  data() {
    return {
      changeTimeTitle: '起租时间',
      curTime: '2019-06-25',
      changeTimeType: 'start',
      changeTimeVisiable: false,
      referTime: '',
      seriesName: ['内存使用率']
    }
  },
  methods: {
    changeTime(type, time, fn) {
      this.curTime = time
      fn()
    },
    handleChangeTime() {
      this.changeTimeVisiable = true
    }
  }
}))
