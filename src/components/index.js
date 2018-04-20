import lazyLoad from './lazyLoad'
import ERRIMAGE from './err.png'
const lazyImag = {}

const install = (Vue, option) => {
  const options = {}
  Object.assign(options, {err: ERRIMAGE, aspectRatio: 1, loadTime: 1000}, option)
  if (install.installed) {
    return
  }
  console.log(option)
  lazyLoad.props.err.default = options.err
  lazyLoad.props.aspectRatio.default = options.aspectRatio
  lazyLoad.props.loadTime.default = options.loadTime
  console.log(lazyLoad)
  Vue.component(lazyLoad.name, lazyLoad)
}
lazyImag.install = install

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}

export default lazyImag
