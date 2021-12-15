import Vue from 'vue'
import Vuex from 'vuex'

const ALL_CATS = require('./cat.json')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cats: ALL_CATS
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
