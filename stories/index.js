import ChangeTime from './changeTime/index'
import LineChart from './line-chart/index'

const components = [ChangeTime, LineChart]

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
