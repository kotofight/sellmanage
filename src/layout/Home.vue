<template>
  <el-container>
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <div class="logo" @click="isCollapse = !isCollapse">
        <img src="../assets/images/logo2.jpeg" alt="" />
        <h3 v-show="!isCollapse">外卖商家中心</h3>
      </div>
      <VueMenu :isCollapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import VueMenu from './components/NavMenu'
import Header from './components/Header'
export default {
  components: {
    VueMenu,
    Header
  },
  data() {
    return {
      isCollapse: false
    }
  }
}
</script>

<style  lang="less">
.el-container {
  height: 100%;
  // background-color: pink;
  background: url('../assets/images/b3_01.jpg') no-repeat;
  background-size: cover;
}
.el-header {
  background-color: rgba(255, 255, 255, 0.6);
  padding-top: 10px !important;
}

.el-aside {
  background-color: #3a6f9c;
}

.el-main {
  // background-color: #73b7fb;
  // background: url('../assets/images/b2.jpeg') no-repeat;
  // background-size: cover;
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  cursor: pointer;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  h3 {
    color: #fff;
    margin-left: 5px;
    letter-spacing: 3px;
  }
}
</style>
