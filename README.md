# vue2-lazy

> A vue lazy load image component

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
// app.vue
<template>
/*
* @props trueUrl:         String required: true  lazyLoad组件 真实url
* @props loadTime:        Number required: false lazyLoad组件 延迟加载image时长
*
* TODO  多种 load样式选择
* TODO  添加demo 动图
* TODO  添加加载image timeout 提示
*/
  <div id="app">
    <someThingYourComponents/>
    <lazyLoad trueUrl="path/to/image.png"/>
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
