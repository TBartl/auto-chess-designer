import Vue from "vue";
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.css";

import VueRouter from "vue-router";
Vue.use(VueRouter);

import Classes from "@/components/Classes";
import Pieces from "@/components/Pieces";
import Races from "@/components/Races";

Vue.config.productionTip = false;

const routes = [
  { path: "/classes", component: Classes },
  { path: "/pieces", component: Pieces },
  { path: "/races", component: Races }
];

const router = new VueRouter({
  mode: "history",
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
