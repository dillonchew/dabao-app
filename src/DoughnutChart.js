import { Doughnut } from "vue-chartjs";
import database from "./firebase.js";


export default {
  extends: Doughnut,
  data: function() {
    return {
      wc: 0,
      ss: 0,
      clem: 0, 
      total: 0,
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
    const snapshot = await database.collection('users').get();
      snapshot.forEach(doc => {
          let user = {};
          user = doc.data();
          this.wc += parseFloat(user.wcVisit)
          this.ss += parseFloat(user.ssVisit)
          this.clem += parseFloat(user.clemVisit)
          this.total += this.wc + this.ss + this.clem
          
        })
        this.renderChart({
          labels: ["West Coast", "Supper Stretch", "Clementi Mall"],
          datasets: [
            {
              label: "Total Number of Orders",
              backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
              data: [this.wc, this.ss, this.clem],
            },
          ],
        }, this.options);
    
      
      
  },
};
