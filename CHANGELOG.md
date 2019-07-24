## （一）私有组件库搭建

> 汇总既有项目中的通用组件

[项目地址](https://github.com/yuanyuanshen/backend)

### 为什么搭建私有组件库

- 可复用 跨项目可以使用同一套私有组件库
- 方便维护 如需组件调整 只需要修改组件库 不需要跨项目重复修改

### 添加新组件原则

- 组件应先存在于具体项目中，经过重复验证后再抽象、沉淀到本组件库中
- 不涉及国际化、ajax 请求等业务逻辑

### 项目构建

#### 1.新建 package.json

```bash
cd XXX[项目名]
npm init
```

#### 2.Storybook for Vue

##### 学习内容

- Babel
  ES2016+ Support
  babelrc support
- Webpack
  CSS Support
  Image and Static File Support
  JSON Loader
- NPM Modules

##### 自动搭建

```bash
npx -p @storybook/cli sb init --type vue
```

##### 手动搭建

1. 安装依赖

```bash
# 安装storybook
npm install @storybook/vue --save-dev

# 安装vue 以及需要的loader
npm install vue --save
npm install vue-loader vue-template-compiler @babel/core babel-loader babel-preset-vue --save-dev
```

2. 在 package.json 添加启动项

```bash
{
  "scripts": {
    "storybook": "start-storybook"
  }
}
```

3. 创建 storybook 的配置文件

```js
import { configure } from '@storybook/vue'

function loadStories() {
  require('../stories/index.js')
  // You can require as many stories as you need.
}

configure(loadStories, module)
```

4. 创建测试文件 ./stories/elButton.stories.js

```js
// 引入了 element-ui 可以针对 el-button 组件测试项目是否正常
import Vue from 'vue'
import { storiesOf } from '@storybook/vue'

storiesOf('elButton', module)
  .add('with text', () => '<el-button>with text</el-button>')
  .add('with emoji', () => '<el-button>😀 😎 👍 💯</el-button>')
  .add('as a component', () => ({
    template: '<el-button :disabled="true">rounded</el-button>'
  }))
```

5. 运行查看效果

```bash
npm run storybook
```

6. 添加 storybook 的 info 配置信息

```bash
npm install --save-dev storybook-addon-vue-info @storybook/addon-storysource
```

在.storybook 目录下新增文件 addons.js

```js
import 'storybook-addon-vue-info/lib/register'
import '@storybook/addon-storysource/register'
```

在 webpack.config.js 下新增处理 loader

```js
config.module.rules.push({
  test: /\.stories\.js?$/,
  loaders: [require.resolve('@storybook/addon-storysource/loader')],
  enforce: 'pre'
})
config.module.rules.push({
  test: /\.vue$/,
  loader: 'storybook-addon-vue-info/loader',
  enforce: 'post'
})
```

修改.storybook 下 config.js

```js
// 具体配置可查看npm
import { configure, addDecorator } from '@storybook/vue'
import { withInfo, setDefaults } from 'storybook-addon-vue-info'

addDecorator(withInfo)
```

重新运行 npm run storybook 查看效果

##### 提取私有组件

1. 创建测试文件 ./stories/changeTime.vue

```vue
<template>
  <el-dialog
    :title="title"
    :visible.sync="show"
    width="400px"
    class="change-time-dialog"
    :close-on-click-modal="false"
    :before-close="handleClose"
  >
    <el-form :model="form" ref="form" style="margin-bottom:30px">
      <el-form-item style="margin-bottom:0px !important">
        <el-date-picker
          type="date"
          size="medium"
          value-format="yyyy-MM-dd"
          :placeholder="`请选择${title}`"
          v-model="form.time"
          style="width:94%"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleClose">取消</el-button>
      <el-button
        size="small"
        type="primary"
        @click="handleConfirm('form')"
        :disabled="disable"
        >确定</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      form: {
        time: ''
      },
      disable: false
    }
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    time: {
      type: String,
      default: ''
    },
    typeTime: {
      type: String,
      default: 'start'
    },
    title: {
      type: String,
      default: ''
    },
    referTime: {
      // 参考时间
      type: [Date, String],
      default: ''
    }
  },

  mounted() {
    this.show = this.visible
    this.form.time = this.time
  },

  methods: {
    handleClose() {
      this.$refs.form.resetFields()
      this.show = false
      this.$emit('update:visible', false)
      this.$emit('update:time', '')
    },

    handleConfirm() {
      if (this.typeTime === 'start') {
        if (
          new Date(this.form.time).getTime() >
          new Date(this.referTime).getTime()
        ) {
          this.$message.warning('起租时间必须小于等于退租时间')
          return
        }
      }
      if (this.typeTime === 'end') {
        if (
          new Date(this.form.time).getTime() <
          new Date(this.referTime).getTime()
        ) {
          this.$message.warning('退租时间必须大于等于起租时间')
          return
        }
      }
      this.$emit('changeTime', this.typeTime, this.form.time, this.clearData)
    },

    clearData() {
      this.show = false
      this.disable = false
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
div.el-form-item__error {
  top: 80% !important;
}
.change-time-dialog /deep/ .el-dialog__body {
  padding-bottom: 0px !important;
}
</style>
```

2. 创建测试文件 ./stories/changeTime.stories.js

```js
import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import changeTime from './changeTime'

storiesOf('changeTime', module).add('修改时间', () => ({
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
```

##### scss 报错，es6 语法报错

1. 解决 css 问题

```bash
// 安装相关loader
npm i -D node-sass less-loader css-loader style-loader
```

配置 webpack.config.js

```js
const path = require('path')

const pathResolve = p => path.resolve(__dirname, '../', p)

module.exports = ({ config, mode }) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': pathResolve('stories'),
    '~': pathResolve('node_modules')
  }
  config.module.rules.push({
    test: /\.scss$/,
    include: path.resolve(__dirname, '../stories'),
    use: ['style-loader', 'css-loader', 'sass-loader']
  })
  config.module.rules.push({
    test: /\.less$/,
    include: path.resolve(__dirname, '../stories'),
    use: ['style-loader', 'css-loader', 'less-loader']
  })
  if (process.env.NODE_ENV === 'production') {
    config.output.filename = 'bundle.[name].js'
    config.optimization.splitChunks.automaticNameDelimiter = '.'
    config.optimization.runtimeChunk = {
      name: entrypoint => `runtime.${entrypoint.name}`
    }
  }
  // console.log(config);
  return config
}
```

2. 解决 babel 问题

同上，安装 loader 配置.babelrc 配置文件

### 参考

1. [storybook](https://storybook.js.org/docs/guides/guide-vue/)
2. [storybook 配置之基本配置和 webpack 配置](https://www.cnblogs.com/mrzhu/p/10238832.html)
3. [vue 界面测试框架 storybook](https://blog.csdn.net/win7583362/article/details/79238060)
4. [storybook-addon-vue-info](https://storybook-addon-vue-info.netlify.com/?path=/story/examples-advance-usage--hide-story-source)

---

## （二）项目 CHANGELOG

### v-1.0.0(2019/06/28)

#### 新增 feature

-[项目搭建] 项目构建

-[新增 changeTime.vue 私有组件] 增加 demo

### v-1.1.0(2019/07/03)

#### 新增 feature

-[项目搭建] 新增 storybook 的配置信息&源码

-[新增 line-chart.vue 私有组件] 增加 demo

### v-1.1.1(2019/07/24)

#### 新增 feature

-[新增 smooth-line-chart.vue 私有组件] 增加 demo

-[新增 bar-chart.vue 私有组件] 增加 demo

### v-1.1.2(2019/07/24)

#### 新增 feature

-[新增 geo-map.vue 私有组件] 增加 demo
