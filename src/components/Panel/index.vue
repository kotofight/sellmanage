<template>
  <el-card>
    <div class="panel-header">
      <slot name="header"></slot>
    </div>
    <div class="panel-con">
      <slot name="content"></slot>
    </div>
  </el-card>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
/deep/ .el-card__body {
  padding: 0;
  background-color: rgba(255, 255, 255, 0.2);
}
.el-card {
  background-color: rgba(255, 255, 255, 0.7);
}
.panel-header {
  padding: 20px;
  border-bottom: 1px solid #ccc;
}
.panel-con {
  padding: 20px;
}
</style>
