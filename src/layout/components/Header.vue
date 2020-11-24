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
          欢迎你，{{ user.account
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="personal">个人中心</el-dropdown-item>
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="block">
        <el-avatar :size="40" :src="user.imgUrl"></el-avatar>
      </div>
    </div>
  </div>
</template>

<script>
import { local } from '../../utils/local.js'
import { getPersonal } from '../../Api/users.js'
export default {
  created() {
    this.changeBreadcrumb()
    this.getPersonalInfo()
  },
  data() {
    return {
      listArr: [],
      user: {}
    }
  },
  methods: {
    handleCommand(c) {
      if (c === 'personal') {
        this.$router.push('/account/personal')
      } else if (c === 'exit') {
        local.clear()
        location.reload()
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
    },
    async getPersonalInfo() {
      const data = await getPersonal()
      local.set('user', JSON.stringify(data.accountInfo))
      await this.getInfo()
    },
    getInfo() {
      this.user = JSON.parse(local.get('user'))
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
