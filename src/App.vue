<template>
  <div id="app">
    <img src="./assets/logo.png" @click="toDo">
    <component v-bind:is="currentView" @setCity="changeComponent"></component>
  </div>
</template>

<script>
import SearchCity from './components/SearchCity'
import WeatherView from './components/WeatherView'

export default {
  name: 'App',
  components: {
    SearchCity,
    WeatherView
  },
  data() {
    return {
      currentView: SearchCity
    }
  },
  methods: {
    toDo() {
      this.currentView = this.currentView === WeatherView ? SearchCity : WeatherView;
    },

    changeComponent() {
      alert(11)
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
