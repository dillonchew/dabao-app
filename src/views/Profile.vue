<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12 mt-5">
                <div class="card card-widget widget-user">
              <!-- Add the bg color to the header using any of the bg-* classes -->
              <div class="widget-user-header text-white" 
              style="background-image: url('https://miro.medium.com/max/2835/1*an7X6yxD1YrMQVTaIg3uWw.jpeg')">
                <h3 class="widget-user-username text-left">{{userProfile.name}}</h3>
                <h5 class="widget-user-desc text-left">Telegram: {{userProfile.tele}}</h5>
                <div class="widget-user-image">
                    <img class="img-circle" :src="userProfile.profilePic" alt="User Avatar">
                </div>
              </div>
              <div class="card-footer">
                <div class="row">
                  <div class="col-sm-4 border-right">
                    <div class="description-block">
                      <span class="description-text">Zone</span>
                      <h5 class="description-header">{{userProfile.zone}}</h5>
                    </div>
                    <!-- /.description-block -->
                  </div>
                  <!-- /.col -->
                  <div class="col-sm-4 border-right">
                    <div class="description-block">
                      <span class="description-text">DELIVERIES</span>
                      <h5 class="description-header">13</h5>
                    </div>
                    <!-- /.description-block -->
                  </div>
                  <!-- /.col -->
                  <div class="col-sm-4">
                    <div class="description-block">
                      <span class="description-text">COMMISION EARNED</span>
                      <h5 class="description-header">$5</h5>  
                    </div>
                    <!-- /.description-block -->
                  </div>
                  <!-- /.col -->
                </div>
                <!-- /.row -->
              </div>
              <b-button id="edit" tag = "router-link"
                  to = "/Settings"
                  variant="outline-secondary"> Edit Profile </b-button>
            </div>
          </div>
        </div>
        <br/>
        <h3>Accepted orders </h3>
        <br/>
        <div class = "list">
          <ul>
            <li id="items" v-for="(order,index) in orderList" v-bind:key="index">
              <h5>{{order.place}}</h5>
              <hr/>
              <h6>Shop: {{order.shop}}</h6>
              <h6>Commission: {{order.comms}}</h6>
              <div v-if="order.show">
                <h6>Name: {{order.name}}</h6>
                <h6>Tele: {{order.customertele}}</h6>
                <h6>Zone: {{order.zone}}</h6>
                <h6>Items: {{order.items.toString()}}</h6>
                <h6>Total : {{order.total}}</h6>
              </div>
              <b-button id="button" pill variant="outline-secondary" @click="removeOrder(index)">Delete</b-button>
              <b-button id="button" v-if="!order.show" v-on:click="show(order.id)" pill variant="outline-secondary">Show details</b-button>
              <b-button id="button" v-if="order.show" v-on:click="show(order.id)" pill variant="outline-secondary">Hide details</b-button>
            </li>
          </ul>
        </div>
        <h3> Your orders </h3>
        <div class = "list">
          <ul>
            <li id="items" v-for="(order,index) in myOrderList" v-bind:key="index">
              <h5>{{order.place}}</h5>
              <hr/>
              <h6>Shop: {{order.shop}}</h6>
              <h6>Commission: {{order.comms}}</h6>
              <div v-if="order.show">
                <h6>Name: {{order.name}}</h6>
                <h6>Tele: {{order.customertele}}</h6>
                <h6>Zone: {{order.zone}}</h6>
                <h6>Items: {{order.items.toString()}}</h6>
                <h6>Total : {{order.total}}</h6>
              </div>
              <b-button id="button"  pill variant="outline-secondary" @click="removeMyOrder(index)">Delete</b-button>
              <b-button id="button" v-if="!order.show" v-on:click="showMyOrder(order.id)" pill variant="outline-secondary">Show details</b-button>
              <b-button id="button" v-if="order.show" v-on:click="showMyOrder(order.id)" pill variant="outline-secondary">Hide details</b-button>
            </li>
          </ul>
        </div>
        <br/><br/>
    </div>
</template>

<script>
import { mapState } from "vuex";
import database from "../firebase.js";
import * as firebase from 'firebase'

export default {
  data() {
    return {
      name: "",
      tele: "",
      zone: "",
      profilePic: "",
      showSuccess: false,
      orderList:[],
      myOrderList: []
    };
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {
    fetchOrders() {
      var user = firebase.auth().currentUser;
      database
        .collection("acceptedOrders")
        .where('dabaoerid', '==', user.uid)
        .get()
        .then((querySnapShot) => {
          let order = {};
          querySnapShot.forEach((doc) => {
            order = doc.data();
            order.id = doc.id;
            order.show = false;
            this.orderList.push(order);
          });
        });
      database
        .collection("acceptedOrders")
        .where('customerid', '==', user.uid)
        .get()
        .then((querySnapShot) => {
          let order = {};
          querySnapShot.forEach((doc) => {
            order = doc.data();
            order.id = doc.id;
            order.show = false;
            this.myOrderList.push(order);
          });
        });
    },
    onContext(ctx) {
      this.context = ctx
    },
    show(itemID) {
      let order = this.orderList.find((element) => element.id == itemID);
      order.show = !order.show;
    },
    showMyOrder(itemID) {
      let order = this.myOrderList.find((element) => element.id == itemID);
      order.show = !order.show;
    },
    removeOrder(index) {
      let id = this.orderList[index].id;
      this.orderList.splice(index, 1);
    },
    removeMyOrder(index) {
      let id = this.myOrderList[index].id;
      this.myOrderList.splice(index, 1);
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
    .widget-user-header {
      background-position: center center;
      background-size: cover;
      height: 150px;
    }
    .widget-user-image {
      position: absolute;
      top: 30px;
      left: 50%;
      margin-left: -45px;
    }
    .widget-user-image>img {
      width: 90px;
      height: 90px;
      border-radius: 100%;
      border: 3px solid #fff;
    }
#edit {
  background-color: white;
  color:  #660066;
  border-color: #660066;
}
#edit:hover {
  background-color:white;
  color:  #660066;
  border-width: 2px;
  border-color: #660066;
}
.list {
  width: 80%;
  display: flex;
}
ul {
  display: flex;
  list-style-type: none;
  padding: 0;
  overflow: auto;
  flex-wrap: wrap;
  align-items: left;
  justify-content: left;
}
#items {
  text-align: left;
  font-family: Arial, Helvetica, sans-serif;
  padding: 10px;
  width: 300px;
  margin: 10px;
  box-shadow: 3px 5px  #e2e2e7;
}
#button {
  background-color: white;
  color:  #660066;
  border-color: #660066;
  margin-left: 2%;
  margin-bottom: 1%;
}
</style>