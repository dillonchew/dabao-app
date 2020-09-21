<template>
  <div id="app">
    <app-header v-if="showNav"></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
//Registering component Locally

import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { mapState } from "vuex";

export default {
  //Registering component Locally
  components: {
    "app-header": Header,
    "app-footer": Footer,
  },
  computed: {
    ...mapState(["userProfile"]),
    showNav() {
      return Object.keys(this.userProfile).length > 1;
    },
  },
};
</script>

<style scoped>
#app {
  font-family: "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flexbox;
}
</style>
