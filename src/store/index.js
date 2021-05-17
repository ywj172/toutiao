import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //存放token数据
    user: JSON.parse(window.localStorage.getItem('user')),
  },
  mutations: {
    'SET_USER'(state, user) {
      state.user = user
      //把token存到本地数据
      window.localStorage.setItem("user", JSON.stringify(user))
    }
  },
  actions: {
    serUser({ commit }, token) {
      commit('SET_USER', token)
    }
  },
  getters: {
    user(state) {
      return state.user
    }
  }
})
