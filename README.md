# vue2-lazy

> A vue lazy load image component

# [demo](https://alexlees.github.io/vue2-lazy/demo/)

## Build Setup

``` bash
# install dependencies
npm i vue2-lazy -s || yarn add vue2-lazy
```

***

```javascript
// main.js
import Vue from 'vue'
import lazyLoad from 'vue2-lazy'
import ERRIMAGE from 'path/to/err.png'

const option = {
  aspectRatio: 1, // 默认图片宽高比
  err: ERRIMAGE,  // 默认加载错误图
  loadTime: 1000  // 默认加载时机
}
Vue.use(lazyLoad， option) // 建议传递option对象 适配项目

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})

```

***

```html
 <!-- app.vue -->
<template>
  <div id="app">
    <someThingYourComponents/>
    <!-- 建议全局修改默认aspectRatio -->
    <lazyLoad src="path/to/image.png"/>
    <!-- slot自定义loading -->
    <lazyLoad src="https://img.mukewang.com/5ad015060001608909360316.jpg">
      <span slot="icon">hello</span>
    </lazyLoad>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>

```

***

## props

| name | desc | type | default | required |
| :--: | :--: | ---: | :-----: | :------: |
| aspectRatio | 宽高比 | Number | 1 | false |
| src | 目标图片src | String | '' | true |
| err | 请求图片错误展示图 | String(url || base64) | 默认错误图(base64) | false |
| loadTime | 异步请求图片延迟 | Number(ms) | 1000 | false |

## event
| name | desc | prams |
| :--: | :--: | ---: |
| err | 图片加载错误 | 错误原因 |

## slot
| name | desc | tips |
| :--: | :--: | ---: |
| icon | loading 组件 | 需要自己写动画 |

## option

| name | desc | recommend |
| :--: | :--: | ---: |
| aspectRatio | 重写props默认宽高比 | true |
| err | 重写props错误图片 | true |
| loadTime | 重写props异步加载时机 | true |

## Tips

1. 强烈建议传递aspectRatio 可以更好适配布局，不会引起重流
2. Vue.use(lazyLoad, option)  可以传递option对象 重写 props default 修改全局默认图片宽高比， 错误展示图， 图片延迟
3. 通过slot icon 插槽 自定义 loading动画


## TODO
[ x ]  demo演示
[  ]   多种load效果
[ x ]  自定义load(slot)
[  ]   解决向上滚动 懒加载
