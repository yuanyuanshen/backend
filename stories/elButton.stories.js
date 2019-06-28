import Vue from 'vue'
import { storiesOf } from '@storybook/vue'

storiesOf('elButton', module)
  .add('with text', () => '<el-button>with text</el-button>')
  .add('with emoji', () => '<el-button>😀 😎 👍 💯</el-button>')
  .add('as a component', () => ({
    template: '<el-button :disabled="true">rounded</el-button>'
  }))
