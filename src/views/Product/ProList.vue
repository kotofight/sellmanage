<template>
  <div>
    <Panel>
      <template #header>商品列表</template>
      <template #content>
        <div class="contentBox">
          <el-table :data="tableData" style="width: 100%" size="mini" border>
            <el-table-column type="expand">
              <template v-slot="{ row }">
                <ul>
                  <li>
                    <strong>商品ID：</strong><span>{{ row.id }}</span>
                  </li>
                  <li>
                    <strong>商品名称：</strong><span>{{ row.name }}</span>
                  </li>
                  <li>
                    <strong>所属分类：</strong><span>{{ row.id }}</span>
                  </li>
                  <li>
                    <strong>商品价格：</strong><span>{{ row.price }}</span>
                  </li>
                  <li>
                    <strong>商品图片：</strong><span>{{ row.id }}</span>
                  </li>
                  <li>
                    <strong>创建时间：</strong
                    ><span>
                      {{ row.ctime | getTime }}
                    </span>
                  </li>
                  <li>
                    <strong>商品评价：</strong><span>{{ row.rating }}</span>
                  </li>
                  <li>
                    <strong>商品销量：</strong><span>{{ row.sellCount }}</span>
                  </li>
                  <li>
                    <strong>商品描述：</strong><span>{{ row.goodsDesc }}</span>
                  </li>
                </ul>
              </template>
            </el-table-column>
            <el-table-column label="商品名称" prop="name" width="240px">
            </el-table-column>
            <el-table-column label="所属分类" prop="category" width="140px">
            </el-table-column>
            <el-table-column label="商品价格" prop="price" width="80px">
            </el-table-column>
            <el-table-column label="商品图片">
              <template v-slot="{ row }">
                <img :src="baseUrl + row.imgUrl" alt="" />
              </template>
            </el-table-column>
            <el-table-column label="商品描述" prop="goodsDesc" width="300px">
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="150px">
              <template v-slot="{ row }">
                <el-button
                  type="primary"
                  size="mini"
                  @click="$router.push('/pro/edit/' + row.id)"
                  >编辑</el-button
                >
                <el-button type="danger" size="mini" @click="delPro(row.id)"
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
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
import { getPros, delPros } from '../../Api/pro.js'
import moment from 'moment'
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: [],
      baseUrl: 'http://127.0.0.1:5000/upload/imgs/goods_img/'
    }
  },
  created() {
    this.getProList()
  },
  methods: {
    handleSizeChange(val) {
      this.currentPage = val
      this.getProList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getProList()
    },
    async getProList() {
      const { data, total } = await getPros({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      this.tableData = data
      this.total = total
    },
    delPro(id) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const data = await delPros({
            id: id
          })
          if (data.code === 0) {
            this.getProList()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  filters: {
    getTime(val) {
      return moment(val).format('YYYY年MM月DD日 HH：mm：ss')
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .cell {
  text-align: center;
}
img {
  width: 80px;
}
ul {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  li {
    width: 50%;
    line-height: 20px;
    strong {
      font-weight: 700;
      margin-right: 5px;
    }
  }
}
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
.contentBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  /deep/.el-pagination {
    width: 70% !important;
  }
}
</style>
