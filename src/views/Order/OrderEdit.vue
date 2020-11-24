<template>
  <div>
    <Panel>
      <template #header> 修改订单 </template>
      <template #content>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="收货人">
            <el-input v-model="ruleForm.consignee"></el-input>
          </el-form-item>
          <el-form-item label="订单号">
            <el-input v-model="ruleForm.orderNo"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="订单金额">
            <el-input-number
              v-model="ruleForm.orderAmount"
              @change="handleChange"
              :min="0"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="送货地址">
            <el-input v-model="ruleForm.deliverAddress"></el-input>
          </el-form-item>
          <el-form-item prop="value1" label="起止时间">
            <el-date-picker
              v-model="ruleForm.value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select
              v-model="ruleForm.orderState"
              placeholder="请选择商品分类"
            >
              <el-option label="已受理" value="已受理"></el-option>
              <el-option label="派送中" value="派送中"></el-option>
              <el-option label="已完成" value="已完成"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="ruleForm.remarks"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </template>
    </Panel>
  </div>
</template>

<script>
import { getOrderDetails, editOrder } from '../../Api/pro.js'
export default {
  created() {
    this.getOrderDetil()
  },
  data() {
    var validateValue1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入时间'))
      } else {
        callback()
      }
    }
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      id: this.$route.params.id,
      ruleForm: {},
      rules: {
        value1: [{ validator: validateValue1, trigger: 'blur' }]
      },
      value2: ''
    }
  },
  methods: {
    async getOrderDetil() {
      const { data } = await getOrderDetails({
        id: this.id
      })
      this.ruleForm = data
      // this.ruleForm.value1 = [data.orderTime, data.deliveryTime]
      this.$set(this.ruleForm, 'value1', [data.orderTime, data.deliveryTime])
      console.log(this.ruleForm)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const data = await editOrder(this.ruleForm)
          if (data.code === 0) {
            this.$router.push('/Order')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleChange(value) {
      console.log(value)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.el-form-item {
  .el-input {
    width: 200px;
    background-color: rgba(255, 255, 255, 0.2);
    input {
      background-color: rgba(255, 255, 255, 0.2) !important;
    }
  }
  .el-input-number__decrease,
  .el-input-number__increase {
    background-color: rgba(255, 255, 255, 0.2) !important;
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
