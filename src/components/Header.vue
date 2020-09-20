<template>
  <div>
    <header>
      <nav>
        <router-link to="/" exact>Home</router-link>
        <router-link to="/requests" exact>Requests</router-link>
        <router-link to="/offers" exact>Offers</router-link>
        <router-link to="/settings" exact>Settings</router-link>
        <button @click="logout()">Logout</button>
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
      this.$store.dispatch('logout')
      alert("Logging out of your account now.")
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  padding: 10px;
  /* font-size: 16px; */
  color: #696969;
  font-family: Slack-Circular-Pro, "Helvetica Neue", Helvetica, "Segoe UI",
    Tahoma, Arial, sans-serif;
  padding: 10px;
  margin: 0;
  justify-content: flex-start;
  display: flex;
  align-items: center;
  flex: 1;
}
a {
  padding: 10px;
  color: #696969;
  text-decoration: none;
}
a:hover {
  color: #add8e6;
}
</style>

