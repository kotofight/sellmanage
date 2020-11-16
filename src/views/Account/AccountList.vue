<template>
  <div>
    <Panel>
      <template #header> 账号列表 </template>
      <template #content>
        <el-row>
          <el-button type="danger" size="mini">批量删除</el-button>
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
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="userGroup" label="用户组" width="120">
          </el-table-column>
          <el-table-column prop="date" label="创建日期" width="120">
          </el-table-column>
          <el-table-column prop="address" label="操作" show-overflow-tooltip>
            <template>
              <el-button type="primary" size="mini" plain>编辑</el-button>
              <el-button type="danger" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from '../../components/Panel/index'
export default {
  components: {
    Panel
  },
  data() {
    return {
      currentPage: 1,
      tableData: [
        {
          name: '王小虎',
          userGroup: '超级管理员',
          date: '2016-05-03'
        },
        {
          name: '王小虎',
          userGroup: '超级管理员',
          date: '2016-05-03'
        },
        {
          name: '王小虎',
          userGroup: '超级管理员',
          date: '2016-05-03'
        }
      ],
      multipleSelection: []
    }
  },

  methods: {
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
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin: 20px 0;
  width: 700px !important;
  /deep/ .cell {
    text-align: center;
    .el-checkbox__inner {
      border: 1px solid #409EFF;
    }
  }
}
</style>
