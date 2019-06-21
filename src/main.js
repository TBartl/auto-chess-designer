import Vue from "vue";
import App from "./App.vue";

import store from "@/store.js";
import router from "@/router.js";

import "bootstrap/dist/css/bootstrap.css";
import "./style.css";

import VModal from "vue-js-modal";
Vue.use(VModal, { dynamic: true});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store,
  router
}).$mount("#app");
