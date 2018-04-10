<template>
  <div :class="$style.lazy">
    <img :src="src" alt="图" ref="lazyImg">
    <div v-if="!src" :class="$style.load_wallpper">
      <div :class="$style.bg_rotate_loader"></div>
    </div>
  </div>
</template>

<script>
const NAME = 'lazyLoad'
export default {
  name: NAME,
  props: {
    trueUrl: {
      type: String,
      required: true
    },
    loadTime: {
      type: Number,
      default: 500
    }
  },
  data () {
    return {
      src: '',
      timeId: null
    }
  },
  methods: {
    scroll () {
      window.cancelAnimationFrame(this.timeId) // 取消重复触发的scroll事件

      let func = () => {
        if ((window.scrollY + window.innerHeight) >= this.$refs.lazyImg.y) { // 检查图片是否进入视口
          // 加载真的地址
          setTimeout(() => {
            this.src = this.trueUrl
          }, this.loadTime)
          this.cancelScroll() // 取消事件
        }
      }
      this.timeId = window.requestAnimationFrame(func)
    },
    initScroll () {
      window.addEventListener('scroll', this.scroll, false)
    },
    cancelScroll () {
      window.removeEventListener('scroll', this.scroll, false)
    }
  },
  created () {
    this.scroll()
    this.initScroll()
  },
  beforeDestroy () {
    this.cancelScroll()
  }
}
</script>

<style module>
img{
  max-width: 100%;
}
.lazy{
  max-width: 100%;
  min-height: 5rem;
  text-align: center;
  position: relative;
}
.bg_rotate_loader {
  width: 4rem;
  height: 4rem;
  box-sizing: border-box;
  border: 0.4rem solid #B8D0FA;
  border-top-color: #0052EC;
  border-radius: 50%;
  animation: loader_rotate 1s linear infinite;
}

@keyframes loader_rotate {
  0% {
    transform: rotate(0);
    }
  100% {
    transform: rotate(360deg);
    }
}
.load_wallpper{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 1;
  background: #ffffff;
}
</style>
