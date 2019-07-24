<template>
  <div :style="style"
       ref="myEchart"></div>
</template>
<script>
import echarts from 'echarts'

export default {
  name: 'BarChart',
  props: {
    color: { // 数值系列的颜色列表
      type: Array,
      default () {
        return ['#FF9900', '#66CC00'];
      }
    },
    width: {// 图标宽度
      type: String,
      default: '35%'
    },
    height: {// 图标高度
      type: String,
      default: '350px'
    },
    yAxisData: { // y轴刻度
      type: Array,
      default: () => []
    },
    seriesData: { // 系列数据
      type: Array,
      default: () => []
    }
  },
  computed: {
    style () { // 图标样式
      return `width:${this.width};height:${this.height}`
    },
    legend () { // 图例
      return Object.keys(this.seriesData)
    },
    series () { // 系列数据
      const series = []
      Object.keys(this.seriesData).forEach((key) => {
        series.push({
          name: key,
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: this.seriesData[key]
        })
      });
      return series;
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.renderChart();
    window.onresize = () => (() => {
      this.chart.resize();
    })();
  },
  methods: {
    renderChart () {
      this.chart = echarts.init(this.$refs.myEchart);
      const cfg = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: this.legend,
          bottom: 0
        },
        grid: {
          top: '8%',
          left: '10%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: this.yAxisData
        },
        dataZoom: [{
          type: 'slider',
          yAxisIndex: 0,
          filterMode: 'empty',
          x: 10,
          start: 0,
          end: 100,
          textStyle: {
            color: "black"
          }
        }],
        series: this.series
      };
      this.chart.setOption(cfg);
    }
  }

}
</script>
<style lang="scss" scoped>
</style>


