<template>
  <div :class="$style.lazy" ref="lazy">
    <img :src="data" alt="">
    <transition name="slide-fade">
      <div :class="$style.warp" v-if="!data" >
        <div class="huan-loader"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import ERRIMAGE from './err.png'
const NAME = 'lazyLoad'
export default {
  name: NAME,
  props: {
    aspectRatio: { // w/h h = w / aspectRatio
      type: Number,
      default: 1
    },
    src: {
      type: String,
      required: true
    },
    err: {
      type: String,
      default: ERRIMAGE
    },
    loadTime: {
      type: Number,
      default: 1000
    }
  },
  data () {
    return {
      data: '',
      offsetWidth: 0,
      offsetTop: 0
    }
  },
  methods: {
    setElementHeight () {
      let func = () => {
        this.$refs.lazy.style.height = this.$refs.lazy.offsetWidth / this.aspectRatio + 'px'
        this.offsetTop = this.$refs.lazy.offsetTop
      }
      requestAnimationFrame(func)
    },
    getElementView (e) {
      let callBack = () => {
        const height = window.innerHeight
        if ((this.offsetTop - window.scrollY) <= height) {
          setTimeout(() => {
            this.getImage(this.src)
          }, this.loadTime)
          this.cancelScrollListener(this.src)
        }
      }
      requestAnimationFrame(callBack)
    },
    getImage (src) {
      console.log(this)
      console.log(src)
      fetch(src)
        .then((response) => {
          if (response.ok) {
            return response.blob()
          }
          throw new Error('Network response was not ok.')
        })
        .then((blob) => {
          this.data = URL.createObjectURL(blob)
        })
        .catch(err => {
          this.$emit('err', err)
          this.data = this.err
        })
    },
    requestResizeListener () {
      window.addEventListener('resize', this.setElementHeight, false)
    },
    cancelResizeListener () {
      window.removeEventListener('resize', this.setElementHeight, false)
    },
    requestScrollListener () {
      window.addEventListener('scroll', this.getElementView, false)
    },
    cancelScrollListener () {
      window.removeEventListener('scroll', this.getElementView, false)
    }
  },
  created () {
    this.$nextTick(() => {
      this.setElementHeight()
    })
    this.requestResizeListener()
    this.requestScrollListener()
  },
  beforeDestroy () {
    this.cancelResizeListener()
    this.cancelScrollListener()
  }
}
</script>

<style module>
.lazy{
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.lazy > img{
  max-width: 100%;
  max-height: 100%;
}
.warp{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  z-index: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
<style>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(100vw);
  opacity: 0;
}
.huan-loader {
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  border: 5px solid transparent;
  border-top-color: #2AAB69;
  border-bottom-color: #2AAB69;
  border-radius: 50%;
  animation: huan-rotate 1s linear infinite;
}

@keyframes huan-rotate {
  0% {
    transform: rotate(0); }
  100% {
    transform: rotate(360deg); } }

</style>
