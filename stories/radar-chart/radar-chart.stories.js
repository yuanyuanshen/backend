import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import radarChart from './radar-chart'

storiesOf('大屏(雷达图)', module).add('雷达图', () => ({
  components: { radarChart },
  template: `<div>
  <radar-chart />
  </div>`
}))
