import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import changeTime from './changeTime'

storiesOf('changeTime', module)
  .add('修改时间', () => ({
    components: { changeTime },
    template: `<div>
  <h4>选择时间：{{ curTime }}</h4>
  <el-button @click="handleChangeTime">选择起租时间</el-button>
  <change-time :title="changeTimeTitle"
  :time.sync="curTime"
  v-if="changeTimeVisiable"
  :typeTime="changeTimeType"
  :referTime="referTime"
  ref="changeTime"
  :visible.sync="changeTimeVisiable"
  @changeTime="changeTime" />
  </div>`,
    data() {
      return {
        changeTimeTitle: '起租时间',
        curTime: '2019-06-25',
        changeTimeType: 'start',
        changeTimeVisiable: false,
        referTime: ''
      }
    },
    methods: {
      changeTime(type, time, fn) {
        this.curTime = time
        fn()
      },
      handleChangeTime() {
        this.changeTimeVisiable = true
      }
    }
  }))
  .add('修改时间(含参考时间)', () => ({
    components: { changeTime },
    template: `<div>
  <h4>参考时间为{{referTime}}，选择退租时间：{{ curTime }}</h4>
  <el-button @click="handleChangeTime">选择退租时间</el-button>
  <change-time :title="changeTimeTitle"
  :time.sync="curTime"
  v-if="changeTimeVisiable"
  :typeTime="changeTimeType"
  :referTime="referTime"
  ref="changeTime"
  :visible.sync="changeTimeVisiable"
  @changeTime="changeTime" />
  </div>`,
    data() {
      return {
        changeTimeTitle: '退租时间',
        curTime: '',
        changeTimeType: 'end',
        changeTimeVisiable: false,
        referTime: new Date().toString()
      }
    },
    methods: {
      changeTime(type, time, fn) {
        this.curTime = time
        fn()
      },
      handleChangeTime() {
        this.changeTimeVisiable = true
      }
    }
  }))
