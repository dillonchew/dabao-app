<template>
  <div class="chart">
    <h3>Check out how many</h3>
    <h3>orders have been made!</h3>
    <h3>Current total: {{total}}</h3>
    <chart></chart>
  </div>
</template>

<script>
import Chart from "../DoughnutChart.js";
import database from "../firebase.js"


export default {
  data() {
    return {
      total:0
    }
  },
  methods: {
    async getTotal() {
      const snapshot = await database.collection('users').get();
        snapshot.forEach(doc => {
          let user = {};
          user = doc.data();
          this.total += parseFloat(user.wcVisit)
          this.total += parseFloat(user.ssVisit)
          this.total += parseFloat(user.clemVisit)
          
  })}
  },
  components: {
    Chart,
  }, 
  created() {
    this.getTotal()
  }
};
</script>

<style></style>
