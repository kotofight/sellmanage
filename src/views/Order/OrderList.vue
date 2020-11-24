<template>
  <div>
    <el-card>
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        ref="formInline"
      >
        <el-form-item label="订单号" prop="orderNo">
          <el-input
            v-model="formInline.orderNo"
            placeholder="订单号"
          ></el-input>
        </el-form-item>
        <el-form-item label="收货人" prop="consignee">
          <el-input
            v-model="formInline.consignee"
            placeholder="收货人"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formInline.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" prop="orderState">
          <el-select v-model="formInline.orderState" placeholder="订单状态">
            <el-option label="已受理" value="已受理"></el-option>
            <el-option label="派送中" value="派送中"></el-option>
            <el-option label="已完成" value="已完成"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间" prop="date">
          <el-date-picker
            v-model="formInline.date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="mini"
            >查询</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="resetForm" size="mini">重置</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="orderNo" label="订单号" width="150">
        </el-table-column>
        <el-table-column label="下单时间" width="220">
          <template v-slot="{ row }">
            {{ row.orderTime | formatDate }}
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="120">
        </el-table-column>
        <el-table-column prop="consignee" label="收货人" width="120">
        </el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址" width="120">
        </el-table-column>
        <el-table-column prop="deliveryTime" label="送达时间" width="220">
          <template v-slot="{ row }">
            {{ row.deliveryTime | formatDate }}
          </template>
        </el-table-column>
        <el-table-column prop="remarks" label="用户备注" width="120">
        </el-table-column>
        <el-table-column label="订单金额" width="120">
          <template v-slot="{ row }">
            {{ row.orderAmount | formatMoney }}
          </template>
        </el-table-column>
        <el-table-column prop="orderState" label="订单状态" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template v-slot="{ row }">
            <el-button type="text" size="small" @click="seeOrder(row.id)"
              >查看</el-button
            >
            <el-button type="text" size="small" @click="editFn(row.id)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 5, 10, 15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>

      <el-dialog title="商品详情" :visible.sync="dialogVisible" width="50%">
        <ul>
          <li>
            <strong>订单号：</strong><span>{{ details.orderNo }}</span>
          </li>
          <li>
            <strong>收货人：</strong><span>{{ details.consignee }}</span>
          </li>
          <li>
            <strong>下单时间：</strong
            ><span>{{ details.orderTime | formatDate }}</span>
          </li>
          <li>
            <strong>手机号：</strong><span>{{ details.phone }}</span>
          </li>
          <li>
            <strong>订单金额：</strong><span>{{ details.orderAmount }}</span>
          </li>
          <li>
            <strong>送货地址：</strong><span>{{ details.deliverAddress }}</span>
          </li>
          <li>
            <strong>送达时间：</strong
            ><span>{{ details.deliveryTime | formatDate }}</span>
          </li>
          <li>
            <strong>备注：</strong><span>{{ details.remarks }}</span>
          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getOrder, getOrderDetails } from '../../Api/pro.js'
import { local } from '../../utils/local.js'
export default {
  created() {
    this.getOrderList()
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.getOrderList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getOrderList()
    },
    async getOrderList() {
      const { data, total } = await getOrder({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        orderNo: this.formInline.orderNo,
        consignee: this.formInline.consignee,
        phone: this.formInline.phone,
        orderState: this.formInline.orderState,
        date:
          this.formInline.date == null
            ? ''
            : JSON.stringify(this.formInline.date)
      })
      this.tableData = data
      this.total = total
    },
    onSubmit() {
      // this.currentPage = 1
      this.getOrderList()
    },
    resetForm() {
      this.$refs.formInline.resetFields()
      this.formInline.date = ''
      this.getOrderList()
    },
    async seeOrder(id) {
      this.dialogVisible = true
      const { data } = await getOrderDetails({
        id
      })
      this.details = data
    },
    editFn(id) {
      if (this.role === 'normal') {
        this.$notify.error({
          title: '权限错误',
          message: '用户权限不够'
        })
      } else {
        this.$router.push('/order/edit/' + id)
      }
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: [],
      formInline: {
        orderNo: '',
        consignee: '',
        phone: '',
        orderState: '',
        date: ''
      },
      dialogVisible: false,
      details: {},
      role: local.get('role')
    }
  }
}
</script>

<style lang="less" scoped>
ul {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  li {
    width: 50%;
    line-height: 30px;
  }
}
</style>
