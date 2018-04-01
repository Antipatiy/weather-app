<template>
  <div id="app">
    <img src="./assets/logo.png">
    <component v-bind:is="currentView"></component>
  </div>
</template>

<script>
  import store from './store/index';
  import SearchCity from './components/SearchCity/SearchCity.vue'
  import WeatherView from './components/WeatherView/WeatherView.vue'
  import Session from './utils/js/Session.js';

  export default {
    name: 'App',
    store,

    components: {
      SearchCity,
      WeatherView
    },

    methods: {
      checkAndSetSessionData() {
        if (this.$store.state.queryMemorize.hasOwnProperty('units')) {
          Session.setSessionData({
            queryMemorize: this.$store.state.queryMemorize,
            forecast: this.$store.state.forecast,
            weather: this.$store.state.weather,
            units: this.$store.state.units
          });
        }
      }
    },

    computed: {
      currentView() {
        this.checkAndSetSessionData();

        return this.$store.state.isShowWeather ? WeatherView : SearchCity;
      }
    }
  }
</script>

<style lang="less">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;

    h1 {
      font-size: 24px;
      font-weight: bold;
    }

    h2 {
      font-size: 18px;
      font-weight: bold;
    }

    p {
      font-size: 14px;
    }
  }
</style>
