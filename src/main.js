// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ERRIMAGE from '../static/err.png'

import backUp from './components/index'

const option = {
  aspectRatio: 2.9, // 默认图片宽高比
  err: ERRIMAGE, // 默认加载错误图
  loadTime: 2000 // 默认加载时机
}

Vue.config.productionTip = false
Vue.use(backUp, option)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
