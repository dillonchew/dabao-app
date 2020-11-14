<template>
  <div>
    <br/>
    <h1>Analysis of your usage! </h1>
    <DashboardBarChart></DashboardBarChart>
    <DashboardBar></DashboardBar>
  </div>
</template>

<script>
import DashboardBarChart from "./DashboardBarChart.vue";
import DashboardBar from "./DashboardBar.vue"


export default {
  name: "Dashboard",
  components: {
    DashboardBarChart,
    DashboardBar,
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
