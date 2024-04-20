<template>
    <div>
      <div ref="personalPieChart" style="width: 400px; height: 400px;"></div>
      <div ref="businessPieChart" style="width: 400px; height: 400px;"></div>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    mounted() {
      this.createPersonalPieChart();
      this.createBusinessPieChart();
    },
    methods: {
      createPersonalPieChart() {
        const chart = echarts.init(this.$refs.personalPieChart);
        const option = {
          title: {
            text: '个人用户国家分布',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          series: [
            {
              name: '个人用户',
              type: 'pie',
              radius: '50%',
              data: [
                { value: 1048, name: '中国' },
                { value: 735, name: '美国' },
                { value: 580, name: '日本' },
                { value: 484, name: '英国' },
                { value: 300, name: '俄罗斯' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        chart.setOption(option);
      },
      createBusinessPieChart() {
        const chart = echarts.init(this.$refs.businessPieChart);
        const option = {
          title: {
            text: '企业用户国家分布',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          series: [
            {
              name: '企业用户',
              type: 'pie',
              radius: '50%',
              data: [
                { value: 510, name: '中国' },
                { value: 432, name: '美国' },
                { value: 341, name: '德国' },
                { value: 335, name: '加拿大' },
                { value: 250, name: '法国' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        chart.setOption(option);
      }
    }
  }
  </script>
  