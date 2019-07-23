<template>
  <div id="show-single-chart"
       :style="style"
       ref="myEchart">
  </div>
</template>
<script>

import echarts from 'echarts'

export default {
  name: 'LineChart',
  props: {
    // 数值系列的颜色列表
    color: {
      type: Array,
      default () {
        return ['#66CC00', '#FF9900'];
      }
    },
    // 系列图例名称
    seriesName: {
      type: Array,
      default () {
        return [];
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
      default: '35%'
    },
    // 图标高度
    height: {
      type: String,
      default: '350px'
    },
    // 系列数据
    seriesData: {
      type: Array,
      default () {
        return [];
      }
    },
    dataZoom: {
      type: Boolean,
      default: false
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
    // 计算横坐标
    keys () {
      return this.seriesData.map(k => k.times)
    },
    // 计算系列数据
    values () {
      const array = [];
      this.seriesName.forEach((series, index) => {
        array.push({
          data: this.seriesData.map(r => r.value[index]),
          type: 'line',
          name: series,
        })
      })
      return array;
    }
  },

  mounted () {
    this.renderChart()
    window.onresize = () => (() => {
      this.chart.resize();
    })();
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
        dataZoom: {
          show: this.dataZoom,
          strart: 0,
          bottom: '10%'
        },
        // 内边距
        grid: {
          // 有副标题&纵坐标名称y轴下移
          top: (this.titleSubText || this.yAxisName) ? '28%' : '14%',
          left: '4%',
          right: '8%',
          bottom: this.dataZoom ? '20%' : '12%',
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
            axisLine: {
              onZero: false,
              lineStyle: {
                color: '#E9E9E9',
              }
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


