<template>
  <div class="container">
  </div>
</template>

<script>
import store from '../store'

export default {
  name: 'CatManager',
  created: () => {
    store.dispatch('get')
  }
}
</script>

<style scoped>
</style>
