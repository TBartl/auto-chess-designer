import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

var state = {
  schema: require("./defaultSchema.json")
};

const store = new Vuex.Store({
  state
});

export default store;
