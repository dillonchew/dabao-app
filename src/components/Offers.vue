<template>
  <div class="offers">
    <h1>Offers</h1>
    <b-button v-b-modal.modal-offer variant="outline-primary">{{ msg }}</b-button>
    <div>
    <ul>
        <li v-for="(offer,index) in offerList" v-bind:key="index">
          <button @click="remove(index)">x</button>
          <h3>{{offer.place}}</h3>
          <h3>{{offer.time}}</h3>
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
export default {
  data() {
    return {
      offerstate: true,
      msg: "Add Offer",
      offerList: [],
      offer: {
        place: "",
        time: "",
        id: ""
      },
    };
  },
  methods: {
    fetchOffers() {
      database.collection("offers").orderBy('place').get().then((querySnapShot) => {
          let offer = {};
          querySnapShot.forEach((doc) => {
            offer = doc.data();
            offer.id = doc.id;
            console.log(offer.id)
            this.offerList.push(offer);
          });
        });
    },
    remove(index) {
      let id = this.offerList[index].id;
      database.collection('offers').doc(id).delete();
      this.offerList.splice(index, 1);
    },
    addOffer() {
      database
        .collection("offers")
        .add(this.offer)
      alert("saved");
      this.offer.place = "";
      this.offer.time = "";
      this.offer.id = "";
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
}
ul {
  display: block;
  list-style-type: none;
  padding: 0;
}
li {
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
</style>