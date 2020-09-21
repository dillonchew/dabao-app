<template>
  <div class="requests">
    <h1>Requests</h1>

    <ul>
      <li v-for="(order,index) in orderList" v-bind:key="index">
        <button class="round" @click="remove(index)">x</button>
        <h3>Name: {{userProfile.name}}</h3>
        <h3>Zone: {{userProfile.zone}}</h3>
        <h3>Place: {{order.place}}</h3>
        <h3>Shop: {{order.shop}}</h3>
        <h3>Items: {{order.items}}</h3>
      </li>
    </ul>
  </div>
</template>

<script>
import database from "../firebase.js";
import { mapState } from "vuex";
export default {
  name: "Requests",
  computed: {
    ...mapState(["userProfile"]),
  },
  data() {
    return {
      orderList: [],
    };
  },
  methods: {
    fetchOrders() {
      database
        .collection("orders")
        .orderBy("place")
        .orderBy("shop")
        .get()
        .then((querySnapShot) => {
          let order = {};
          querySnapShot.forEach((doc) => {
            order = doc.data();
            order.id = doc.id;
            console.log(order.id);
            this.orderList.push(order);
          });
        });
    },
    remove(index) {
      let id = this.orderList[index].id;
      database.collection("orders").doc(id).delete();
      this.orderList.splice(index, 1);
    },
  },

  created() {
    this.fetchOrders();
  },

  beforeCreate: function () {
    console.log("beforeCreate()");
  },

  beforeMount: function () {
    console.log("beforeMount()");
  },
  mounted: function () {
    setTimeout(function () {
      console.log("mounted()");
    }, 3000);
  },
  beforeUpdate: function () {
    console.log("beforeUpdate()");
  },
  updated: function () {
    console.log("updated()");
  },
  beforeDestroy: function () {
    console.log("beforeDestroy()");
  },
};
</script>



<style scoped>
h1 {
  font-family: Slack-Circular-Pro, "Helvetica Neue", Helvetica, "Segoe UI",
    Tahoma, Arial, sans-serif;
  margin-left: 6%;
}
ul {
  display: block;
  list-style-type: none;
  padding: 0;
}
li {
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
.round {
  border-radius: 8px;
}
</style>