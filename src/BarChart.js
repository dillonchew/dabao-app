import { HorizontalBar } from "vue-chartjs";

export default {
  extends: HorizontalBar,
  data: function() {
    return {
      datacollection: {
        labels: ["Deck", "Supper Stretch", "Clementi Mall"],
        datasets: [
          {
            label: "Location",
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
            data: [13, 18, 23],
          },
        ],
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: "Frequency of visit by location",
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
