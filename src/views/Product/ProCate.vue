<template>
  <div>
    <Panel>
      <template #header> 商品分类</template>
      <template #content>
        <el-button type="primary" size="mini" @click="dialogVisible = true"
          >添加分类</el-button
        >
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" width="90"> </el-table-column>
          <el-table-column label="分类名称" width="180">
            <template v-slot="{ row }">
              <span v-if="row.flag">{{ row.cateName }}</span>
              <input type="text" v-else v-model="row.cateName" />
            </template>
          </el-table-column>
          <el-table-column label="是否启用">
            <template v-slot="{ row }">
              <el-switch
                :disabled="row.flag"
                :active-value="1"
                :inactive-value="0"
                v-model="row.state"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="操作">
            <template v-slot="{ row }">
              <el-button
                :type="row.flag ? 'primary' : 'success'"
                size="mini"
                @click="editCate(row)"
                >{{ row.flag ? '编辑' : '完成' }}</el-button
              >
              <el-button type="danger" size="mini" @click="removeCate(row.id)"
                >删除</el-button
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
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <el-form
            :model="addForm"
            :rules="rules"
            status-icon
            ref="addForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="分类名称" prop="cateName">
              <el-input
                type="text"
                v-model="addForm.cateName"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否启用">
              <el-switch
                :active-value="1"
                :inactive-value="0"
                v-model="addForm.state"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancel()">取 消</el-button>
            <el-button type="primary" @click="sureAdd()">确 定</el-button>
          </span>
        </el-dialog>
      </template>
    </Panel>
  </div>
</template>

<script>
import { getCateList, addCate, removeCates, editCates } from '../../Api/pro.js'
export default {
  created() {
    this.getList()
  },
  data() {
    var validateCateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入产品分类'))
      } else {
        callback()
      }
    }
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: [],
      dialogVisible: false,
      addForm: {
        cateName: '',
        state: 0
      },
      rules: {
        cateName: [{ validator: validateCateName, trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },
    async getList() {
      const { data, total } = await getCateList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      data.forEach((item) => {
        item.flag = true
      })
      this.tableData = data
      this.total = total
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    sureAdd() {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          // alert('submit!')
          const data = await addCate({
            cateName: this.addForm.cateName,
            state: Boolean(this.addForm.state)
          })
          if (data.code === 0) {
            this.getList()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
      this.dialogVisible = false
      this.addForm.cateName = ''
      this.addForm.state = 0
      this.$refs.addForm.resetFields()
    },
    cancel() {
      this.dialogVisible = false
      this.addForm.cateName = ''
      this.addForm.state = 0
      this.dialogVisible = false
      this.$refs.addForm.resetFields()
    },
    removeCate(id) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const data = await removeCates({
            id
          })
          if (data.code === 0) {
            this.getList()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    async editCate(row) {
      if (!row.flag) {
        const data = await editCates({
          id: row.id,
          cateName: row.cateName,
          state: Boolean(row.state)
        })
        if (data.code === 0) {
        }
      }
      row.flag = !row.flag
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.el-table,
.el-table__expanded-cell {
  background-color: rgba(255, 255, 255, 0.2) !important;
  th,
  tr {
    background-color: rgba(255, 255, 255, 0.2) !important;
  }
}
/deep/.el-input__inner {
  background-color: rgba(255, 255, 255, 0.2) !important;
}
/deep/.el-pagination button:disabled {
  background-color: rgba(255, 255, 255, 0.2) !important;
}
/deep/.el-pager {
  .number,
  .active {
    background-color: rgba(255, 255, 255, 0.2) !important;
  }
  background-color: rgba(255, 255, 255, 0.2) !important;
}
</style>
