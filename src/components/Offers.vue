<template>
  <div class="offers">
    <h1>Offers</h1>
    <b-button id="offerbutton" v-b-modal.modal-offer pill variant="outline-secondary">
      {{ msg }}
      <b-icon icon="gift" aria-hidden="true"></b-icon>
    </b-button>
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
    <div>
      <ul>
        <li id="offerItems" v-for="(offer, index) in filteredProducts" v-bind:key="index">
          <b-button pill variant="outline-secondary" @click="remove(index)">Delete</b-button>
          <h5>Name: {{ offer.name }}</h5>
          <h5>Zone: {{ offer.zone }}</h5>
          <h5>Place: {{ offer.place }}</h5>
          <h5>Time: {{ offer.time }}</h5>
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
          label="Input your details"
          label-for="info-input"
          invalid-feedback="Place and Time are required"
        >
          <label>Where are you going:</label>
          <b-form-input id="place-input" v-model="offer.place" :state="offerstate" required></b-form-input>
          <label>What Time:</label>
          <b-form-input id="time-input" v-model="offer.time" :state="offerstate" required></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import database from "../firebase.js";
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
      selectedZone: ""
    };
  },
  computed: {
    ...mapState(["userProfile"]),
    filteredProducts() {
      if (this.selectedZone === 'ALL')
        return this.offerList;
      else
        return this.offerList.filter(p => p.zone === this.selectedZone);

    }
  },
  methods: {
    fetchOffers() {
      database
        .collection("offers")
        .orderBy("place")
        .get()
        .then((querySnapShot) => {
          let offer = {};
          querySnapShot.forEach((doc) => {
            offer = doc.data();
            offer.id = doc.id;
            console.log(offer.id);
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
          console.log(this.offer);
        }
        database.collection("offers").add(this.offer);
        alert("saved");
        this.offer.place = "";
        this.offer.time = "";
        this.offer.id = "";
        this.offer.name = "";
        this.offer.zone = "";
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
#offerItems {
  text-align: left;
  font-family: Arial, Helvetica, sans-serif;
  padding: 10px;
  width: 400px;
  margin: 10px;
  border: 1px solid #222;
  border-radius: 25px;
  box-shadow: 3px 7px #660066;
}
#offerbutton {
  background-color: #4682b4;
  color: white;
}
.round {
  border-radius: 8px;
}
.offers {
  display: flexbox;
  justify-content: center;
  text-align: center;
}
</style>
