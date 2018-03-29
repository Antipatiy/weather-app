"use strict";

const DAYSOFWEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
  'November', 'December'];
const DAYTIME = ['Morning', 'Day', 'Evening', 'Night'];

export default {
  name: 'WeatherView',

  data() {
    return {
      metric: true
    }
  },

  computed: {
    city() {
      return this.$store.state.inputSearch;
    },

    day() {
      return DAYSOFWEEK[this.timestamp(this.$store.state.weather.dt).getDay()];
    },

    month() {
      return MONTHS[this.timestamp(this.$store.state.weather.dt).getMonth()];
    },

    date() {
      const DATE = this.timestamp(this.$store.state.weather.dt).getDate();

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
      return this.timestamp(this.$store.state.weather.dt).getFullYear();
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

    todayTemperature() {
      return this.todayForecast().map((item) => {
        const HOUR = this.timestamp(item.dt).getUTCHours();
        const TEMPERATURE = Math.round(item.main.temp);

        if (HOUR === 9) {
          return DAYTIME[0] + ' ' + TEMPERATURE;
        }
        else if (HOUR === 12) {
          return DAYTIME[1] + ' ' + TEMPERATURE;
        }
        else if (HOUR === 18) {
          return DAYTIME[2] + ' ' + TEMPERATURE;
        }
        else if (HOUR === 0) {
          return DAYTIME[3] + ' ' + TEMPERATURE;
        }
      });
    },

    weekForecast() {
      return this.$store.state.forecast.list.filter((item) => {
        return this.timestamp(item.dt).getUTCHours() === 12;
      });
    },

    units() {
      return this.$store.state.currentUnits;
    }
  },

  methods: {
    back() {
      this.$store.commit('mutate', { key: 'isShowWeather', value: false });
    },

    checkUnits() {
      this.metric ? this.$store.commit('changeUnitsQueryMemorize', '&units=imperial') :
        this.$store.commit('changeUnitsQueryMemorize', '&units=metric');
    },

    changeUnits() {
      this.checkUnits();
      this.$store.dispatch('setAsyncWeatherData', this.$store.state.queryMemorize);
    },

    timestamp(timeUTC) {
      return new Date(+timeUTC * 1000);
    },

    todayForecast() {
      const today = new Date().getUTCDate();
      const tomorrow = new Date().getUTCDate() + 1;

      return this.$store.state.forecast.list.filter((item) => {
        const DATE = this.timestamp(item.dt).getUTCDate();
        const HOUR = this.timestamp(item.dt).getUTCHours();

        return DATE === today && HOUR === 9 ||
          DATE === today && HOUR === 12 ||
          DATE === today && HOUR === 18 ||
          DATE === tomorrow && HOUR === 0;
      });
    }
  }
}
