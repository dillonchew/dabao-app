import Requests from "./components/Requests.vue";
import Offers from "./components/Offers.vue";
import Home from "./components/Home.vue";

export default [
  { path: "/requests", component: Requests },
  { path: "/offers", component: Offers },
  { path: "/", component: Home },
];
