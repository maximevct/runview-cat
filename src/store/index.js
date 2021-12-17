import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cats: []
  },
  mutations: {
    set (state, cats) {
      state.cats = cats
    },
    add (state, cat) {
      state.cats.push(cat)
    },
    remove (state, cat) {
      state.cats.splice(state.cats.findIndex(e => e.id === cat.id), 1)
    },
    update (state, cat) {
      const originalCat = state.cats[state.cats.findIndex(e => e.id === cat.id)]
      originalCat.name = cat.name
      originalCat.price = cat.price
      originalCat.sexe = cat.sexe
      originalCat.comment = cat.comment
      originalCat.birthdate = cat.birthdate
      originalCat.race = cat.race
    },
    filter (state, search) {
      state.cats = state.cats.map(e => ({ ...e, visible: e.name.toLowerCase().search(search.toLowerCase()) !== -1 }))
    },
    sort (state, sort) {
      return state.cats.sort((a, b) => {
        let res = 0
        if (['name', 'race', 'comment', 'sexe'].indexOf(sort.key) >= 0) {
          res = a[sort.key].toLowerCase() < b[sort.key].toLowerCase() ? -1 : 1
        } else {
          res = a[sort.key] < b[sort.key] ? -1 : 1
        }
        return res * (sort.isDesc ? -1 : 1)
      })
    }
  },
  actions: {
    get: ({ commit }) => {
      commit('set', require('./cat.json').map((e, i) => ({ ...e, id: i, visible: true })))
      commit('sort', { key: 'name', isDesc: false })
    },
    add: ({ commit, state }, cat) => {
      cat.id = cat.id >= 0 ? cat.id : Math.max(...state.cats.map(e => e.id)) + 1
      cat.visible = true
      commit('add', cat)
    },
    remove: ({ commit }, cat) => {
      commit('remove', cat)
    },
    update: ({ commit }, cat) => {
      commit('update', cat)
    },
    filter: ({ commit }, search) => {
      commit('filter', search)
    },
    sort: ({ commit }, sort) => {
      commit('sort', sort)
    }
  },
  modules: {
  },
  getters: {
    visibleCats: state => state.cats.filter(e => e.visible)
  }
})
