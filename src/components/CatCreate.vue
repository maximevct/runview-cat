<template>
  <div>
    <input type="text" v-model="cat.name" />
    <button v-on:click="checkValid">Add</button>
  </div>
</template>

<script>
export default {
  name: 'CatCreate',
  data: () => ({
    cat: {
      name: ''
    }
  }),
  props: ['handler'],
  methods: {
    checkValid: function () {
      this.handler({ ...this.cat })
    }
  }
}
</script>
