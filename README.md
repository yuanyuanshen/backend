# backend

私有组件库搭建

### 在项目中安装方式

```
npm i vue_backend
```

### 在项目中使用方式

```js
import Vue from 'vue'
import Backend from 'vue_backend'

Vue.use(Backend)
```

直接使用组件

```html
<line-chart
  :seriesName="seriesName"
  :seriesData="seriesData"
  titleText="内存使用率（%）"
  v-if="showGraph"
  titleSubText="纯属虚构"
  :unit="unit"
>
</line-chart>
```

### 项目搭建

查看 CHANGELOG.md 文档 （包含以下内容）

1. 项目搭建过程
2. 版本更新信息
