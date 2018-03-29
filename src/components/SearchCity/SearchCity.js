"use strict";

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
    setPosition(position) {
      this.$store.dispatch('setAsyncWeatherData', {
        lon: 'lon=' + position.coords.longitude,
        lat: 'lat=' + position.coords.latitude + '&'
      });
    },

    searchByCoordinate() {
      navigator.geolocation ? navigator.geolocation.getCurrentPosition(this.setPosition) :
        console.error("Geolocation is not supported by this browser.");
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
