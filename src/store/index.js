import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    personalUserId: null,
    enterpriseUserId: null
  },
  getters: {
  },
  mutations: {
    setPersonalUserId(state, newId){
      state.personalUserId = newId;
    },
    setentErpriseUserId(state, newId){
      state.enterpriseUserId = newId;
    }
  },
  actions: {
  },
  modules: {
  }
})
