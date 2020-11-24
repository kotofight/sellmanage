<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { local } from './utils/local.js'
export default {
  data() {
    return {
      gapTime: 0,
      beforeUnloadTime: 0
    }
  },
  mounted() {
    // 当页面挂载的时候，注册页面刷新事件
    window.addEventListener('beforeunload', (e) => this.beforeunloadFn())
    window.addEventListener('unload', (e) => this.unloadFn())
  },
  methods: {
    // 需要屏幕和用户互动 只要用户离开页面（关闭、刷新、跳转其他页面）就会触发
    unloadFn() {
      this.gapTime = new Date().getTime() - this.beforeUnloadTime
      if (this.gapTime <= 5) {
        local.remove('token')
      }
    },
    // 不用与用户互动 用户离开页面（关闭、刷新、跳转其他页面）才会触发
    beforeunloadFn() {
      this.beforeUnloadTime = new Date().getTime()
    }
  },
  destroyed() {
    // 当页面卸载事件的时候，移除刷新事件
    window.removeEventListener('beforeunload', (e) => this.beforeunloadFn())
    window.removeEventListener('unload', (e) => this.unloadFn())
  }
}
</script>

<style lang="less">
#app {
  height: 100%;
}
</style>
