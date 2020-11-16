<template>
  <div class="requests">
    <br/>
    <div id="top">
      <h1>Requests</h1>
      <b-button id="info" v-b-tooltip.hover title="Place your order via Shops found in the 'Home' page!">
        <b-icon icon="info-circle-fill" style="color:#660066"></b-icon>
      </b-button>
    </div>
    <br />
    <b-alert v-model="showOrderAlert" variant="danger" dismissible>
          You already have an accepted order!
    </b-alert>
    <div class = "filters">
       <div id = "filter1">
         <h5> Filter by <b>Commission:</b> </h5>
         <br/>
        <vue-slider v-model="commission" :data="commisionData" :data-value="'value'" :data-label="'text'" :marks="true">
        </vue-slider>
       </div>
       <br/><br/><br/>
       <div id = "filter2">
         <h5> Filter by <b>Place:</b> </h5>
         <br/>
          <b-form-group id="optionsPlace">
            <b-form-checkbox-group 
              id="filterPlace"
              v-model="selectedPlaces"
              :options="places"
              stacked
            ></b-form-checkbox-group>
          </b-form-group>
      </div>
      <br/>
      <div id = "filter3">
        <h5> Filter by <b>Time:</b> </h5>
        <br />
         <b-row>
          <b-col md="auto">
            <b-time v-model="time" locale="en" minutes-step=30 @context="onContext"></b-time>
          </b-col>
        </b-row>
      </div>
      <br/><br/>
      <div id="filter4">
        <h5> Filter by <b>Zone</b>: </h5>
        <br/>
        <b-dropdown :text="selectedZone" @click.native="selectZone($event.target)">
          <b-dropdown-item value="ALL">All</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item value="A">A</b-dropdown-item>
          <b-dropdown-item value="B">B</b-dropdown-item>
          <b-dropdown-item value="C">C</b-dropdown-item>
          <b-dropdown-item value="D">D</b-dropdown-item>
        </b-dropdown>
    </div>
    </div>
    <div class = "list">
    <ul>
       <li id="requestItems" v-for="(order,index) in filteredProducts" v-bind:key="index">
        <h5>{{order.place}}</h5>
        <hr/>
        <h6>Shop: {{order.shop}}</h6>
        <h6>Commission: {{order.comms}}</h6>
        <h6>Time :{{order.time}}</h6>
        <div v-if="order.show">
          <h6>Name: <router-link :to="`/user/${order.userid}`" exact>{{order.name}}</router-link></h6>
          <h6>Zone: {{order.zone}}</h6>
          <h6>Items: {{order.items.toString()}}</h6>
          <h6>Total : {{order.total}}</h6>
        </div>
        <b-button id="button" v-if="currentUserID !== order.userid" pill variant="outline-secondary" @click="acceptOrder(index, userProfile.tele, userProfile.name, userProfile.zone)">Accept</b-button>
        <b-button id="button" v-if="currentUserID === order.userid" pill variant="outline-secondary" @click="remove(index)">Delete</b-button>
        <b-button id="button" v-if="!order.show" v-on:click="show(order.id)" pill variant="outline-secondary">Show details</b-button>
        <b-button id="button" v-if="order.show" v-on:click="show(order.id)" pill variant="outline-secondary">Hide details</b-button>
      </li>
    </ul>
    </div>
    <br />
  </div>
</template>

<script>
import database from "../firebase.js";
import { mapState } from "vuex";
import * as firebase from 'firebase';
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default {
  components: {
    VueSlider
  },
  name: "Requests",
  computed: {
    ...mapState(["userProfile"]),
    filteredProducts() {
      var temp1;
      var temp2;
      var temp3;
      var temp4;
      if (this.selectedZone === 'ALL'){
        temp1 = this.orderList;
      } else {
        temp1 = this.orderList.filter(p => p.zone === this.selectedZone);
      }  
      if (!this.selectedPlaces.length){
        temp2 = temp1;
      } else {
        temp2 =  temp1.filter(j => this.selectedPlaces.includes(j.place));
      }
      temp3 = temp2.filter(i => i.comms >= this.commission);
      if (this.time != ''){
        temp4 = temp3.filter(i => i.time === this.time);
        return temp4; 
      } else {
        return temp3;
      }
    }
  },
  data() {
    return {
      orderList: [],
      selectedZone: "",
      currentUserID: "",
      time: "",
      commission: 0,
      context: null,
      selectedPlaces: [],
      showOrderAlert: false,
      commisionData: [
        {text: '$0.00', value:'0'},
        {text: '$1.00', value:'1'}, 
        {text: '$2.00', value: '2'},
        {text: '$3.00', value: '3'},
        {text: '$4.00', value: '4'},
        {text: '$5.00', value: '5'}
      ],
      places: [
          { text: 'Supper Stretch', value: 'Supper Stretch' },
          { text: 'Clementi', value: 'Clementi' },
          { text: 'West Coast', value: 'West Coast' }
        ],
      zones: ["All", "A", "B", "C","D"]
    };
  },
  methods: {
    acceptOrder(index, tele, n, z) {
      let id = this.orderList[index].id;
      var user =  firebase.auth().currentUser;
      const admin = require('firebase-admin');
      database.collection("acceptedOrders")
      .doc()
      .set({
          name: this.orderList[index].name,
          dabaoername: n,
          place: this.orderList[index].place,
          shop: this.orderList[index].shop,
          items: this.orderList[index].items,
          zone: this.orderList[index].zone,
          dabaoerzone: z,
          comms: this.orderList[index].comms,
          total: this.orderList[index].total,
          customertele: this.orderList[index].tele,
          dabaoertele: tele,
          customerid: this.orderList[index].userid,
          dabaoerid: user.uid})
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });

      database.collection("users")
      .doc(this.orderList[index].userid)
      .set({newOrderAccepted:'true'}, {merge:true});

      database.collection("orders").doc(id).delete();
      this.orderList.splice(index, 1);
      alert('Saved! You can view the order in your profile and find the telegram handle of the requester');
    },
    fetchOrders() {
      var user =  firebase.auth().currentUser;
      this.currentUserID = user.uid;
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
            order.show = false;
            console.log(order.id);
            this.orderList.push(order);
            this.selectedZone = this.userProfile.zone;
          });
        });
    },
    show(itemID) {
      let order = this.orderList.find((element) => element.id == itemID);
      order.show = !order.show;
    },
    onContext(ctx) {
        this.context = ctx
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
    if (localStorage.getItem('reloaded')) {
        // The page was just reloaded. Clear the value from local storage
        // so that it will reload the next time this page is visited.
        localStorage.removeItem('reloaded');
    } else {
        // Set a flag so that we know not to reload the page twice.
        localStorage.setItem('reloaded', '1');
        location.reload();
    }
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

#options{
  text-align: left;
}
.filters {
  float: left;
  display: block;
  justify-content: center;
  margin-left: 3%;
  margin-right: 3%;
  width: 14%;
}
.list {
  width: 80%;
  float: right;
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
#requestItems {
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
#top {
  display: inline-flex;
}
#info {
  background: transparent;
  border: none;
}
</style>