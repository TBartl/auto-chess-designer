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
  { path: "/pieces", component: Pieces },
  { path: "/classes", component: Classes },
  { path: "/races", component: Races },
  { path: "*", redirect: "/pieces" }
];

const router = new VueRouter({
  mode: "history",
  base: "/auto-chess-designer/",
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
