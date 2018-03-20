"use strict";

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/';
const APPID = '&APPID=33272e8b33b64b1c603b1a9cbd022c16';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    inputSearch: '',
    weather: {},
    forecast: {},
    isShowWeather: false,
    queryMemorize: {},
  },

  mutations: {
    updateInputSearch(state, value) {
      state.inputSearch = value;
    },

    setWeatherData(state, data) {
      state.weather = data;
    },

    setForecastData(state, data) {
      state.forecast = data;
    },

    setIsShowWeather(state, boolean) {
      state.isShowWeather = boolean;
    },

    setQueryMemorize(state, data) {
      state.queryMemorize = data;
    },

    changeUnitsQueryMemorize(state, changedUnits) {
      Vue.set(state.queryMemorize, 'units', changedUnits);
    }
  },

  actions: {
    setAsyncWeatherData({commit}, {city = '', lon = '', lat = '', units = '&units=metric'} = {}) {
      Promise.all([
        axios.get(URL + 'weather?' + city + lat + lon + APPID + units),
        axios.get(URL + 'forecast?' + city + lat + lon + APPID + units)
      ])
        .then((response) => {
          commit('setWeatherData', response[0].data);
          commit('setForecastData', response[1].data);
          commit('updateInputSearch', response[1].data.city.name);
          commit('setIsShowWeather', true);
          commit('setQueryMemorize', {city: city, lon: lon, lat: lat, units: units});
          return response.data;
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
