import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import GeoMap from './geo-map'

storiesOf('监控图标（地图）', module).add(
  '省市地图',
  () => ({
    components: { GeoMap },
    template: `<div>
  <geo-map 
  width="46%"/>
  </div>`,
    data() {
      return {}
    }
  }),
  {
    info: {
      header: true
    }
  }
)
