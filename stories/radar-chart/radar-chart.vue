<template>
  <div class="radar-container"
       :style="style">
    <div class="image-border image-border1"></div>
    <div class="image-border image-border2"></div>
    <div class="image-border image-border3"></div>
    <div class="image-border image-border4"></div>
    <div id="show-radar-chart"
         ref="radarChart">
    </div>
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
      default: '36%'
    },
    // 图标高度
    height: {
      type: String,
      default: '400px'
    },
    // 数值系列的颜色列表
    color: {
      type: Array,
      default () {
        return ['#66CC00', '#FF9900'];
      }
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 图例名称
    legendName: {
      type: Array,
      default () {
        return [];
      }
    },
    // 指示器
    indicator: {
      type: Array,
      default () {
        return [];
      }
    },
    // series数据
    seriesData: {
      type: Array,
      default () {
        return [];
      }
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
    },
  },
  methods: {
    renderChart () {
      this.chart = echarts.init(this.$refs.radarChart);
      const cfg = {
        title: {
          text: this.title,
          top: 6,
          left: 4,
          textStyle: {
            color: '#54dcf2',
            fontSize: 15
          }
        },
        tooltip: {},
        color: this.color,
        legend: {
          data: this.legendName,
          bottom: '2%',
          itemGap: 20,
          textStyle: {
            color: 'white',
          }
        },
        radar: {
          radius: '65%',
          center: ['50%', '47%'],
          name: {
            textStyle: {
              color: 'white',
              fontSize: '13',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: this.indicator
        },
        series: [{
          type: 'radar',
          data: this.seriesData
        }]
      }
      this.chart.setOption(cfg)
    }
  }
}
</script>
<style lang="scss" scoped>
.radar-container {
  background-color: rgb(2, 22, 64);
  overflow: hidden;
  position: relative;
  #show-radar-chart {
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    margin: 20px;
    border: 1px solid #54dcf2;
  }
  .image-border {
    position: absolute;
    width: 30px;
    height: 30px;
  }

  .image-border1 {
    top: 17px;
    left: 17px;
    border-left: 3px solid #54dcf2;
    border-top: 3px solid #54dcf2;
  }

  .image-border2 {
    top: 17px;
    right: 15px;
    border-right: 3px solid #54dcf2;
    border-top: 3px solid #54dcf2;
  }

  .image-border3 {
    bottom: 17px;
    left: 17px;
    border-bottom: 3px solid #54dcf2;
    border-left: 3px solid #54dcf2;
  }

  .image-border4 {
    bottom: 17px;
    right: 15px;
    border-right: 3px solid #54dcf2;
    border-bottom: 3px solid #54dcf2;
  }
}
</style>


