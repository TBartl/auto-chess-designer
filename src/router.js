import Vue from "vue";

import VueRouter from "vue-router";
Vue.use(VueRouter);

import Classes from "@/components/Classes";
import Pieces from "@/components/Pieces";
import Races from "@/components/Races";

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

export default router;
