<template>
  <div>
    <Card :list="cardList" />
    <div class="echartsCard">
      <LineCard @sonFn="sonFn" />
      <div class="echartsCard1">
        <LineCards @sonFn2="sonFn2" />
        <LineCards3 @sonFn3="sonFn3" />
      </div>
    </div>
  </div>
</template>

<script>
import Card from './components/Card.vue'
import LineCard from './components/LineCard.vue'
import LineCards from './components/LineCard2.vue'
import LineCards3 from './components/LineCard3.vue'
import { getHomeCharts } from '../../Api/charst.js'
export default {
  created() {
    this.getHome()
  },
  mounted() {},
  components: {
    Card,
    LineCard,
    LineCards,
    LineCards3
  },
  data() {
    return {
      cardList: [
        {
          id: 1,
          icon: 'icon-task',
          text: '总订单',
          num: '102,999',
          color: '#63BAE7',
          name: 'totalOrder'
        },
        {
          id: 2,
          icon: 'icon-Dollar',
          text: '总销售额',
          num: '102,999',
          color: '#D4237A',
          name: 'totalAmount'
        },
        {
          id: 3,
          icon: 'icon-icon-',
          text: '今日订单',
          num: '102,999',
          color: '#63BAE7',
          name: 'todayOrder'
        },
        {
          id: 4,
          icon: 'icon-renminbi',
          text: '今日销售额',
          num: '102,999',
          color: '#1AFA29',
          name: 'totayAmount'
        }
      ],
      chartsData: {},
      chartsData2: {},
      chartsData3: {}
    }
  },
  methods: {
    sonFn(o) {
      this.chartsData = o
    },
    sonFn2(o) {
      this.chartsData2 = o
    },
    sonFn3(o) {
      this.chartsData3 = o
    },
    async getHome() {
      const data = await getHomeCharts()
      // console.log(data)
      this.cardList.forEach((item) => {
        item.num = data[item.name]
      })
      // console.log(this.chartsData)
      const charts = this.chartsData
      const charts2 = this.chartsData2
      const charts3 = this.chartsData3

      charts.option.xAxis.data = data.xData

      charts.option.series[0].data = data.orderData
      charts.option.series[1].data = data.amountData

      charts2.option.xAxis[0].data = data.xData
      charts2.option.series[0].data = data.orderData
      // charts2.option.series[1].data = data.amountData
      charts3.option.xAxis[0].data = data.xData
      charts3.option.series[0].data = data.amountData

      charts.myChart.setOption(charts.option)
      charts2.myChart.setOption(charts2.option)
      charts3.myChart.setOption(charts3.option)
    }
  }
}
</script>

<style lang="less" scoped>
.echartsCard {
  display: flex;
  justify-content: space-around;
  .echartsCard1 {
    width: 44%;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
