<template>
  <div :style="style"
       ref="myEchart"></div>
</template>
<script>
import echarts from 'echarts'
import 'echarts/theme/macarons'

export default {
  name: 'PieChart',
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
    seriesData: { // 系列数据
      type: Object,
      default: () => null
    }
  },
  computed: {
    style () { // 图标样式
      return `width:${this.width};height:${this.height};`
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
      this.chart = echarts.init(this.$refs.myEchart, 'macarons');
      const cfg = {
        dataset: {
          source: [
            ['来源', '2018年', '2019年'],
            ['直接访问', 335, 385],
            ['邮件营销', 310, 360],
            ['联盟广告', 234, 234],
            ['视频广告', 135, 335],
            ['搜索引擎', 1548, 1248]
          ]
        },
        tooltip: {},
        legend: {
          bottom: 0
        },
        series: [
          {
            type: 'pie',
            radius: ['35%', '55%'],
            center: ['25%', '45%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontWeight: 'bold',
                fontSize: '16'
              }
            },
            encode: {
              itemName: '来源',
              value: '2018年',
              tooltip: ['来源', '2018年']
            }
          },
          {
            type: 'pie',
            radius: ['35%', '55%'],
            center: ['75%', '45%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontWeight: 'bold',
                fontSize: '16'
              }
            },
            encode: {
              itemName: '来源',
              value: '2019年',
              tooltip: ['来源', '2019年']
            }
          }
        ]
      };
      this.chart.setOption(cfg);
    }
  }

}
</script>
<style lang="scss" scoped>
</style>


