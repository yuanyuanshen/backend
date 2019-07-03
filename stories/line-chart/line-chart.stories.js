import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import singleLineChart from './line-chart'
import Util from '../lib/utils'
import { fakeResponse2, fakeResponse1 } from './line-chart.fakedata'
import readme from './readme.md'

storiesOf('监控图表(折线图)', module)
  .add(
    '单数据折线图',
    () => ({
      components: { singleLineChart },
      template: `<div>
  <single-line-chart 
    :seriesName="seriesName"
    :seriesData="seriesData"
    titleText="内存使用率（%）"
    v-if="showGraph"
    titleSubText="纯属虚构"
    :unit="unit" />
  </div>`,
      propsDescription: {
        singleLineChart: {
          // These description will appear in `description` column in props table
          seriesName: '系列图例名称',
          seriesData: '系列数据'
        }
      },
      data() {
        return {
          seriesName: [],
          seriesData: [],
          unit: '',
          fakeResponse2,
          showGraph: false
        }
      },
      created() {
        this.seriesData = this.fakeResponse2.result.metricDatas[0].data
        this.seriesData.forEach(element => {
          element.times = Util.formatDate(element.times)
        })
        this.seriesName = this.fakeResponse2.result.metricDatas[0].metric.metricName
        this.unit = this.fakeResponse2.result.metricDatas[0].metric.calculateUnit
        this.showGraph = true
      }
    }),
    {
      info: {
        header: true
      }
    }
  )
  .add(
    '多数据折线图',
    () => ({
      components: { singleLineChart },
      template: `<div>
  <single-line-chart 
    :seriesName="seriesName"
    :seriesData="seriesData"
    :dataZoom="true"
    v-if="showGraph"
    :unit="unit" />
  </div>`,
      data() {
        return {
          seriesName: [],
          seriesData: [],
          unit: '',
          fakeResponse1,
          showGraph: false
        }
      },
      created() {
        this.seriesData = this.fakeResponse1.result.metricDatas[0].data
        this.seriesData.forEach(element => {
          element.times = Util.formatDate(element.times)
        })
        this.seriesName = this.fakeResponse1.result.metricDatas[0].metric.metricName
        this.unit = this.fakeResponse1.result.metricDatas[0].metric.calculateUnit
        this.showGraph = true
      }
    }),
    {
      info: {
        summary: readme
      }
    }
  )
