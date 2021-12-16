<template>
  <v-app>
    <v-app-bar app>
      Cat Manager
    </v-app-bar>
    <v-main>
      <CatManager />
    </v-main>
  </v-app>
</template>

<script>
import CatManager from './components/CatManager.vue'

export default {
  name: 'App',
  components: { CatManager }
}
</script>

<style>
</style>
