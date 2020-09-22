<template>
  <div>
    <b-button v-b-modal.modal-deck pill variant="outline-secondary">
      {{ msg }}
      <b-icon icon="cart-plus"></b-icon>
    </b-button>

    <b-modal
      id="modal-deck"
      ref="modal"
      title="Place your order !!"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form id="add-order-form" ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="orderState"
          label="What would you like from Deck?"
          label-for="order-input"
          invalid-feedback="Shop and Items are required"
        >
          <label>Which Shop:</label>
          <b-form-input
            id="shop-input"
            v-model="order.shop"
            :state="orderState"
            required
          ></b-form-input>
          <label>What Items:</label>
          <b-form-input
            id="items-input"
            v-model="order.items"
            :state="orderState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import database from "../firebase.js";
import * as fb from "../firebase";

export default {
  data() {
    return {
      orderState: true,
      msg: "Add Order",
      order: {
        place: "Deck",
        shop: "",
        items: "",
        id: "",
        name: "",
        zone: ""
      },
    };
  },

  methods: {
    addOrder() {
      fb.auth.onAuthStateChanged(async (user) => {
        if (user) {
          // User is signed in.
          var email = user.email;
          var uid = user.uid;
          let order1 = {};
          const userRef = database.collection("users").doc(uid);
          const doc = await userRef.get();
          order1 = doc.data();
          this.order.name = order1.name;
          this.order.zone = order1.zone;
          console.log(this.order);
        }
        database.collection("orders").add(this.order);
        alert("saved");
        this.order.shop = "";
        this.order.items = "";
        this.order.id = "";
        this.order.name = "";
        this.order.zone = "";
      });
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.orderState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.orderState = null;
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
      //Add order to database
      this.addOrder();

      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-deck");
      });
    },
  }
};
</script>

<style scoped>
button {
  background-color: #4682b4;
  color: white;
}
</style>
