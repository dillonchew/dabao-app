<template>
  <div id="app">
    <app-header v-bind:msg="title"></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
//Registering component Locally

import Header from "./components/Header.vue";

export default {
  //Registering component Locally
  components: {
    "app-header": Header,
  },
  data() {
    return {
      title: "Hello",
    };
  },
};
</script>

<style scoped>
#app {
  font-family: "Courier New", Courier, monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
