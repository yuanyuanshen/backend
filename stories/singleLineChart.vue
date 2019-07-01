<template>
  <div id="show-single-chart"
       :style="style"
       ref="myEchart">
  </div>
</template>
<script>

import echarts from 'echarts'
import Util from './lib/utils'

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
  props: {
    // 数值系列的颜色列表
    color: {
      type: Array,
      default () {
        return ['#66CC00', '#FF9966'];
      }
    },
    // 系列图例名称
    seriesName: {
      type: Array,
      default () {
        return ['内存使用率'];
      }
    },
    // 系列标题名称
    titleText: {
      type: String,
      default: ''
    },
    // 系列副标题名称
    titleSubText: {
      type: String,
      default: ''
    },
    // 系列提示框单位
    unit: {
      type: String,
      default: '%'
    },
    // 纵坐标名称
    yAxisName: {
      type: String,
      default: ''
    },
    // 图标宽度
    width: {
      type: String,
      default: '40%'
    },
    // 图标高度
    height: {
      type: String,
      default: '300px'
    }
  },

  data () {
    return {
      useDate: fakeResponse2.result
    }
  },

  computed: {
    // 图标样式
    style () {
      return `width:${this.width};height:${this.height}`
    },
    // 计算横坐标
    keys () {
      this.useDate.metricDatas[0].data.forEach(element => {
        element.timestamp = Util.formatDate(element.timestamp)
      });
      return this.useDate.metricDatas[0].data.map(r => r.timestamp)
    },
    // 计算系列数据
    values () {
      const array = [];
      this.seriesName.forEach((series, index) => {
        array.push({
          data: this.useDate.metricDatas[0].data.map(r => r.value),
          type: 'line',
          name: series,
        })
      })
      return array;
    }
  },

  mounted () {
    console.log(fakeResponse2)
    this.renderChart()
  },

  methods: {
    renderChart () {
      this.chart = echarts.init(this.$refs.myEchart);
      // 把配置和数据放这里
      const cfg = {
        title: {
          text: this.titleText,
          subtext: this.titleSubText
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.seriesName,
          bottom: 0,
          selectedMode: false,
        },
        // 内边距
        grid: {
          // 有副标题&纵坐标名称y轴下移
          top: (this.titleSubText && this.yAxisName) ? '28%' : '20%',
          left: '4%',
          right: '8%',
          bottom: '12%',
          containLabel: true
        },
        // 工具栏
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        // 提示框
        tooltip: {
          show: true,
          trigger: 'axis',
          // 系列提示框显示格式
          formatter: (paramsArr) => {
            let cont = `${paramsArr[0].name}<br/>`;
            cont += paramsArr.map(
              params => `${params.marker}${params.seriesName}: ${params.value}${this.unit}`
            ).join('<br/>');
            return cont;
          },
        },
        // 横坐标配置
        xAxis: [
          {
            type: 'category',
            axisLine: {
              onZero: false,
            },
            boundaryGap: false,
            // 横坐标Label 显示
            axisLabel: {
              show: true,
              formatter: (str) => {
                return str.replace(/^\d{4}-(\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})$/g, '$1' + '\n' + '$2')
              },
              interval: 12,
              showMaxLabel: true
            },
            data: this.keys
          }
        ],
        // 纵坐标配置
        yAxis: [{
          name: this.yAxisName,
          type: 'value',
          // 控制是否显示纵坐标
          axisLine: {
            show: false
          },
          // 设置y轴分割线
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          },
          // 做坐标分割指定最小最大值
          min: 0,
          max: 2
        }],
        // 设置系列颜色
        color: this.color,
        series: this.values
      }

      this.chart.setOption(cfg)
    }
  }
}
</script>
<style lang="scss" scoped>
#show-single-chart {
  border: 1px solid #d9e1e9;
}
</style>


