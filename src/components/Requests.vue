<template>
  <div class="requests">
    <h1>Requests</h1>
    <div class="filter">
        Filter by <b>Zone</b>:
        <b-dropdown :text="selectedZone" @click.native="selectZone($event.target)">
          <b-dropdown-item value="ALL">All</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item value="A">A</b-dropdown-item>
          <b-dropdown-item value="B">B</b-dropdown-item>
          <b-dropdown-item value="C">C</b-dropdown-item>
          <b-dropdown-item value="D">D</b-dropdown-item>
        </b-dropdown>
    </div>
    <ul>
      <li id="requestItems" v-for="(order,index) in filteredProducts" v-bind:key="index">
        <b-button pill variant="outline-secondary" @click="remove(index)">Delete</b-button>
        <h5>Name: {{order.name}}</h5>
        <h5>Zone: {{order.zone}}</h5>
        <h5>Place: {{order.place}}</h5>
        <h5>Shop: {{order.shop}}</h5>
        <h5>Items: {{order.items}}</h5>
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
    filteredProducts() {
      if (this.selectedZone === 'ALL')
        return this.orderList;
      else
        return this.orderList.filter(p => p.zone === this.selectedZone);
    }
  },
  data() {
    return {
      orderList: [],
      selectedZone: ""
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
            this.selectedZone = this.userProfile.zone;
          });
        });
    },
    remove(index) {
      let id = this.orderList[index].id;
      database.collection("orders").doc(id).delete();
      this.orderList.splice(index, 1);
    },
    selectZone(target) {
      this.selectedZone = target.getAttribute('value');
    }
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
  display: flex;
  list-style-type: none;
  padding: 0;
  overflow: auto;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
#requestItems {
  text-align: left;
  font-family: Arial, Helvetica, sans-serif;
  padding: 10px;
  width: 400px;
  margin: 10px;
  border: 1px solid #222;
  border-radius: 25px;
  box-shadow: 3px 7px #660066;
}
</style>