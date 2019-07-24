<template>
  <div :style="style"
       ref="myEchart">
  </div>
</template>
<script>
import echarts from 'echarts'

const keyToTime = (key) => {
  const str = `${key}:00`;
  return (new Date(str)).getTime();
};

export default {
  name: 'SmoothLineChart',
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
    yAxisCfg: {// y轴配置
      type: Array,
      default: () => []
    },
    legendData: {// 图例
      type: Array,
      default: () => []
    },
    // 单个数据系列 {"2019-01-04 19:00": 9.17, "2019-01-04 19:05": 15.15}
    // 或多个数据系列 {"2019-01-04 19:00": [9.17, 20.00], "2019-01-04 19:05": [15.15, 12.50]}
    seriesData: {
      type: Object,
      default: null
    },
    unit: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      chart: null
    };
  },
  computed: {
    // 图标样式
    style () {
      return `width:${this.width};height:${this.height}`
    },
    // y轴配置
    yAxis () {
      const yAxis = [];
      this.yAxisCfg.forEach((item, index) => {
        yAxis.push({
          type: 'value',
          scale: true,
          name: item.legend,
          min: item.min,
          max: item.max,
          axisLine: {
            show: false,
            lineStyle: {
              color: this.color[index],
            }
          },
          axisLabel: {
            formatter: '{value}'
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
            }
          }
        });
      })
      return yAxis;
    },
    // x轴数据
    xAxis () {
      return Object.keys(this.seriesData)
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
      // 按时间排序先
      const data = this.seriesData;
      const sortedArr = Object.keys(data)
        .sort((a, b) => (keyToTime(a) - keyToTime(b)))
        .map((key) => {
          let v = data[key];
          if (!v) {
            v = [];
          }
          if (!Array.isArray(v)) { // 把单系列也统一处理成数组形式
            v = [v];
          }
          return {
            time: key,
            value: v.map(vnum => Number(vnum).toFixed(2))
          };
        });
      const values = sortedArr.map(item => item.value); // 一个二维数组
      const series = []
      this.legendData.forEach((k, index) => {
        series.push({
          name: k,
          type: 'line',
          smooth: true,
          yAxisIndex: index,
          data: values.map(subStr => subStr[index])
        })
      })
      const cfg = {
        color: this.color,
        legend: {
          data: this.legendData,
          bottom: 0
        },
        tooltip: {
          trigger: 'axis',
          formatter: (paramsArr) => {
            let cont = `${paramsArr[0].name}<br/>`;
            cont += paramsArr.map(
              params => `${params.marker}${params.seriesName}: ${params.value}${this.unit[params.seriesIndex]}`
            ).join('<br/>');
            return cont;
          },
        },
        grid: {
          top: 70,
          bottom: 50
        },
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: 'black',
            }
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(0,0,0,.85)'
            },
            showMaxLabel: true,
          },
          data: this.xAxis,
        },
        yAxis: this.yAxis,
        series: series
      }
      this.chart.setOption(cfg)
    }
  }

}
</script>
<style lang="scss" scoped>
</style>


