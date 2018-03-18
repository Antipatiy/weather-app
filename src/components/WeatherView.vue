<template lang="pug">
  div
    h1 {{ city }}
</template>

<script>
  export default {
    name: 'WeatherView',

    computed: {
      city() {
        return this.$store.state.inputSearch;
      }
    }
  }
</script>
