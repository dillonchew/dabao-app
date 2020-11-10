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
      clem: 0,
      ss: 0,
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: "Total amount spent by location in SGD",
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
            if (order.place == "West Coast") {
              this.wc += order.total
            }
            if (order.place == "Supper Stretch") {
              this.ss += order.total
            }
            if (order.place == "Clementi Mall") {
              this.clem += order.total
            }
          }
          
        })
    this.renderChart({
      labels: ["West Coast", "Supper Stretch", "Clementi Mall"],
      datasets: [
        {
          label: "Location",
          backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
          data: [this.wc, this.ss, this.clem],
        },
      ],
    }, this.options);
  },
};
