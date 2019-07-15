<template>
  <div id="show-radar-chart"
       :style="style"
       ref="radarChart">
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'RadarChart',
  props: {
    // 图标宽度
    width: {
      type: String,
      default: '50%'
    },
    // 图标高度
    height: {
      type: String,
      default: '400px'
    }
  },
  data () {
    return {}
  },
  mounted () {
    this.renderChart()
  },
  computed: {    // 图标样式
    style () {
      return `width:${this.width};height:${this.height}`
    },  },
  methods: {
    renderChart () {
      this.chart = echarts.init(this.$refs.radarChart);
      const cfg = {
        tooltip: {},
        grid: {
          x: 25,
          y: 45,
          x2: 5,
          y2: 20,
          borderWidth: 1
        },
        legend: {
          data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）'],
          bottom: '0'
        },
        radar: {
          name: {
            textStyle: {
              color: 'black',
              fontSize: '13',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            { name: '销售', max: 6500 },
            { name: '管理', max: 16000 },
            { name: '信息技术', max: 30000 },
            { name: '客服', max: 38000 },
            { name: '研发', max: 52000 },
            { name: '市场', max: 25000 }
          ]
        },
        series: [{
          name: '预算 vs 开销（Budget vs spending）',
          type: 'radar',
          // areaStyle: {normal: {}},
          data: [
            {
              value: [4300, 10000, 28000, 35000, 50000, 19000],
              name: '预算分配（Allocated Budget）'
            },
            {
              value: [5000, 14000, 28000, 31000, 42000, 21000],
              name: '实际开销（Actual Spending）'
            }
          ]
        }]
      }
      this.chart.setOption(cfg)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>


