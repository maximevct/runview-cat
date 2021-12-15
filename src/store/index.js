import Vue from 'vue'
import Vuex from 'vuex'

const ALL_CATS = require('./cat.json').map((e, i) => ({ ...e, id: i }))

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cats: ALL_CATS
  },
  mutations: {
    add (state, cat) {
      state.cats.push(cat)
    },
    remove (state, cat) {
      state.cats.splice(state.cats.findIndex(e => e.id === cat.id), 1)
    },
    update (state, cat) {
      state.cats[state.cats.findIndex(e => e.id === cat.id)].name = cat.name
    }
  },
  actions: {
    add: ({ commit, state }, cat) => {
      cat.id = cat.id >= 0 ? cat.id : Math.max(...state.cats.map(e => e.id)) + 1
      commit('add', cat)
    },
    remove: ({ commit }, cat) => {
      commit('remove', cat)
    },
    update: ({ commit }, cat) => {
      commit('update', cat)
    }
  },
  modules: {
  }
})
