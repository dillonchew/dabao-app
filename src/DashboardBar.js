import { Bar } from "vue-chartjs";
import database from "./firebase.js";
import { mapState } from "vuex";

export default {
  extends: Bar,
  computed: {
    ...mapState(["userProfile"]),
  },
  data: function() {
    return {
      name: "",
      delivery: 0,
      total: 0,
      comms: 0,
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: "Commission earned compared to Amount Spent in SGD",
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  async mounted() {
    const snapshot = await database.collection('users').get();
      snapshot.forEach(doc => {
          let order = {};
          order = doc.data();
          if (order.name == this.userProfile.name) {
            this.comms += order.commission;
            this.delivery += order.commissionPaid
            this.total += order.wcSpent + order.ssSpent + order.clemSpent
          }
          
        })
    this.renderChart({
      labels: ["Commission Earned", "Delivery Paid", "Total Spent"],
      datasets: [
        {
          label: "Amount",
          backgroundColor: ["#bfff00", "#a65a3a", "#0ca6ed"],
          data: [this.comms.toFixed(2), this.delivery.toFixed(2), this.total.toFixed(2)],
        },
      ],
    }, this.options);
  },
};
