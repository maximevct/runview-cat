<template>
  <v-container fluid>
    <v-row>
      <cat-create :handler="addCat"/>
    </v-row>
    <v-row>
      <v-data-iterator
        :items="cats"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
      >
        <template v-slot:header>
          <v-toolbar>
            <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
            ></v-text-field>
            <template v-if="$vuetify.breakpoint.mdAndUp">
              <v-spacer></v-spacer>
              <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="mdi-magnify"
                label="Sort by"
              ></v-select>
              <v-spacer></v-spacer>
              <v-btn-toggle
                v-model="sortDesc"
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
            </template>
          </v-toolbar>
        </template>

        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="cat in props.items"
              :key="cat.name"
              cols="3"
              class="d-flex align-stretch"
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
        </template>

        <template v-slot:footer>
          <v-row
            align="center"
            justify="center"
          >
            <v-col>
              <span class="grey--text">Items per page</span>
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    dark
                    text
                    color="primary"
                    class="ml-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ itemsPerPage }}
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(number, index) in itemsPerPageArray"
                    :key="index"
                    @click="updateItemsPerPage(number)"
                  >
                    <v-list-item-title>{{ number }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
            <v-spacer></v-spacer>
            <v-col
              class="text-right">
              <span
                class="mr-4
                grey--text"
              >
                Page {{ page }} of {{ numberOfPages }}
              </span>
              <v-btn
                fab
                dark
                color="blue darken-3"
                class="mr-1"
                @click="formerPage"
              >
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn
                fab
                dark
                color="blue darken-3"
                class="ml-1"
                @click="nextPage"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
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
    itemsPerPageArray: [4, 8, 12],
    search: '',
    filter: {},
    sortDesc: false,
    page: 1,
    itemsPerPage: 4,
    sortBy: 'name',
    keys: [
      'name',
      'sexe',
      'birthdate',
      'race',
      'price',
      'comment'
    ]
  }),
  components: { CatEdit, CatCreate },
  computed: {
    ...mapState(['cats']),
    numberOfPages () {
      return Math.ceil(this.cats.length / this.itemsPerPage)
    },
    filteredKeys () {
      return this.keys.filter(key => key !== 'Name')
    }
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
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage () {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage (number) {
      this.itemsPerPage = number
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
