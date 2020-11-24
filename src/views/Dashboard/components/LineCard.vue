<template>
  <div class="charts">
    <div ref="main" style="width: 90%; height: 600px"></div>
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
      var myChart = echarts.init(this.$refs.main)

      // 指定图表的配置项和数据
      var xAxisData = []
      var option = {
        textStyle: {
          fontFamily: 'Din-Light'
        },
        color: [
          '#123dac',
          '#73e2e2',
          '#ff7e85',
          '#9b52ff',
          '#fac524',
          '#46caff',
          '#a1e867',
          '#10b2b2',
          '#ec87f7',
          '#f4905a',
          '#00baba',
          '#facf24',
          '#e89d67',
          '#23c6c6',
          '#fa8699',
          '#40b7fc',
          '#006d75',
          '#595959',
          '#f4764f',
          '#a640fc',
          '#fda23f',
          '#2d7ae4',
          '#5092ff',
          '#9351ed',
          '#8a89fe',
          '#df89e8',
          '#2797ff',
          '#6ad089',
          '#7c92e8 '
        ],
        title: {
          text: '业绩总览',
          left: '2%',
          textStyle: {
            fontSize: 24
          }
        },
        legend: {
          data: [
            {
              name: '订单数据',
              icon:
                'path://M512 139.81262864a286.42534744 286.42534744 0 1 0 286.42534744 286.42534744 286.42534744 286.42534744 0 0 0-286.42534744-286.42534744z m0 477.3755789a190.95023144 190.95023144 0 1 1 190.95023144-190.95023146 190.95023144 190.95023144 0 0 1-190.95023144 190.95023146z'
            },
            {
              name: '金额数据',
              icon:
                'path://M512 139.81262864a286.42534744 286.42534744 0 1 0 286.42534744 286.42534744 286.42534744 286.42534744 0 0 0-286.42534744-286.42534744z m0 477.3755789a190.95023144 190.95023144 0 1 1 190.95023144-190.95023146 190.95023144 190.95023144 0 0 1-190.95023144 190.95023146z'
            }
          ],
          right: 20,
          // left: 'left',
          selected: {
            白起: true,
            李泽言: true
          },
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 10,
          textStyle: {
            color: '#898989',
            lineHeight: 15
          },
          type: 'scroll'
        },
        tooltip: {
          backgroundColor: '#fff',
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          textStyle: {
            color: '#565656',
            lineHeight: 28
          },
          confine: true,
          padding: 12,
          extraCssText:
            'box-shadow: 0px 2px 8px 0px #cacaca;border-radius: 4px;opacity: 0.9;max-height: 100%;',
          formatter: {
            _custom: {
              type: 'function',
              display: '<span>ƒ</span> (params)'
            }
          }
        },
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 110
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: xAxisData,
          axisLabel: {
            interval: 0,
            rotate: 0,
            color: '#a0a9bc',
            // X轴标签 label 做了特殊处理，防止左右溢出
            formatter: (value, index) => {
              if (index === 0 || index === xAxisData.length - 1) {
                return ''
              }
              return value
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          name: '',
          nameTextStyle: {
            color: 'gray'
          },
          type: 'value',
          axisLabel: {
            color: '#a0a9bc',
            inside: true,
            margin: 0,
            verticalAlign: 'bottom'
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          minInterval: 1,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: '订单数据',
            data: [],
            type: 'line',
            smooth: true,
            smoothMonotone: 'x',
            cursor: 'pointer',
            showSymbol: false,
            lineStyle: {
              shadowColor: 'rgba(18,61,172,0.5)',
              shadowBlur: 10
            }
          },
          {
            name: '金额数据',
            data: [],
            type: 'line',
            smooth: true,
            smoothMonotone: 'x',
            cursor: 'pointer',
            showSymbol: false,
            lineStyle: {
              shadowColor: 'rgba(115,226,226,0.5)',
              shadowBlur: 10
            }
          }
        ]
      }

      this.$emit('sonFn', {
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
  padding-top: 100px;
  width: 54%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
}
</style>
