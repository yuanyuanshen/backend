# backend

私有组件库搭建

### 在项目中安装方式

```
npm install backend
```

### 在项目中使用方式

```js
import Vue from 'vue'
import Backend from 'backend'

Vue.use(Backend)
```

直接使用组件

```html
 <single-line-chart
    :seriesName="seriesName"
    :seriesData="seriesData"
    titleText="内存使用率（%）"
    v-if="showGraph"
    titleSubText="纯属虚构"
    :unit="unit" />
  </div>
```

### 项目搭建

查看 CHANGELOG.md 文档 （包含以下内容）

1. 项目搭建过程
2. 版本更新信息
