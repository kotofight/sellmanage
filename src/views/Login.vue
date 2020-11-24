<template>
  <div class="login">
    <div class="login-box">
      <h2>系统登录</h2>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        class="demo-ruleForm"
        size="mini"
      >
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            autocomplete="off"
            prefix-icon="iconfont icon-yonghu"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input
            :type="flag ? 'text' : 'password'"
            v-model="loginForm.pwd"
            autocomplete="off"
            prefix-icon="iconfont icon-mima"
            @keyup.native.13.once="submitForm('loginForm')"
          >
            <template #suffix>
              <i
                class="iconfont"
                :class="flag ? 'icon-eyes-' : 'icon-eyes'"
                @click="flag = !flag"
              ></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="login-btn"
            @click="submitForm('loginForm')"
            :loading="islog"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '../Api/users.js'
import { local } from '../utils/local.js'
import { createRoute } from '../router/index.js'
export default {
  data() {
    const reg1 = /^([a-zA-Z0-9_-]|[\u4E00-\u9FA5]){3,13}$/
    const reg2 = /^([a-zA-Z0-9_-]){3,13}$/
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (!reg1.test(value)) {
        callback(
          new Error('请输入3-13位用户名，仅支持字母、数字、下划线和汉字')
        )
      } else {
        callback()
      }
    }
    var validatePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!reg2.test(value)) {
        callback(new Error('请输入3-13位密码'))
      } else {
        callback()
      }
    }
    return {
      islog: false,
      flag: false,
      loginForm: {
        username: '',
        pwd: ''
      },
      rules: {
        username: [{ validator: validateUsername, trigger: 'blur' }],
        pwd: [{ validator: validatePwd, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.islog = true
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // alert('submit!')
          const data = await login({
            account: this.loginForm.username,
            password: this.loginForm.pwd
          })
          if (data.code === 0) {
            setTimeout(() => {
              local.set('token', data.token)
              local.set('role', data.role)

              createRoute()
              this.$router.push('/')
            }, 3000)
          } else if (data.code === 1) {
            this.islog = false
          }
        } else {
          console.log('error submit!!')
          this.islog = false
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  // background-color: rgb(10, 54, 72);
  background: url('../assets/images/b3_01.jpg') no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 400px;

    h2 {
      font-size: 20px;
      font-weight: 700;
      color: #fff;
      letter-spacing: 3px;
      text-align: center;
      margin-bottom: 10px;
    }
    .login-btn {
      width: 100%;
    }
    /deep/ .el-input {
      input {
        color: #fff;
        background-color: rgb(10, 54, 72);
      }
      .el-input__suffix-inner {
        float: right;
      }
    }
  }
}
</style>
