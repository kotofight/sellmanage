<template>
  <div>
    <el-menu
      :default-active="celpath"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#3a6f9c"
      text-color="#fff"
      active-text-color="#1A3F6E"
      :collapse="isCollapse"
      :collapse-transition="false"
      :router="true"
    >
      <template v-for="item in menu">
        <el-menu-item
          v-if="!item.children || item.path === '/order'"
          :index="item.path === '/order' ? '/order/list' : item.path"
          :key="item.path"
        >
          <i class="iconfont" :class="item.meta.icon"></i>
          <span slot="title">{{ item.meta.name }}</span>
        </el-menu-item>
        <el-submenu v-else :index="item.path" :key="item.path">
          <template slot="title">
            <i class="iconfont" :class="item.meta.icon"></i>
            <span>{{ item.meta.name }}</span>
          </template>
          <el-menu-item
            :index="sub.path"
            v-for="sub in item.children"
            :key="sub.path"
            >{{ sub.meta.name }}</el-menu-item
          >
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { local } from '../../utils/local.js'
export default {
  created() {
    this.menu = JSON.parse(local.get('menu'))
  },
  data() {
    return {
      menu: {}
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    celpath() {
      if (this.$route.path.includes('pro/edit')) {
        return '/pro/list'
      } else if (this.$route.path.includes('order/edit')) {
        return '/order/list'
      } else {
        return this.$route.path
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu {
  border: none;
  i {
    margin-right: 15px;
  }
}
</style>
