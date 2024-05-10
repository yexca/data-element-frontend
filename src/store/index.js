import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    personalUserId: null,
    enterpriseUserId: null,
    // 国际化
    locale: localStorage.getItem('locale') || 'zh' // 如果本地存储中没有语言设置，默认使用'zh'
  },
  getters: {
  },
  mutations: {
    setPersonalUserId(state, newId){
      state.personalUserId = newId;
    },
    setentErpriseUserId(state, newId){
      state.enterpriseUserId = newId;
    },
    setLocale(state, newLocale){
      state.locale = newLocale;
    }
  },
  actions: {
  },
  modules: {
  }
})
