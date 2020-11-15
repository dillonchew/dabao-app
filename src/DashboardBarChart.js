import { HorizontalBar } from "vue-chartjs";
import database from "./firebase.js";
import { mapState } from "vuex";

export default {
  extends: HorizontalBar,
  computed: {
    ...mapState(["userProfile"]),
  },
  data: function() {
    return {
      name: "",
      wc: 0,
      ss: 0,
      clem: 0,
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: "Total amount spent by place in SGD",
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  async mounted() {
    console.log(this.userProfile.name)
    const snapshot = await database.collection('users').get();
      snapshot.forEach(doc => {
          let order = {};
          order = doc.data();
          if (order.name == this.userProfile.name) {
            this.wc += order.wcSpent
            this.ss += order.ssSpent
            this.clem += order.clemSpent
          }
          
        })
    this.renderChart({
      labels: ["West Coast", "Supper Stretch", "Clementi Mall"],
      datasets: [
        {
          label: "Amount Spent",
          backgroundColor: ["#29d6ce", "#1e2d66", "#35ab72"],
          data: [this.wc.toFixed(2), this.ss.toFixed(2), this.clem.toFixed(2)],
        },
      ],
    }, this.options);
  },
};
