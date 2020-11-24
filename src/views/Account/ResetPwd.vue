<template>
  <div>
    <Panel>
      <template #header> 修改密码 </template>
      <template #content>
        <el-form
          :model="passForm"
          status-icon
          :rules="rules"
          ref="passForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="原密码" prop="oldPass">
            <el-input
              type="password"
              v-model="passForm.oldPass"
              autocomplete="off"
              @blur="checkOld"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="pwd">
            <el-input
              type="password"
              v-model="passForm.pwd"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="passForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('passForm')"
              size="mini"
              >确认</el-button
            >
            <el-button @click="resetForm('passForm')" size="mini"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </template>
    </Panel>
  </div>
</template>

<script>
import { oldPass, emitPass } from '../../Api/users.js'
import { local } from '../../utils/local.js'
import {
  validatePwd,
  validateCheckPass,
  validateNewPass
} from '../../utils/validate.js'
export default {
  data() {
    return {
      canEmit: false,
      passForm: {
        oldPass: '',
        pwd: '',
        checkPass: ''
      },
      rules: {
        oldPass: [{ validator: validatePwd, trigger: 'blur' }],
        pwd: [{ validator: validateNewPass(this), trigger: 'blur' }],
        checkPass: [{ validator: validateCheckPass(this), trigger: 'blur' }]
      }
    }
  },
  methods: {
    async checkOld() {
      const data = await oldPass({
        oldPwd: this.passForm.oldPass
      })
      if (data.code === '00') {
        this.canEmit = true
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // alert('submit!')
          if (this.canEmit) {
            const data = await emitPass({
              newPwd: this.passForm.pwd
            })
            if (data.code === 0) {
              this.$router.push('/login')
              local.remove('token')
            }
          }
        } else {
          console.log('error submit!!')
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
.el-form {
  width: 400px;
}
/deep/.el-form-item {
  .el-input {
    width: 200px;
    background-color: rgba(255, 255, 255, 0.2);
    input {
      background-color: rgba(255, 255, 255, 0.2) !important;
    }
  }

  .el-input__inner {
    background-color: rgba(255, 255, 255, 0.2) !important;
    input {
      background-color: rgba(255, 255, 255, 0.2) !important;
    }
  }
  .el-textarea {
    textarea {
      background-color: rgba(255, 255, 255, 0.2) !important;
    }
    width: 400px;
  }
}
</style>
