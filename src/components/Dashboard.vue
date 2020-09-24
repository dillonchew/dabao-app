<template>
  <div>
    <BarChart></BarChart>
    <DoughnutChart></DoughnutChart>
  </div>
</template>

<script>
import BarChart from "./BarChart.vue";
import DoughnutChart from "./DoughnutChart.vue";

export default {
  name: "Dashboard",
  components: {
    BarChart,
    DoughnutChart,
  },
};
</script>

<style scoped>
div {
  font-family: Slack-Circular-Pro, "Helvetica Neue", Helvetica, "Segoe UI",
    Tahoma, Arial, sans-serif;
  text-align: center;
  display: inline-block;
  align-items: center;
  color: #2c3e50;
  margin-bottom: 60px;
  width: 600px;
}
</style>
