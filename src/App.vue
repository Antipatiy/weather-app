<template>
  <div id="app">
    <img src="./assets/logo.png">
    <component v-bind:is="currentView"></component>
  </div>
</template>

<script>
  import store from './store/index';
  import SearchCity from './components/SearchCity/SearchCity'
  import WeatherView from './components/WeatherView/WeatherView'

  export default {
    name: 'App',
    store,

    components: {
      SearchCity,
      WeatherView
    },

    computed: {
      currentView() {
        return this.$store.state.isShowWeather ? WeatherView : SearchCity;
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
