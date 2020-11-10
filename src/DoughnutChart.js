import { Doughnut } from "vue-chartjs";
import database from "./firebase.js";


export default {
  extends: Doughnut,
  data: function() {
    return {
      wclist: [],
      clemlist: [],
      sslist: [],
      datacollection: {
        labels: ["West Coast", "Supper Stretch", "Clementi Mall"],
        datasets: [
          {
            label: "Total Number of Orders by Location",
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
            data: [this.wclist, this.sslist, this.clemlist],
          },
        ],
      }, 
      options: {
        title: {
          display: true,
          text: "Total Number of Orders by Location",
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  async mounted() {
    const snapshot = await database.collection('orders').get();
      snapshot.forEach(doc => {
          let order = {};
          order = doc.data();
          if (order.place == "West Coast") {
            this.wclist.push(order)
          }
          if (order.place == "Supper Stretch") {
            this.sslist.push(order)
          }
          if (order.place == "Clementi Mall") {
            this.clemlist.push(order)
          }
          
        })
        this.renderChart({
          labels: ["West Coast", "Supper Stretch", "Clementi Mall"],
          datasets: [
            {
              label: "Total Number of Orders by Location",
              backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
              data: [this.wclist.length, this.sslist.length, this.clemlist.length],
            },
          ],
        }, this.options);
    
      
      
  },
};
