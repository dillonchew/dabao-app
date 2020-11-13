<template>
  <div>
    <b-button variant="outline-secondary" v-on:click.prevent.once='addItem'>
      {{ msg }}
      <b-icon icon="cart-plus"></b-icon>
    </b-button>
  </div>
</template>

<script>
import database from "../firebase.js";
import * as fb from "../firebase";

export default {
  props: {
    time: {type : String},
    cart: { type : Array}
  },

  data() {
    return {
      orderState: true,
      msg: "Add Order",
      order: {
        name: "",
        userid: "",
        zone: "",       
        place: "",
        shop : "",
        items: [],
        total : "",
        comms : "",
        time: ""
      },
    }
  },

methods: {
     addItem(){
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
          this.order.userid = uid;
          this.order.tele = order1.tele;
        }

        // comms and total 
          var t = this.cart.map(item => item.price).reduce((result, amount) => result + amount);
          this.order.total = t * 110/100
          this.order.comms = t * 10/100

        // name of items 
          this.cart.map(x => this.order.items.push(x.name.concat(" ",x.size)))
          this.order.shop = this.cart[0].shop

          this.order.time = this.time
          
          database.collection('orders').add(this.order);
          alert('saved! should there be any changes, contact your dabao-er')
      });
  }
}
}
</script>

<style scoped>
button {
  background-color: white;
  color:  #660066;
  border-color: #660066;
}
button:hover {
  background-color:white;
  color:  #660066;
  border-width: 2px;
  border-color: #660066;
}
</style>
