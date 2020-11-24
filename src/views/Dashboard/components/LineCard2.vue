<template>
  <div class="charts">
    <div ref="main2" style="width: 90%; height: 100%"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted() {
    this.getCharts()
  },
  methods: {
    getCharts() {
      var myChart = echarts.init(this.$refs.main2)

      // 指定图表的配置项和数据
      var xAxisData = []
      var option = {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        title: {
          text: '订单总览',
          top: '3%',
          left: '2%',
          textStyle: {
            fontSize: 14
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xAxisData,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#063374',
                width: 1,
                type: 'solid'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#00c7ff'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value} %'
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#00c7ff',
                width: 1,
                type: 'solid'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: '#063374'
              }
            }
          }
        ],
        series: [
          {
            type: 'bar',
            data: [20, 50, 80, 58, 83, 68, 57, 80, 42, 66],
            // barWidth: 50, //柱子宽度
            // barGap: 1, //柱子之间间距
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#4D89AD'
                  },
                  {
                    offset: 1,
                    color: '#0E3762'
                  }
                ]),
                opacity: 1
              }
            }
          }
        ]
      }

      this.$emit('sonFn2', {
        myChart,
        xAxisData,
        option
      })
      // 使用刚指定的配置项和数据显示图表。
      //   myChart.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
.charts {
  margin-top: 20px;
  width: 90%;
  height: 46%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
}
</style>
