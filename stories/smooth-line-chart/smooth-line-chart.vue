<template>
  <div :style="style"
       ref="myEchart">
  </div>
</template>
<script>
import echarts from 'echarts'

export default {
  name: 'SmoothLineChart',
  props: {
    // 数值系列的颜色列表
    color: {
      type: Array,
      default () {
        return ['#FF9900', '#66CC00'];
      }
    },
    // 图标宽度
    width: {
      type: String,
      default: '35%'
    },
    // 图标高度
    height: {
      type: String,
      default: '350px'
    }
  },
  computed: {
    // 图标样式
    style () {
      return `width:${this.width};height:${this.height}`
    }
  },
  mounted () {
    this.renderChart();
  },
  methods: {
    renderChart () {
      this.chart = echarts.init(this.$refs.myEchart);
      const cfg = {
        color: this.color,
        legend: {
          data: ['温度（℃）', '湿度（%）'],
          bottom: 0
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          top: 70,
          bottom: 50
        },
        xAxis: {
          type: 'category',
          data: ['2019-07-22 12:00', '2019-07-22 12:00', '2019-07-22 12:05', '2019-07-22 12:10', '2019-07-22 12:15', '2019-07-22 12:20', '2019-07-22 12:25', '2019-07-22 12:30', '2019-07-22 12:35', '2019-07-22 12:40', '2019-07-22 12:45', '2019-07-22 12:50']
        },
        yAxis: [{
          type: 'value',
          name: '温度（℃）',
          min: 0,
          max: 80,
          axisLine: {
            show: false,
            lineStyle: {
              color: this.color[0],
            }
          },
          axisLabel: {
            formatter: '{value} ℃'
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        {
          type: 'value',
          name: '湿度（%）',
          min: 0,
          max: 80,
          position: 'right',
          axisLine: {
            show: false,
            lineStyle: {
              color: this.color[1],
            }
          },
          axisLabel: {
            formatter: '{value} %'
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },],
        series: [{
          name: '温度（℃）',
          type: 'line',
          smooth: true,
          data: [20, 21, 24, 26, 25.6, 28, 40, 30, 28, 20.0, 18, 16],
          markLine: {
            data: [
              { type: 'average', name: '平均值' }
            ]
          }
        },
        {
          name: '湿度（%）',
          type: 'line',
          smooth: true,
          yAxisIndex: 1,
          data: [23, 25, 26, 28, 29, 30, 42, 34, 29, 22.0, 20, 19],
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          }
        },]
      }
      this.chart.setOption(cfg)
    }
  }

}
</script>
<style lang="scss" scoped>
</style>


