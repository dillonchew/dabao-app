<template>
  <div>
    <b-button v-b-modal.modal-clem pill variant="outline-secondary">
      {{ msg }}
      <b-icon icon="cart-plus"></b-icon>
    </b-button>

    <b-modal
      id="modal-clem"
      ref="modal"
      title="What would you like from Clementi Mall?"
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
            <img v-if="order.shop == 'Crave'" src="@/assets/menuclem/crave1.webp" alt=""/>
            <img v-if="order.shop == 'Crave'" src="@/assets/menuclem/crave2.webp" alt=""/>
            <img v-if="order.shop == 'EAT'" src="@/assets/menuclem/eat.webp" alt=""/>
            <img v-if="order.shop == 'Jinjja Chicken'" src="@/assets/menuclem/jinjja.webp" alt=""/>
            <img v-if="order.shop == 'KFC'" src="@/assets/menuclem/kfc1.png" alt=""/>
            <img v-if="order.shop == 'KFC'" src="@/assets/menuclem/kfc2.png" alt=""/>
            <img v-if="order.shop == 'KFC'" src="@/assets/menuclem/kfc3.png" alt=""/>
            <img v-if="order.shop == 'LiHO'" src="@/assets/menuclem/liho.jpg" alt=""/>
            <img v-if="order.shop == 'Mr. Coconut'" src="@/assets/menuclem/coco1.png" alt=""/>
            <img v-if="order.shop == 'Mr. Coconut'" src="@/assets/menuclem/coco2.png" alt=""/>
            <img v-if="order.shop == 'Old Chang Kee'" src="@/assets/menuclem/ock1.png" alt=""/>
            <img v-if="order.shop == 'Old Chang Kee'" src="@/assets/menuclem/ock2.png" alt=""/>
            <img v-if="order.shop == 'Old Chang Kee'" src="@/assets/menuclem/ock3.png" alt=""/>
            <img v-if="order.shop == 'Stuffd'" src="@/assets/menuclem/stuffd.jpg" alt=""/>
            <img v-if="order.shop == 'Subway'" src="@/assets/menuclem/subway.webp" alt=""/>
            <img v-if="order.shop == 'TORI-Q'" src="@/assets/menuclem/toriq1.png" alt=""/>
            <img v-if="order.shop == 'TORI-Q'" src="@/assets/menuclem/toriq2.png" alt=""/>
            <img v-if="order.shop == 'TORI-Q'" src="@/assets/menuclem/toriq3.png" alt=""/>
            <img v-if="order.shop == 'Wok Hey'" src="@/assets/menuclem/wokhey.jpg" alt=""/>
          </div>
          <br />
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
import * as fb from "../firebase"
export default {
  data() {
    return {
      showMenu: false,
      orderState: true,
      msg: "Add Order",
      order: {
        place: "Clementi Mall",
        shop: "",
        items: "",
        id: "",
        name: "",
        zone: ""
      },
      shops: ['Crave', 'EAT', 'Jinjja Chicken', 'KFC', 'LiHO', 'Mr. Coconut', 'Old Chang Kee', 'Stuffd', 'Subway', 'TORI-Q', 'Wok Hey']
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
        this.$bvModal.hide("modal-clem");
      });
    },
    created() {
      var user = fb.auth().currentUser;
      this.order.name = user.name;
      this.order.zone = user.zone;
    }
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
