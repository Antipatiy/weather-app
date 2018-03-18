<template lang="pug">
  .search
    input.input-search__city(placeholder="City", v-model.trim="inputSearch", @keyup.enter="searchByInput")
    p.search__location
      span or
      br
      | use my
      span.search__position(@click="searchByCoordinate") current position
      <!--i.wi.wi-owm-701(style="font-size: 130px; color: red;")-->
      i.material-icons.material-icons_search(@click="searchByInput") search
    button(@click="mutate") zzzzz
</template>

<script>
  export default {
    name: 'StartPage',

    computed: {
      inputSearch: {
        get () {
          return this.$store.state.inputSearch
        },
        set (value) {
          this.$store.commit('updateInputSearch', value)
        }
      }
    },

    methods: {
      mutate() {
        console.log(this.$store.state.weather);
      },

      setPosition(position) {
        this.$store.dispatch('setAsyncWeatherData', {
          lon: 'lon=' + position.coords.longitude,
          lat: 'lat=' + position.coords.latitude + '&'
        });
      },

      searchByCoordinate() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.setPosition);
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      },

      searchByInput() {
        if (this.inputSearch.length > 0) {
          this.$store.dispatch('setAsyncWeatherData', {
            city: 'q=' + this.inputSearch
          });
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .search {
    position: relative;
    width: 600px;
    margin: 0 auto;

    .input-search__city {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      width: 100%;
      height: 50px;
      border: none;
      border-bottom: 2px solid #797979;
      outline: none;
    }

    .input-search__city::placeholder {
      font-size: 40px;
      text-align: center;
      position: relative;
      font-weight: bold;
      top: 10px;
      color: #a2a2a2;
    }

    .search__location {
      text-align: center;

      .search__position {
        border-bottom: 1px dashed #000;
        cursor: pointer;
      }
      .material-icons_search {
        cursor: pointer;
        color: #797979;
        position: absolute;
        top: 3px;
        right: 0;
        font-size: 40px;
      }
    }
  }
</style>
