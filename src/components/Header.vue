<template>
  <div>
    <header>
      <nav>
        <router-link to="/" exact>Home</router-link>
        <router-link to="/requests" exact>Requests</router-link>
        <router-link to="/offers" exact>Offers</router-link>
        <router-link to="/dashboard" exact>Dashboard</router-link>
        <router-link to="/profile" exact>Profile</router-link>
        <router-link to="/settings" exact>Settings</router-link>
        <b-button pill variant="outline-secondary" @click="logout()">
          Logout
          <b-icon icon="door-open"></b-icon>
        </b-button>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {};
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  background-color: #660066;
  color: white;
  float: right;
}
header {
  color: #696969;
  font-family: Slack-Circular-Pro, "Helvetica Neue", Helvetica, "Segoe UI",
    Tahoma, Arial, sans-serif;
  padding: 10px;
  margin: 0;
  display: flexbox;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  /* flex: 1; */
}
a {
  padding: 10px;
  color: #696969;
  text-decoration: none;
}
a:hover {
  color: #00e6ac;
  text-decoration: none;
}
</style>
