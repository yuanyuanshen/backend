import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import smoothLineChart from './smooth-line-chart'

storiesOf('监控图表(平滑折线图)', module).add('平滑折线图', () => ({
  components: { smoothLineChart },
  template: `<div>
<smooth-line-chart/>
</div>`
}))
