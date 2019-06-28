<template>
  <div id="show-single-chart"
       ref="myEchart">
  </div>
</template>
<script>

import echarts from 'echarts'

const fakeResponse2 = {
  "requestId": "bjeew6c04iukcvgfmu9vpk587we50k9s",
  "result": {
    "metricDatas": [{
      "data": [{ "timestamp": 1557979560000, "value": "0.0000" }, { "timestamp": 1557979620000, "value": "0.0000" }, { "timestamp": 1557979680000, "value": "0.0000" }, { "timestamp": 1557979740000, "value": "0.0000" }, { "timestamp": 1557979800000, "value": "0.0000" }, { "timestamp": 1557979860000, "value": "0.0000" }, { "timestamp": 1557979920000, "value": "0.1667" }, { "timestamp": 1557979980000, "value": "0.0000" }, { "timestamp": 1557980040000, "value": "0.0000" }, { "timestamp": 1557980100000, "value": "0.0000" }, { "timestamp": 1557980160000, "value": "0.0000" }, { "timestamp": 1557980220000, "value": "1.5000" }, { "timestamp": 1557980280000, "value": "0.0000" }, { "timestamp": 1557980340000, "value": "0.0000" }, { "timestamp": 1557980400000, "value": "0.0000" }, { "timestamp": 1557980460000, "value": "0.0000" }, { "timestamp": 1557980520000, "value": "0.0000" }, { "timestamp": 1557980580000, "value": "1.3333" }, { "timestamp": 1557980640000, "value": "0.0000" }, { "timestamp": 1557980700000, "value": "0.0000" }, { "timestamp": 1557980760000, "value": "0.0000" }, { "timestamp": 1557980820000, "value": "0.0000" }, { "timestamp": 1557980880000, "value": "1.1667" }, { "timestamp": 1557980940000, "value": "0.0000" }, { "timestamp": 1557981000000, "value": "0.0000" }, { "timestamp": 1557981060000, "value": "0.0000" }, { "timestamp": 1557981120000, "value": "0.0000" }, { "timestamp": 1557981180000, "value": "0.3333" }, { "timestamp": 1557981240000, "value": "0.0000" }, { "timestamp": 1557981300000, "value": "0.1667" }, { "timestamp": 1557981360000, "value": "0.0000" }, { "timestamp": 1557981420000, "value": "0.0000" }, { "timestamp": 1557981480000, "value": "0.1667" }, { "timestamp": 1557981540000, "value": "0.0000" }, { "timestamp": 1557981600000, "value": "0.0000" }, { "timestamp": 1557981660000, "value": "0.0000" }, { "timestamp": 1557981720000, "value": "0.0000" }, { "timestamp": 1557981780000, "value": "0.0000" }, { "timestamp": 1557981840000, "value": "0.0000" }, { "timestamp": 1557981900000, "value": "0.0000" }, { "timestamp": 1557981960000, "value": "0.0000" }, { "timestamp": 1557982020000, "value": "0.0000" }, { "timestamp": 1557982080000, "value": "0.3333" }, { "timestamp": 1557982140000, "value": "0.0000" }, { "timestamp": 1557982200000, "value": "0.0000" }, { "timestamp": 1557982260000, "value": "0.0000" }, { "timestamp": 1557982320000, "value": "0.0000" }, { "timestamp": 1557982380000, "value": "0.3333" }, { "timestamp": 1557982440000, "value": "0.0000" }, { "timestamp": 1557982500000, "value": "0.0000" }, { "timestamp": 1557982560000, "value": "0.0000" }, { "timestamp": 1557982620000, "value": "0.0000" }, { "timestamp": 1557982680000, "value": "0.6667" }, { "timestamp": 1557982740000, "value": "0.1667" }, { "timestamp": 1557982800000, "value": "0.0000" }, { "timestamp": 1557982860000, "value": "0.3333" }, { "timestamp": 1557982920000, "value": "0.0000" }, { "timestamp": 1557982980000, "value": "0.8333" }, { "timestamp": 1557983040000, "value": "0.0000" }, { "timestamp": 1557983100000, "value": "0.0000" }],
      "tags": [{ "tagKey": "project_id", "tagValue": "c49a496b2b3a456aa4de68b64bd7cab9" }, { "tagKey": "az", "tagValue": "prod_bj02" }, { "tagKey": "resourceId", "tagValue": "i-u9rm8il85k" }, { "tagKey": "hostname", "tagValue": "A01-R22-I16-99-1RBMXP2.JCLOUD.COM" }, { "tagKey": "serviceCode", "tagValue": "vm" }, { "tagKey": "dataCenter", "tagValue": "bj_02" }],
      "metric": { "calculateUnit": "%", "metric": "cpu_util", "metricName": "CPU使用率", "aggregator": "avg", "period": "1min" },
    }],
  },
  "responseObj": { "size": 0, "timeout": 0, "nonce": "219d1df4-d3fe-43c6-91e5-a5078bdb9996" },
};

export default {
  data () {
    return {
      useDate: fakeResponse2.result
    }
  },
  computed: {
    keys () {
      this.useDate.metricDatas[0].data.forEach(element => {
        element.timestamp = this.formatDate(element.timestamp)
      });
      console.log(this.useDate.metricDatas[0].data.map(r => r.timestamp))
      return this.useDate.metricDatas[0].data.map(r => r.timestamp)
    }
  },
  mounted () {
    this.initChart()
    this.useDate.metricDatas[0].data.forEach(element => {
      element.timestamp = this.formatDate(element.timestamp)
    });
    console.log(this.useDate.metricDatas[0].data)
  },
  props: {
    color: {
      type: Array,
      default () {
        return ['#F39702', '#51D2B7'];
      }
    },
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$refs.myEchart);
      // 把配置和数据放这里
      this.chart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['邮件营销', '联盟广告']
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisLine: { onZero: false },
            boundaryGap: false,
            data: this.keys
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        color: this.color,
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      })
    },
    formatDate (nTimestamp) {
      /**
       * 前置补充0
       * @param {Number} num 数值
       * @param {Number} fill 最终长度
       * @return {String} fill为2时 1 => 01
       */
      const preZeroFill = (num, fill = 2) => {
        // 当前数字位数
        const nLen = ('' + num).length
        // 缺少的位数的长度
        const sPreLen = fill > nLen ? fill - nLen : 0
        return Array(sPreLen).fill(0).join('') + num
      }
      const date = new Date(nTimestamp)
      const sYear = date.getFullYear()
      const sMonth = preZeroFill(date.getMonth() + 1)
      const sDay = preZeroFill(date.getDate())
      const sHour = preZeroFill(date.getHours())
      const sMunite = preZeroFill(date.getMinutes())
      const sSecond = preZeroFill(date.getSeconds())
      return `${sYear}-${sMonth}-${sDay} ${sHour}:${sMunite}:${sSecond}`
    }
  }
}
</script>
<style lang="scss" scoped>
#show-single-chart {
  width: 50%;
  height: 300px;
  border: 1px solid red;
}
</style>


