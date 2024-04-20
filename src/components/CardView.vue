<template>
    <div class="card">
      <h3>{{ title }}</h3>
      <div ref="chartContainer" class="chart-container"></div>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    props: {
      title: String,
      chartData: Object
    },
    data() {
      return {
        chartInstance: null
      };
    },
    mounted() {
      this.initChart();
      window.addEventListener('resize', this.handleResize); // 添加响应窗口大小变化
    },
    beforeDestroy() {
      if (this.chartInstance) {
        window.removeEventListener('resize', this.handleResize); // 组件销毁时移除监听
        this.chartInstance.dispose(); // 销毁图表实例
      }
    },
    methods: {
      initChart() {
        this.chartInstance = echarts.init(this.$refs.chartContainer);
        this.chartInstance.setOption(this.chartData);
        // this.chartInstance.resize(); // 确保图表尺寸与容器匹配
      },
      handleResize() {
        if (this.chartInstance) {
          this.chartInstance.resize(); // 更新图表尺寸
        }
      }
    },
    watch: {
      chartData(newData) {
        if (this.chartInstance) {
          this.chartInstance.setOption(newData, true);
          this.chartInstance.resize(); // 确保图表更新后也进行尺寸调整
        }
      }
    }
  };
  </script>
  
  
  <style scoped>
  .card {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 20px;
    margin: 10px;
  }
  
  .chart-container {
    width: 100%;
    height: 400px;
  }
  </style>
  