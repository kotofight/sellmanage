<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in list" :key="item.id">
        <div class="grid-content bg-purple">
          <div>
            <i
              class="iconfont"
              :class="item.icon"
              :style="{ color: item.color }"
            ></i>
          </div>
          <div class="text">
            <p>{{ item.text }}</p>
            <h3>{{ item.num }}</h3>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="less" scoped>
.bg-purple {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgba(255, 255, 255, 0.6);
  padding: 20px 0;
  i {
    font-size: 50px;
    color: yellowgreen;
  }
  .text {
    text-align: center;
    p {
      color: #666;
      margin-bottom: 10px;
    }
    h3 {
      font-weight: 700;
    }
  }
}

.grid-content {
  border-radius: 4px;
}
</style>
