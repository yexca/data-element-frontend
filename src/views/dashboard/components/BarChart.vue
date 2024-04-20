<template>
    <div ref="barChart" style="width: 400px; height: 400px;"></div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    mounted() {
      const chart = echarts.init(this.$refs.barChart);
      const option = {
        title: {
          text: '用户新增'
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
            name: '个人用户',
            type: 'bar',
            data: [20, 30, 50, 80, 70, 110, 130]
          },
          {
            name: '企业用户',
            type: 'bar',
            data: [40, 50, 60, 100, 90, 120, 140]
          }
        ]
      };
      chart.setOption(option);
    }
  }
  </script>
  