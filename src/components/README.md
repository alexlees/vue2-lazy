# vue2-lazy

> A vue lazy load image component

# [demo](https://alexlees.github.io/vue2-lazy/demo/)

## Build Setup

``` bash
# install dependencies
npm i vue2-lazy -s
```
```javascript
// main.js
import Vue from 'vue'
import lazyLoad from 'vue2-lazy'

Vue.use(lazyLoad)

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})

```

```html
 <!-- app.vue -->
<template>
<!--
    // 宽高比
    aspectRatio: {
      type: Number,
      default: 1
    },
    // 目标图片
    src: {
      type: String,
      required: true
    },
    // 错误图片
    err: {
      type: String,
      default: ERRIMAGE
    },
    // 延迟加载时间
    loadTime: {
      type: Number,
      default: 1000
    }
*
* TODO  多种 load样式选择
* TODO  添加demo 动图
* TODO  添加加载image timeout 提示
*
-->
  <div id="app">
    <someThingYourComponents/>
    <lazyLoad src="path/to/image.png"/>
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
