import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

var state = {
  schema: undefined
};

var getters = {
  schema(state) {
    if (!state.schema) {
      state.schema = require("./defaultSchema.json");
    }
    return state.schema;
  }
};

const store = new Vuex.Store({
  state,
  getters
});

export default store;
