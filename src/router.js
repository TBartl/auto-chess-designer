import Vue from "vue";

import VueRouter from "vue-router";
Vue.use(VueRouter);

import Classes from "@/components/pages/Classes";
import Pieces from "@/components/pages/Pieces";
import Piece from "@/components/pages/Piece";

const routes = [
  { path: "/piece/:name", component: Piece },
  { path: "/pieces", component: Pieces },
  { path: "/classes", component: Classes },
  { path: "*", redirect: "/pieces" }
];

const router = new VueRouter({
  mode: "history",
  base: "/auto-chess-designer/",
  routes
});

export default router;
