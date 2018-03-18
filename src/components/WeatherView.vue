<template lang="pug">
  .weather
    i.material-icons.material-icons_back(@click="back") arrow_back
    h1 {{ city }}
    .units
      input.units__checkbox(type="checkbox" id="checkbox" v-model="checked")
      label.units__label(for="checkbox")
      span.units__symbols &deg;C &deg;F
      p {{ checked }}
    h1 {{ day }}, {{ month }} {{ date }} {{ year }}
    h2 {{ description }}
    h1 {{ mainTemperature }}&deg;C
    i(class="main-icon", :class="mainIconClass")
    p(v-for="item in timezzz", :key="item.id") {{ item.dt_txt }} | {{ item.main.temp }}&deg;C |

</template>

<script>
  const DAYSOFWEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December'];
  const DAYTIME = ['Morning', 'Day', 'Evening', 'Night'];

  export default {
    name: 'WeatherView',

    data() {
      return {
        checked: true
      }
    },

    computed: {
      city() {
        return this.$store.state.inputSearch;
      },

      day() {
        return DAYSOFWEEK[ this.timestamp().getDay() ];
      },

      month() {
        return MONTHS[ this.timestamp().getMonth() ];
      },

      date() {
        const DATE = this.timestamp().getDate();
        if (DATE === 1 || DATE === 21 || DATE === 31) {
          return DATE + 'st';
        }
        else if (DATE === 2 || DATE === 22) {
          return DATE + 'nd';
        }
        else if (DATE === 3 || DATE === 23) {
          return DATE + 'rd';
        }
        else {
          return DATE + 'th';
        }
      },

      year() {
        return this.timestamp().getFullYear();
      },

      description() {
        return this.$store.state.weather.weather[0].description;
      },

      mainTemperature() {
        return Math.round(this.$store.state.weather.main.temp);
      },

      mainIconClass() {
        return 'wi wi-owm-' + this.$store.state.weather.weather[0].id;
      },

      timezzz() {
        return this.$store.state.forecast.list;
      }
    },

    methods: {
      timestamp() {
        return new Date(+this.$store.state.weather.dt * 1000);
      },

      back() {
        this.$store.commit('setIsShowWeather', false);
      }
    }
  }
</script>

<style lang="less" scoped>
  .weather {
    width: 600px;
    margin: 0 auto;
    position: relative;

    .material-icons_back {
      cursor: pointer;
    }

    .units {
      .units__checkbox {
        position: absolute;
        z-index: -1;
        opacity: 0;
        margin: 10px 0 0 20px;

        &+label {
          position: relative;
          padding: 0 0 0 60px;
          cursor: pointer;

          &:before {
            content: '';
            position: absolute;
            top: -4px;
            left: 0;
            width: 70px;
            height: 26px;
            border-radius: 13px;
            /*background: #CDD1DA;*/
            box-shadow: inset 0 2px 3px rgba(0, 0, 0, .2);
            transition: .2s;
          }

          &:after {
            content: '';
            position: absolute;
            top: -2px;
            left: 2px;
            width: 30px;
            height: 22px;
            border-radius: 10px;
            background: #FFF;
            box-shadow: 0 2px 5px rgba(0, 0, 0, .3);
            transition: .2s;
          }
        }

        &:checked+label:after {
          left: 38px;
        }
      }

      .units__symbols {
        position: absolute;
        left: 250px;
        z-index: -1;
      }
    }
    .main-icon {
      color: #ff0000;
      font-size: 70px;
    }
  }
</style>
