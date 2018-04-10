import lazyLoad from './lazyLoad'
const lazyImag = {}

const install = (Vue) => {
  if (install.installed) {
    return
  }
  Vue.component(lazyLoad.name, lazyLoad)
}
lazyImag.install = install

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}

export default lazyImag
