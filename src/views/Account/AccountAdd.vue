<template>
  <div>
    <Panel>
      <template #header> 添加账号 </template>
      <template #content>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              type="text"
              v-model="ruleForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input
              type="password"
              v-model="ruleForm.pwd"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="selectVal">
            <el-select v-model="ruleForm.selectVal" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >添加</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from '../../components/Panel/index'
import { validateUsername, validatePwd } from '../../until/validate.js'
export default {
  components: {
    Panel
  },
  data() {
    var validateSelectVal = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择用户身份'))
      } else {
        callback()
      }
    }
    return {
      options: [
        {
          value: '普通管理员',
          label: '普通管理员'
        },
        {
          value: '超级管理员',
          label: '超级管理员'
        }
      ],
      ruleForm: {
        username: '',
        pwd: '',
        selectVal: ''
      },
      rules: {
        username: [{ validator: validateUsername, trigger: 'blur' }],
        pwd: [{ validator: validatePwd, trigger: 'blur' }],
        selectVal: [{ validator: validateSelectVal, trigger: 'blur' }]
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
