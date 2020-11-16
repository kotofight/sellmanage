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
            <el-button type="primary" @click="submitForm('passForm')"
              >确认</el-button
            >
            <el-button @click="resetForm('passForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from '../../components/Panel/index'
import {
  validatePwd,
  validateCheckPass,
  validateNewPass
} from '../../until/validate.js'
export default {
  components: {
    Panel
  },
  data() {
    return {
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
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
</style>
