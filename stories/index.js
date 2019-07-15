import changeTime from './changeTime/changeTime'
import lineChart from './line-chart/line-chart'

const components = {
  changeTime,
  lineChart
}
/**
 *
 * @param {Vue} Vue
 */
const install = function(Vue) {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
}

components.map(component => {
  component.install = function(Vue) {
    Vue.component(component.name, component)
  }
})

console.log(components)

export default {
  install,
  components
}
export { install, components }
