<template>
  <div class="header">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          :to="{ path: item.path }"
          v-for="item in listArr"
          :key="item.path"
          >{{ item.name }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="header-right">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          欢迎你，小飞飞<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="personal">个人中心</el-dropdown-item>
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="block">
        <el-avatar
          :size="40"
          :src="require('../../assets/images/head.jpg')"
        ></el-avatar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.changeBreadcrumb()
  },
  data() {
    return {
      listArr: []
    }
  },
  methods: {
    handleCommand(c) {
      if (c === 'personal') {
        console.log('个人中心')
      } else if (c === 'exit') {
        this.$router.push('/login')
      }
    },
    changeBreadcrumb() {
      var arr = [{ path: '/', name: '首页' }]
      this.$route.matched.forEach((item) => {
        if (item.meta && item.meta.name) {
          arr.push({
            path: item.path,
            name: item.meta.name
          })
        }
      })
      this.listArr = arr
    }
  },
  watch: {
    '$route.path'() {
      this.changeBreadcrumb()
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-right {
    display: flex;
    align-items: center;
    .el-dropdown {
      cursor: pointer;
      margin-right: 10px;
    }
  }
}
</style>
