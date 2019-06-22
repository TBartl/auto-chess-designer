import Vue from "vue";

import VueRouter from "vue-router";
Vue.use(VueRouter);

import Synergies from "@/components/pages/Synergies";
import Pieces from "@/components/pages/Pieces";
import Piece from "@/components/pages/Piece";

const routes = [
  { path: "/piece/:name", component: Piece },
  { path: "/pieces", component: Pieces },
  { path: "/synergies", component: Synergies },
  { path: "*", redirect: "/pieces" }
];

const router = new VueRouter({
  mode: "history",
  base: "/auto-chess-designer/",
  routes
});

export default router;
