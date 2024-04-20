<template>
    <div ref="lineChart" style="width: 400px; height: 400px;"></div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    mounted() {
      const chart = echarts.init(this.$refs.lineChart);
      const option = {
        title: {
          text: '用户折线图'
        },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '总用户',
            type: 'line',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '个人用户',
            type: 'line',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '企业用户',
            type: 'line',
            data: [150, 232, 201, 154, 190, 330, 410]
          }
        ]
      };
      chart.setOption(option);
    }
  }
  </script>
  