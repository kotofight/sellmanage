<template>
  <div>
    <Card :list="cardList" />
  </div>
</template>

<script>
import Card from './components/Card.vue'
export default {
  components: {
    Card
  },
  data() {
    return {
      cardList: [
        {
          id: 1,
          icon: 'icon-task',
          text: '总订单',
          num: '102,999',
          color: '#63BAE7'
        },
        {
          id: 2,
          icon: 'icon-Dollar',
          text: '总销售额',
          num: '102,999',
          color: '#D4237A'
        },
        {
          id: 3,
          icon: 'icon-icon-',
          text: '今日订单',
          num: '102,999',
          color: '#63BAE7'
        },
        {
          id: 4,
          icon: 'icon-renminbi',
          text: '今日销售额',
          num: '102,999',
          color: '#1AFA29'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
</style>
