import { configure } from '@storybook/vue'
import Vue from 'vue'
import JElement from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(JElement)

const req = require.context('../stories', true, /\.stories\.js$/)
console.log(req.keys()) // 是一个函数，它返回一个数组，由所有可能被上下文模块处理的请求组成

function loadStories() {
  req.keys().forEach(filename => {
    console.log(filename)
    req(filename)
  })
  // require('../stories/index.js')
  // You can require as many stories as you need.
}

configure(loadStories, module)
