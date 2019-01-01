import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  showLoading: false,
  showTip: false
}

const getters = {
  showLoading(showLoading) {
    return state.showLoading
  },
  showTip(showTip) {
    return state.showTip
  }
}

const mutations = {
  showLoading: function () {
    state.showLoading = true
  },
  hideLoading: function () {
    state.showLoading = false
  },
  showTip: function () {
    state.showTip = true
  },
  hideTip: function () {
    state.showTip = false
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations
})

export default store;
