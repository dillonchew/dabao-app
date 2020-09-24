import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  data: function() {
    return {
      datacollection: {
        labels: ["Deck", "Supper Stretch", "Clementi Mall"],
        datasets: [
          {
            label: "Average spending per month",
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
            data: [70, 50, 120],
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Average spending per month by location",
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    this.renderChart(this.datacollection, this.options);
  },
};
