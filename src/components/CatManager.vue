<template>
  <div class="container">
    <cat-create :handler="addCat"/>
    <ul>
      <li v-for="cat in cats" :key="cat.id">
        <cat-edit :handler="updateCat" :cat="cat" />
        {{cat.name}} <button v-on:click="removeCat(cat)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CatEdit from './CatEdit.vue'
import CatCreate from './CatCreate.vue'
import store from '../store'

export default {
  name: 'CatManager',
  components: { CatEdit, CatCreate },
  computed: { ...mapState(['cats']) },
  methods: {
    addCat: (cat) => {
      store.dispatch('add', cat)
    },
    removeCat: (cat) => {
      store.dispatch('remove', cat)
    },
    updateCat: (cat) => {
      store.dispatch('update', cat)
    }
  }
}
</script>

<style scoped>
</style>
