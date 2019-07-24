<template>
  <div :style="style"
       ref="myEchart"></div>
</template>
<script>
import echarts from 'echarts'
import 'echarts/map/js/province/neimenggu.js'

export default {
  name: 'GeoMap',
  props: {
    width: {// 图标宽度
      type: String,
      default: '35%'
    },
    height: {// 图标高度
      type: String,
      default: '350px'
    }
  },
  computed: {
    style () { // 图标样式
      return `width:${this.width};height:${this.height};`
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
        title: {
          text: '内蒙古自治区常住人口 （2017）',
          subtext: '常住人口数据来自 个人图书馆',
          sublink: 'http://www.360doc.com/content/18/1203/22/34165957_799113252.shtml'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/> 常住人口：{c} w'
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          right: 'right',
          top: 'top',
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        visualMap: {
          min: 100,
          max: 450,
          text: ['High', 'Low'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['lightskyblue', 'yellow', 'orangered']
          }
        },
        series: [{
          name: '内蒙古自治区2017常住人口',
          type: 'map',
          mapType: '内蒙古',
          top: '8%',
          left: '18%',
          zoom: 1.3,
          x: '25%',
          selectedMode: 'single',//multiple多选
          itemStyle: {
            normal: {
              label: {
                show: true,
                textStyle: {
                  color: "#231816"
                }
              },
              areaStyle: { color: '#B1D0EC' },
              color: '#B1D0EC',
              borderColor: '#dadfde'//区块的边框颜色 内蒙古2528.6
            },
            emphasis: {//鼠标hover样式
              label: {
                show: true,
                textStyle: {
                  color: '#fa4f04'
                }
              },
              areaStyle: { color: 'red' }
            }
          },
          data: [
            {
              name: '赤峰市',
              value: '431.5'
            },
            {
              name: '通辽市',
              value: '312.87'
            },
            {
              name: '呼和浩特市',
              value: '311.5'
            },
            {
              name: '包头市',
              value: '287.8'
            },
            {
              name: '呼伦贝尔市',
              value: '252.92'
            },
            {
              name: '乌兰察布市',
              value: '210.25'
            },
            {
              name: '鄂尔多斯市',
              value: '206.87'
            },
            {
              name: '巴彦淖尔市',
              value: '168.5'
            },
            {
              name: '兴安盟',
              value: '160.42'
            },
            {
              name: '锡林郭勒盟',
              value: '105.16'
            },
            {
              name: '乌海市',
              value: '56.11'
            },
            {
              name: '阿拉善盟',
              value: '28.4'
            }
          ]
        }]
      };
      this.chart.setOption(cfg);
    }
  }

}
</script>
<style lang="scss" scoped>
</style>


