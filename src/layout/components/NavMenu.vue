<template>
  <div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#1989fa"
      :collapse="isCollapse"
      :collapse-transition="false"
      :router="true"
    >
      <el-menu-item index="/dashboard">
        <i class="iconfont icon-shouye"></i>
        <span slot="title">后台首页</span>
      </el-menu-item>
      <el-menu-item index="/order">
        <i class="iconfont icon-icon-"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <el-submenu index="/pro">
        <template slot="title">
          <i class="iconfont icon-shangpin"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item index="/pro/list">商品列表</el-menu-item>
        <el-menu-item index="/pro/add">商品添加</el-menu-item>
        <el-menu-item index="/pro/cate">商品分类</el-menu-item>
      </el-submenu>
      <el-menu-item index="/shop">
        <i class="iconfont icon-dianpu"></i>
        <span slot="title">店铺管理</span>
      </el-menu-item>
      <el-submenu index="/account">
        <template slot="title">
          <i class="iconfont icon-zhanghao"></i>
          <span>账号管理</span>
        </template>
        <el-menu-item index="/account/list">账号列表</el-menu-item>
        <el-menu-item index="/account/add">添加账号</el-menu-item>
        <el-menu-item index="/account/reset">修改密码</el-menu-item>
      </el-submenu>
      <el-submenu index="/sellcount">
        <template slot="title">
          <i class="iconfont icon-tongji"></i>
          <span>销售统计</span>
        </template>
        <el-menu-item index="/sellcount/goods">商品统计</el-menu-item>
        <el-menu-item index="/sellcount/order">订单统计</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
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
