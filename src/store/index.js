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
    isShowWeather: false
  },

  mutations: {
    updateInputSearch(state, value) {
      state.inputSearch = value;
    },

    setWeatherData(state, data) {
      state.weather = data;
    },

    setIsShowWeather(state, boolean) {
      state.isShowWeather = boolean;
    },
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
          commit('updateInputSearch', response.data.city.name);
          commit('setIsShowWeather', true);
          return response.data;
        })
        .then((json) => {
          json.list.forEach((item) => console.log(item.dt_txt));
          console.log(json.city.name);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            commit('updateInputSearch', city.substring(2) + ' not found');
          }
          console.error(error);
        });
    }
  }
});
