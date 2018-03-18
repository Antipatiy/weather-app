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
  import axios from 'axios';

  export default {
    name: 'StartPage',

    data () {
      return {
//        inputSearch: ''
      }
    },

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

//      getWeatherData({city = '', lon = '', lat = '', units = '&units=metric'} = {}) {
//        axios({
//          method: 'get',
//          url: 'https://api.openweathermap.org/data/2.5/forecast?' + city + lat + lon + '&APPID=33272e8b33b64b1c603b1a9cbd022c16' + units,
//          responseType: 'json',
//        })
//          .then((response) => {
//            return response.data;
//          })
//          .then((json) => {
//            json.list.forEach((item) => console.log(item.dt_txt));
//            console.log(json.city.name);
//          })
//          .catch((error) => {
//            if (error.response.status === 404) {
//              this.inputSearch += ' not found';
//            }
//            console.error(error);
//          });
//      },

      setPosition(position) {
        this.$store.dispatch('setAsyncWeatherData', {
          lon: 'lon=' + position.coords.longitude,
          lat: 'lat=' + position.coords.latitude + '&'
        });

//        this.getWeatherData({
//          lon: 'lon=' + position.coords.longitude,
//          lat: 'lat=' + position.coords.latitude + '&'
//        })
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

//          this.getWeatherData({
//            city: 'q=' + this.inputSearch
//          });
        }

        this.$emit('setCity');
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
