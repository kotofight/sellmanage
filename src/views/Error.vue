<template>
  <div class="error">
    <div class="error-box">
      <!-- <img src="../assets/images/e404.jpg" alt="" /> -->
      <p>
        <span class="time">{{ time }}</span
        >s之后自动跳转页面
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: 5
    }
  },
  created() {
    setInterval(() => {
      this.time--
    }, 1000)
    setTimeout(() => {
      this.$router.push('/')
    }, 5000)
  }
}
</script>

<style lang="less" scoped>
.error {
  height: 100%;
  display: flex;
  justify-content: center;
  // align-items: center;
  // background-color: #3F51B5;
  background: url('../assets/images/error3.jpg') no-repeat;
  background-size: cover;
  .error-box {
    margin-top: 500px;
    h2 {
      font-size: 30px;
      letter-spacing: 3px;
      margin-bottom: 20px;
    }
    p {
      font-size: 24px;
      color: #fff;
      text-align: center;
      .time {
        color: #f80;
        font-size: 50px;
        margin-right: 10px;
      }
    }
  }
}
</style>
