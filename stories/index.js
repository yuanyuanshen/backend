import ChangeTime from './changeTime/index.js'
import LineChart from './line-chart/index.js'
import RadarChart from './radar-chart/index.js'

const components = [ChangeTime, LineChart, RadarChart]

/**
 *
 * @param {Vue} Vue
 */
const install = function(Vue) {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
}

export default {
  install,
  ...components
}
export { install, components }
