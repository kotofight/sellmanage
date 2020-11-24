<template>
  <div>
    <Panel>
      <template #header> 账号列表 </template>
      <template #content>
        <div class="contentBox">
          <el-row>
            <el-button type="danger" size="mini" @click="delAll"
              >批量删除</el-button
            >
            <el-button type="primary" size="mini">取消选择</el-button>
          </el-row>

          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="account" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="userGroup" label="用户组" width="120">
            </el-table-column>
            <el-table-column label="创建日期" width="120">
              <template v-slot="{ row }">
                {{ row.ctime | getTime }}
              </template>
            </el-table-column>
            <el-table-column prop="address" label="操作" show-overflow-tooltip>
              <template v-slot="{ row }">
                <el-button
                  type="primary"
                  size="mini"
                  plain
                  @click="emitOpen(row)"
                  >编辑</el-button
                >
                <el-button type="danger" size="mini" @click="delUsers(row)"
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
              :model="emitForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="用户名" prop="username">
                <el-input
                  type="text"
                  v-model="emitForm.username"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="用户组" prop="selectVal">
                <el-select v-model="emitForm.selectVal" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="sureEmit">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
import { userList, delUser, delMore, emitUser } from '../../Api/users.js'
import { validateUsername } from '../../utils/validate.js'
import { local } from '../../utils/local.js'
import moment from 'moment'
export default {
  created() {
    this.getList()
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
      userid: JSON.parse(local.get('user')).id,
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: [],
      multipleSelection: [],
      ids: [],
      dialogVisible: false,
      emitForm: {
        id: '',
        username: '',
        selectVal: ''
      },
      rules: {
        username: [{ validator: validateUsername, trigger: 'blur' }],
        selectVal: [{ validator: validateSelectVal, trigger: 'blur' }]
      }
    }
  },

  methods: {
    async getList() {
      if (this.currentPage !== 1 && this.tableData.length <= 1) {
        this.currentPage--
      }
      const data = await userList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      this.tableData = data.data
      this.total = data.total
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.ids = []
      this.multipleSelection.forEach((item) => {
        this.ids.push(item.id)
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },
    delUsers(row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          if (row.id === this.userid) {
            this.$confirm('此操作将删除当前账号并重新登录, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(async () => {
                const data = await delUser({
                  id: row.id
                })
                if (data.code === 0) {
                  this.$router.push('/login')
                  local.clear()
                }
              })
              .catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                })
              })
          } else {
            const data = await delUser({
              id: row.id
            })
            if (data.code === 0) {
              console.log(row.id, this.userid)
              this.getList()
            }
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    delAll() {
      this.$confirm('此操作将永久删除这些用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          if (this.ids.length === 0) {
            this.$message.error('请选择要删除的用户')
          } else {
            const data = await delMore({
              ids: JSON.stringify(this.ids)
            })
            if (data.code === 0) {
              this.ids.forEach((item) => {
                const i = this.tableData.findIndex(
                  (subItem) => subItem.id === item
                )
                this.tableData.splice(i, 1)
              })
              if (this.tableData.length === 1) {
                this.currentPage++
              }
              this.getList()
            }
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    emitOpen(row) {
      console.log(row)
      this.dialogVisible = true
      this.emitForm.id = row.id
      this.emitForm.username = row.account
      this.emitForm.selectVal = row.userGroup
    },
    async sureEmit() {
      const data = await emitUser({
        id: this.emitForm.id,
        account: this.emitForm.username,
        userGroup: this.emitForm.selectVal
      })
      if (data.code === 0) {
        this.getList()
      }
      this.dialogVisible = false
    }
  },
  filters: {
    getTime(val) {
      return moment(val).format('YYYY年MM月DD日 HH:mm:ss')
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.el-table,
.el-table__expanded-cell {
  background-color: rgba(255, 255, 255, 0.2) !important;
}
/deep/.el-table {
  margin: 20px 0;
  width: 700px !important;
  .cell {
    text-align: center;
    .el-checkbox__inner {
      border: 1px solid #409eff;
    }
  }

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
.contentBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  /deep/.el-pagination {
    width: 40% !important;
  }
}
</style>
