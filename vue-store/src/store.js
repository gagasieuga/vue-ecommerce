// store.js

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    authenticated: false,
    userId: null
    },
  mutations: {
    setAuthenticated(state, value) {
        state.authenticated = value;
    },
    setUserId(state, userId) {
        state.userId = userId;
      }
  },
  actions: {
    // Your actions
  },
  getters: {
    // Your getters
  }
});

export default store;
