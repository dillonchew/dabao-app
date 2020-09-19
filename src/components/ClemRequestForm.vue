<template>
  <div>
    <b-button v-b-modal.modal-clem pill variant="outline-secondary">
      {{ msg }}
      <b-icon icon="cart-plus"></b-icon>
    </b-button>

    <b-modal
      id="modal-clem"
      ref="modal"
      title="Place your order !!"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form id="add-order-form" ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="orderState"
          label="What would you like from Clementi Mall?"
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
export default {
  data() {
    return {
      orderState: true,
      msg: "Add Order",
      order: {
        place: "Clementi Mall",
        shop: "",
        items: "",
        id: "",
      },
    };
  },

  methods: {
    addOrder() {
      database.collection("orders").add(this.order);
      alert("saved");
      this.order.shop = "";
      this.order.items = "";
      this.order.id = "";
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
  },
};
</script>

<style scoped>
button {
  background-color: #4682b4;
  color: white;
}
</style>
