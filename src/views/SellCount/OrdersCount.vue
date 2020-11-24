<template>
  <div class="charts">
    <div ref="main" style="width: 90%; height: 600px"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getOrderCharts } from '../../Api/charst.js'
import moment from 'moment'
export default {
  data() {
    return {
      x: [],
      y: []
    }
  },
  mounted() {
    this.getOrder()
  },
  methods: {
    getCharts() {
      // console.log(this.x)
      var myChart = echarts.init(this.$refs.main)
      var option = {
        backgroundColor: '#3a6f9c',
        title: {
          text: '交易总量统计',
          x: '2%',
          y: '4%',
          textStyle: {
            color: '#fff',
            fontSize: '22'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: '#E8E093',
              shadowColor: '#3a6f9c',
              shadowBlur: 30,
              shadowOffsetX: 10
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#E8E093'
            }
          },
          show: true,
          formatter: function (params) {
            return params[0].name + '<br>' + params[0].data + '元'
          }
        },
        grid: {
          left: '2%',
          right: '4%',
          bottom: '10%',
          top: '14%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.x,
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0,
            rotate: 60,
            show: true,
            textStyle: {
              color: '##DFDFDF',
              fontSize: 14
            }
          },
          axisLine: {
            show: false
          }
        },

        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#DFDFDF',
              fontSize: 14
            },
            formatter: '{value}'
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.2)'
            }
          }
        },
        series: [
          {
            name: '1',
            type: 'bar',
            barWidth: '60%',
            markLine: {
              silent: true,
              symblo: 'none',
              label: {
                position: 'end'
              },
              data: [
                {
                  name: '目标值',
                  yAxis: 250,
                  lineStyle: {
                    color: '#E8E093'
                  },
                  label: {
                    position: 'end',
                    formatter: '{b}\n {c}'
                  }
                }
              ]
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(78,197,163,1)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(89,170,147,0.1)'
                  }
                ]),
                barBorderRadius: 20
              }
            },
            data: this.y
          }
        ]
      }

      myChart.setOption(option)
    },
    async getOrder() {
      const { data } = await getOrderCharts({
        date: JSON.stringify([])
      })
      console.log(data)
      data.forEach((item) => {
        this.x.push(moment(item.orderTime).format('YYYY-MM-DD HH-mm-ss'))
        this.y.push(item.orderAmount)
      })
      // console.log(this.x)
      // this.x.sort((a, b) => a - b)
      this.x.sort()
      // console.log(this.x)
      // this.x.forEach((item)=>{
      //   item=moment(item.orderTime).format('YYYY-MM-DD HH-mm-ss')
      // })
      this.getCharts()
    }
  }
}
</script>

<style lang="less" scoped>
.charts {
  margin-top: 20px;
  padding-top: 10px;
  display: flex;
  justify-content: center;
}
</style>
