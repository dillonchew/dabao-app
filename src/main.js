import Vue from "vue";
import './plugins/bootstrap-vue'
import App from "./App.vue";
import VueRouter from "vue-router";
import myRoutes from "./routes.js";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.use(VueRouter);
Vue.config.productionTip = false;

const myRouter = new VueRouter({
  routes: myRoutes,
  mode: "history",
});
new Vue({
  render: (h) => h(App),
  router: myRouter,
}).$mount("#app");
