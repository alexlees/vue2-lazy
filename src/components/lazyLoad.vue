<template>
  <div :class="$style.lazy" ref="lazy">
    <img :src="data" alt="">
    <div :class="$style.warp" v-if="!data" >
      <i :class="[$style.iconfont, $style['icon-loading'], $style.anim]" v-show="!icon"></i>
      <slot name="icon"/>
    </div>
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
      offsetTop: 0,
      icon: false
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
    },
    getIconSlot () {
      return this.$slots && this.$slots.icon
    }
  },
  created () {
    this.$nextTick(() => {
      this.setElementHeight()
      this.icon = this.getIconSlot()
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
@import url(./font/iconfont.css);
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
  background: rgb(242, 242, 242);
  z-index: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.anim::before{
  display: block;
  color: #2f373d;
  box-sizing: border-box;
  font-size: 24px;
  animation: loading 2s linear infinite;
  will-change: transform;
}

@keyframes loading {
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(360deg);
  }
}
</style>
