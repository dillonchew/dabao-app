<template>
  <div class="requests">
    <h1>Requests</h1>
    <div class = "filters">
       <div id = "filter1">
         <h5> Filter by commission: </h5>
         <br/>
        <vue-slider v-model="commission" :data="commisionData" :data-value="'value'" :data-label="'text'" :marks="true">
        </vue-slider>
       </div>
       <br/><br/><br/>
       <div id = "filter2">
         <h5> Filter by place: </h5>
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
      <br/><br/>
      <div id = "filter3">
        <h5> Filter by time: </h5>
        <br />
         <b-row>
          <b-col md="auto">
            <b-time v-model="time" locale="en" @context="onContext"></b-time>
          </b-col>
        </b-row>
      </div>
      <br/><br/>
      <div id="filter4">
        <h5> Filter by <b>Zone</b>: </h5>
        <br/>
        <b-dropdown :text="selectedZone" @click.native="selectZone($event.target)">
          <!-- <b-form-group id="optionsZone">
            <b-form-checkbox-group
              id="filterZone"
              v-model="selectedZones"
              :options="zones"
              stacked
            ></b-form-checkbox-group>
          </b-form-group> -->
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
        <h6>Items: {{order.items.toString()}}</h6>
        <h6>Commission: {{order.comms}}</h6>
        <h6>Total : {{order.total}}</h6>
        <div v-if="order.show">
          <h6>Name: {{order.name}}</h6>
          <h6>Zone: {{order.zone}}</h6>
        </div>
        <b-button pill variant="outline-secondary" @click="remove(index)">Delete</b-button>
        <b-button v-if="!order.show" v-on:click="show(order.id)" pill variant="outline-secondary">Show details</b-button>
        <b-button v-if="order.show" v-on:click="show(order.id)" pill variant="outline-secondary">Hide details</b-button>
      </li>
    </ul>
    </div>
    <br />
  </div>
</template>

<script>
import database from "../firebase.js";
import { mapState } from "vuex";
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
      if (this.selectedZone === 'ALL')
        return this.orderList;
      else
        return this.orderList.filter(p => p.zone === this.selectedZone);
    }
  },
  data() {
    return {
      orderList: [],
      selectedZone: [],
      time: "",
      commission: '$1.00',
      context: null,
      selectedPlaces: [],
      commisionData: [
          {text: '$1.00', value:'1'}, 
          {text: '$2.00', value: '2'},
          {text: '$3.00', value: '3'},
          {text: '$4.00', value: '4'},
          {text: '$5.00', value: '5'}
        ],
      // commisionData: [1,2,3,4,5],
      places: [
          { text: 'Supper Stretch', value: 'ss' },
          { text: 'Clementi', value: 'clem' },
          { text: 'West Coast', value: 'wc' }
        ],
      zones: ["All", "A", "B", "C","D"]
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
</style>