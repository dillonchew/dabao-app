import { Doughnut } from "vue-chartjs";
import database from "./firebase.js";
import { mapState } from "vuex";

export default {
  extends: Doughnut,
  computed: {
    ...mapState(["userProfile"]),
  },
  data: function() {
    return {
      name: "",
      food: 0,
      comms: 0,
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: "Total amount spent on food vs delivery in SGD",
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  async mounted() {
    console.log(this.userProfile.name)
    const snapshot = await database.collection('orders').get();
      snapshot.forEach(doc => {
          let order = {};
          order = doc.data();
          if (order.name == this.userProfile.name) {
            this.food = order.total - order.comms;
            this.comms = order.comms;
          }
          
        })
    this.renderChart({
      labels: ["Food", "Delivery"],
      datasets: [
        {
          label: "Spending",
          backgroundColor: ["#8e5ea2", "#3cba9f"],
          data: [this.food, this.comms],
        },
      ],
    }, this.options);
  },
};
