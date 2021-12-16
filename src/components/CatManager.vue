<template>
  <v-container fluid>
    <v-row>
      <cat-create :handler="addCat"/>
    </v-row>
    <v-row
      class="pa-4">
      <v-col>
        <v-toolbar
          class="mb-4"
          dark>
          <v-text-field
            v-on:change="searchCat"
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Rechercher"
          ></v-text-field>
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              item-text="text"
              item-value="id"
              prepend-inner-icon="mdi-filter"
              label="Trier par"
              v-on:change="sortCats"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle
              v-model="sortDesc"
              v-on:change="sortCats"
              mandatory
            >
              <v-btn
                large
                depressed
                :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                large
                depressed
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
        </v-toolbar>

        <v-row>
          <v-col
            v-for="cat in cats.filter(e => e.visible)"
            :key="cat.name"
            cols="4"
          >
            <v-card>
              <v-card-title>
                {{cat.name}}
                <v-icon v-if="cat.sexe === 'Femelle'">mdi-gender-female</v-icon>
                <v-icon v-if="cat.sexe === 'Mâle'">mdi-gender-male</v-icon>
              </v-card-title>
              <v-card-subtitle>{{cat.race}}</v-card-subtitle>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col cols="6">Né{{cat.sexe === 'Femelle' ? 'e' : ''}} le {{cat.birthdate | translateDate}}</v-col>
                  <v-col cols="6">{{cat.price | formatPrice}} €</v-col>
                </v-row>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>{{cat.comment}}</v-row>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <cat-edit :handler="updateCat" :cat="cat" />
                <button v-on:click="removeCat(cat)">Remove</button>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import CatEdit from './CatEdit.vue'
import CatCreate from './CatCreate.vue'
import store from '../store'
import moment from 'moment'

moment.locale('fr')

export default {
  name: 'CatManager',
  data: () => ({
    search: '',
    sortDesc: false,
    sortBy: 'name',
    keys: [
      { id: 'name', text: 'Nom' },
      { id: 'sexe', text: 'Sexe' },
      { id: 'birthdate', text: 'Date de naissance' },
      { id: 'race', text: 'Race' },
      { id: 'price', text: 'Prix' },
      { id: 'comment', text: 'Commentaire' }
    ]
  }),
  components: { CatEdit, CatCreate },
  computed: {
    ...mapState(['cats'])
  },
  created: () => {
    store.dispatch('sortCats', { key: 'name', isDesc: false })
  },
  methods: {
    addCat: (cat) => {
      store.dispatch('add', cat)
    },
    removeCat: (cat) => {
      store.dispatch('remove', cat)
    },
    updateCat: (cat) => {
      store.dispatch('update', cat)
    },
    searchCat (search) {
      store.dispatch('filter', search)
    },
    sortCats (sort) {
      store.dispatch('sortCats', { key: this.sortBy, isDesc: this.sortDesc })
    }
  },
  filters: {
    translateDate: function (date) {
      return moment(date).format('LL')
    },
    formatPrice: function (p) {
      return p.toFixed(2)
    }
  }
}
</script>

<style scoped>
</style>
