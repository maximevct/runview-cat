<template>
  <div>
    <input type="text" v-model="currentCat.name" />
    <button v-on:click="checkValid">Update</button>
  </div>
</template>

<script>
export default {
  name: 'CatEdit',
  data: function () {
    return {
      currentCat: { ...this.cat }
    }
  },
  props: ['handler', 'cat'],
  methods: {
    checkValid: function () {
      this.handler({ ...this.currentCat })
    }
  }
}
</script>
