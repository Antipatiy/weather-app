"use strict";

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    inputSearch: '',
    weather: {},
    count: 0
  },

  mutations: {
    updateInputSearch(state, value) {
      state.inputSearch = value;
    },

    setWeatherData(state, data) {
      state.weather = data;
    },

    increment (state, n) {
      state.count += n
    }
  },

  actions: {
    setAsyncWeatherData({commit}, {city = '', lon = '', lat = '', units = '&units=metric'} = {}) {
      axios({
        method: 'get',
        url: 'https://api.openweathermap.org/data/2.5/forecast?' + city + lat + lon + '&APPID=33272e8b33b64b1c603b1a9cbd022c16' + units,
        responseType: 'json',
      })
        .then((response) => {
          commit('setWeatherData', response.data);
          return response.data;
        })
        .then((json) => {
          json.list.forEach((item) => console.log(item.dt_txt));
          console.log(json.city.name);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            this.inputSearch += ' not found';
          }
          console.error(error);
        });
    },

    incrementAsync ({commit}, n) {
      setTimeout(() => {
        commit('increment', n);
        alert(this.state.count);
      }, 1000);
    }
  }
});
