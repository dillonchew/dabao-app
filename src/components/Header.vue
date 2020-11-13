<template>
  <div>
    <header>
      <nav>
        <router-link to="/" exact>Home</router-link>
        <router-link to="/requests" exact>Requests</router-link>
        <router-link to="/offers" exact>Offers</router-link>
        <router-link to="/dashboard" exact>Dashboard</router-link>
        <router-link to="/profile" exact>Profile</router-link>
        <!--<router-link to="/settings" exact>Settings</router-link> removed and added to Profile-->
        <b-button pill variant="outline-secondary" @click="logout()">
          Logout
          <b-icon icon="door-open"></b-icon>
        </b-button>
      </nav>
    </header>
    <b-alert dismissible :show="this.showAlert" @dismissed="dismiss()">Someone accepted your order!</b-alert>
  </div>
</template>

<script>
import { mapState } from "vuex";
import database from "../firebase.js";
import * as firebase from 'firebase';

export default {
  data() {
    return {
      showAlert: false,
    };
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  props: {
    msg: {
      type: String,
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      alert("Logging out of your account now.");
    },
    fetch() {
      var user = firebase.auth().currentUser;
      const self = this;
      database
        .collection("users")
        .doc(user.uid)
        .get()
        .then(function(doc) {
          if (doc.data().newOrderAccepted == 'true'){
            self.showAlert = true;
          }
        });
    },
    dismiss() {
      this.showAlert = false;
      var user = firebase.auth().currentUser;
      database.collection('users').doc(user.uid).set({newOrderAccepted:'false'}, {merge:true})
    },
    onContext(ctx) {
      this.context = ctx
    },
  },
  created() {
    this.fetch();
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  background-color: transparent;
  color:   #F9154A;
  border-color:  #F9154A;
  float: right;
}
button:hover {
  background-color:transparent;
  color:  #00e6ac;
  border-color: #00e6ac;
}
header {
  font-family: Slack-Circular-Pro, "Helvetica Neue", Helvetica, "Segoe UI",
    Tahoma, Arial, sans-serif;
  padding: 10px;
  margin: 0;
  display: flexbox;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  background-image: url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/45c2456a-a9ad-44f4-8bec-a7a11c829ed1/d4iq8qc-f1284962-3dc4-43cf-a9e2-0a599127bafa.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
  height:60px;

}
a {
  padding: 10px;
  color:  #e6ebff;
  text-decoration: none;
}
a:hover {
  color: #00e6ac;
  text-decoration: none;
}
</style>
