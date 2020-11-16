<template>
  <div class="offers">
    <div id = "head">
      <br/>
      <h1>Offers</h1>
      <b-button id="info" v-b-tooltip.hover title="Tell people where you're going!">
        <b-icon icon="info-circle-fill" style="color:#660066"></b-icon>
      </b-button>
      <b-button id="offerbutton" v-b-modal.modal-offer pill variant="outline-secondary">
        {{ msg }}
        <b-icon icon="gift" aria-hidden="true"></b-icon>
      </b-button>
    </div>
    <div class = "filters">
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
      <br/><br/>
      <div id = "filter3">
        <h5> Filter by <b>Time:</b> </h5>
        <br />
         <b-row>
          <b-col md="auto">
            <b-time v-model="time" locale="en" minutes-step=30></b-time>
          </b-col>
        </b-row>
      </div>
      <br/><br/><br/>
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
        <li id="offerItems" v-for="(offer, index) in filteredProducts" v-bind:key="index">
          <h5>{{offer.place}}</h5>
        <hr/>
        <h6>Time: {{offer.time}}</h6>
        <div v-if="offer.show">
          <h6>Name: <router-link :to="`/user/${offer.uid}`" exact>{{offer.name}}</router-link></h6>
          <h6>Zone: {{offer.zone}}</h6>
          <h6>Tele: {{offer.tele}}</h6>
        </div>
        <b-button id="button" v-if="currentUserID === offer.uid" pill variant="outline-secondary" @click="remove(index)">Delete</b-button>
        <b-button id="button" v-if="!offer.show" v-on:click="show(offer.id)" pill variant="outline-secondary">Show details</b-button>
        <b-button id="button" v-if="offer.show" v-on:click="show(offer.id)" pill variant="outline-secondary">Hide details</b-button>
        </li>
      </ul>
    </div>
      <b-modal
        id="modal-offer"
        ref="modal"
        title="Offer your services"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form id="add-offer-form" ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            :state="offerstate"
            label-for="info-input"
            invalid-feedback="Place and Time are required"
          >
            <label>Where are you going:</label>
            <b-form-select v-model="offer.place" :options="places" :state="offerstate" class="mt-3" required></b-form-select>
            <br/>
            <label>What Time:</label>
            <b-form-timepicker v-model="offer.time" minutes-step="30" :state="offerstate" locale="en" required></b-form-timepicker>
          </b-form-group>
        </form>
      </b-modal>
  </div>
</template>

<script>
import database from "../firebase.js";
import * as firebase from 'firebase';
import * as fb from "../firebase";
import { auth } from "../firebase";
import { mapState } from "vuex";



export default {
  data() {
    return {
      offerstate: true,
      msg: "Add Offer",
      offerList: [],
      offer: {
        place: "",
        time: "",
        id: "",
      },
      selectedZone: "",
      time: "",
      commission: '$1.00',
      context: null,
      currentUserID: "",
      selectedPlaces: [],
      commisionData: [
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
        ]
    };
  },
  computed: {
    ...mapState(["userProfile"]),
    filteredProducts() {
      var temp1;
      var temp2;
      var temp3;
      if (this.selectedZone === 'ALL'){
        temp1 = this.offerList;
      } else {
        temp1 = this.offerList.filter(p => p.zone === this.selectedZone);
      }  
      if (!this.selectedPlaces.length){
        temp2 = temp1;
      } else {
        temp2 =  temp1.filter(j => this.selectedPlaces.includes(j.place));
      }
      if (this.time != ''){
        temp3 = temp2.filter(i => i.time === this.time);
        return temp3; 
      } else {
        return temp2;
      }
    }
  },
  methods: {
    show(itemID) {
      let offer = this.offerList.find((element) => element.id == itemID);
      offer.show = !offer.show;
    },
    fetchOffers() {
      var user =  firebase.auth().currentUser;
      this.currentUserID = user.uid;
      database
        .collection("offers")
        .orderBy("place")
        .get()
        .then((querySnapShot) => {
          let offer = {};
          querySnapShot.forEach((doc) => {
            offer = doc.data();
            offer.id = doc.id;
            offer.show = false;
            this.offerList.push(offer);
            this.selectedZone = this.userProfile.zone;
          });
        });
    },
    remove(index) {
      let id = this.offerList[index].id;
      database.collection("offers").doc(id).delete();
      this.offerList.splice(index, 1);
    },
    addOffer() {
      fb.auth.onAuthStateChanged(async (user) => {
        if (user) {
          // User is signed in.
          var email = user.email;
          var uid = user.uid;
          let offer1 = {};
          const userRef = database.collection("users").doc(uid);
          const doc = await userRef.get();
          offer1 = doc.data();
          this.offer.name = offer1.name;
          this.offer.zone = offer1.zone;
          this.offer.tele = offer1.tele;
          this.offer.uid = uid;
          console.log(this.offer);
        }
        database.collection("offers").add(this.offer);
        alert("saved");
        this.offer.place = "";
        this.offer.tele = "";
        this.offer.time = "";
        this.offer.id = "";
        this.offer.name = "";
        this.offer.zone = "";
        this.offer.uid = "";
      });
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.offerstate = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.offerstate = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      //Add offer to database
      this.addOffer();

      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-offer");
      });
    },
    selectZone(target) {
      this.selectedZone = target.getAttribute('value');
    }
  },
  created() {
    this.fetchOffers();
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
  margin-left: 13%;
  display: inline;
}
#offerbutton, #button {
  margin-left: 2%;
  margin-bottom: 1%;
  background-color: white;
  color:  #660066;
  border-color: #660066;
}

#offerbutton:hover {
  background-color:white;
  color:  #660066;
  border-width: 2px;
  border-color: #660066;
}
#head {
  display: block;
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
#offerItems {
  text-align: left;
  font-family: Arial, Helvetica, sans-serif;
  padding: 10px;
  width: 300px;
  margin: 10px;
  box-shadow: 3px 5px  #f2f2f3;
}
#info {
  background: transparent;
  border: none;
}
</style>
