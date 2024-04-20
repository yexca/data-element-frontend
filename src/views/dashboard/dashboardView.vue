<template>
  <div class="dashboard">
    <LineChart />
    <BarChart />
    <PieChart />
  </div>
</template>

<script>
import LineChart from './components/LineChart.vue'
import BarChart from './components/BarChart.vue'
import PieChart from './components/PieChart.vue'

export default {
  components: {
    LineChart,
    BarChart,
    PieChart
  }
}
</script>

<style>
.dashboard {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
