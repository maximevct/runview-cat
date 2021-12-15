<template>
  <div class="container">
    <ul>
      <li v-for="cat in cats" :key="cat.name">
        {{cat.name}}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CatManager',
  computed: { ...mapState(['cats']) }
}
</script>

<style scoped>
</style>
