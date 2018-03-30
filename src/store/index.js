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
    currentUnits: ''
  },

  mutations: {
    mutate(state, data) {
      state[data.key] = data.value;
    },

    setUnits(state, units) {
      state.currentUnits = units.slice(7) === 'metric' ? 'C' : 'F';
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
          commit('mutate', { key: 'weather', value: response[0].data });
          commit('mutate', { key: 'forecast', value: response[1].data });
          commit('mutate', { key: 'inputSearch', value: response[1].data.city.name });
          commit('mutate', { key: 'isShowWeather', value: true });
          commit('mutate', { key: 'queryMemorize', value: {city: city, lon: lon, lat: lat, units: units} });
          commit('setUnits', units);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            commit('mutate', { key: 'inputSearch', value: city.substring(2) + ' not found' });
          }
          console.error(error);
        });
    }
  }
});
