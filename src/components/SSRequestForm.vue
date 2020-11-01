<template>
  <div>
    <b-button v-b-modal.modal-ss pill variant="outline-secondary">
      {{ msg }}
      <b-icon icon="cart-plus"></b-icon>
    </b-button>
    <b-modal
      id="modal-ss"
      ref="modal"
      title="What would you like from Supper Stretch?"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form id="add-order-form" ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="orderState"
          label-for="order-input"
          invalid-feedback="Shop and Items are required"
        >
        <label>Which Shop:</label>
          <b-form-select
            id="shop-input"
            v-model="order.shop"
            :options="shops"
            :state="orderState"
            required
          ></b-form-select>
          <br /><br />
          <b-button @click="showMenu = !showMenu" pill variant="outline-secondary">Show menu</b-button>
          <br /><br />
          <div v-if="showMenu">
          <img v-if="order.shop == 'Be Frank'" src="@/assets/menuss/befrank.png" alt=""/>
          <img v-if="order.shop == 'Hong Kong'" src="@/assets/menuss/hk1.jpg" alt=""/>
          <img v-if="order.shop == 'Hong Kong'" src="@/assets/menuss/hk2.jpg" alt=""/>
          <img v-if="order.shop == 'Fong Seng'" src="@/assets/menuss/fongseng.jpg" alt=""/>
          <img v-if="order.shop == 'Formosa'" src="@/assets/menuss/formosa1.png" alt=""/>
          <img v-if="order.shop == 'Formosa'" src="@/assets/menuss/formosa2.png" alt=""/>
          <img v-if="order.shop == 'Formosa'" src="@/assets/menuss/formosa3.png" alt=""/>
          <img v-if="order.shop == 'NaNa Thai'" src="@/assets/menuss/thai.png" alt=""/>
          <img v-if="order.shop == 'Makan Ave'" src="@/assets/menuss/makan1.jpg" alt=""/>
          <img v-if="order.shop == 'Makan Ave'" src="@/assets/menuss/makan2.jpg" alt=""/>
          <img v-if="order.shop == 'Al Amaan'" src="@/assets/menuss/amaan1.jpg" alt=""/>
          <img v-if="order.shop == 'Al Amaan'" src="@/assets/menuss/amaan2.jpg" alt=""/>
          <img v-if="order.shop == 'Al Amaan'" src="@/assets/menuss/amaan3.jpg" alt=""/>
          <img v-if="order.shop == 'Al Amaan'" src="@/assets/menuss/amaan4.jpg" alt=""/>
          <img v-if="order.shop == 'Al Amaan'" src="@/assets/menuss/amaan5.jpg" alt=""/>
          <img v-if="order.shop == 'Al Amaan'" src="@/assets/menuss/amaan6.jpg" alt=""/>
          <img v-if="order.shop == 'Al Amaan'" src="@/assets/menuss/amaan7.jpg" alt=""/>
          </div>
          <br />
          <label>What Items:</label>
          <b-form-input id="items-input" v-model="order.items" :state="orderState" required></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import database from "../firebase.js";
import * as fb from "../firebase";
import { auth } from "../firebase";

export default {
  data() {
    return {
      showMenu: false,
      imgSrc: "./assets/amaans.jpg",
      orderState: true,
      msg: "Add Order",
      order: {
        place: "Supper Stretch",
        shop: "",
        items: "",
        id: "",
        name: "",
        zone: "",
      },
        shops: ['Be Frank', 'Hong Kong', 'Fong Seng', 'Formosa', 'NaNa Thai', 'Cheese Prata', 'Makan Ave', 'Al Amaan']
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
        this.$bvModal.hide("modal-ss");
      });
    },
  },
};
</script>

<style scoped>
img {
  display:flex;
  width:100%;
  height:100%;
}
</style>
