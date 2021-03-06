"use strict";

import store from '../../store/index.js';

export default class Session {
  static getBackgroundDataPerTwentyMinutes() {
    const TWENTY_MINUTES = 1200000;

    let timerId = setTimeout(function query() {
      store.dispatch('setAsyncWeatherData', store.state.queryMemorize);
      timerId = setTimeout(query, TWENTY_MINUTES);
    }.bind(this), TWENTY_MINUTES);
  }

  static setSessionData(data) {
    sessionStorage.setItem('query', JSON.stringify(data.queryMemorize));
    sessionStorage.setItem('forecast', JSON.stringify(data.forecast));
    sessionStorage.setItem('weather', JSON.stringify(data.weather));
  }

  static checkSession() {
    return !!sessionStorage.getItem('query');
  }

  static getSessionWeather() {
    return sessionStorage.getItem('weather') ? JSON.parse(sessionStorage.getItem('weather')) : {};
  }

  static getSessionForecast() {
    return sessionStorage.getItem('forecast') ? JSON.parse(sessionStorage.getItem('forecast')) : {};
  }

  static getSessionCity() {
    let city = '';
    if (sessionStorage.getItem('weather')) {
      city = JSON.parse(sessionStorage.getItem('weather'));
      return city.name;
    }
    return city;
  }

  static getSessionUnits() {
    let units = '';
    if (sessionStorage.getItem('query')) {
      let sessionUnits = JSON.parse(sessionStorage.getItem('query')).units;
      units = sessionUnits.slice(7) === 'metric' ? 'C' : 'F';
    }
    return units;
  }

  static getIsMetricUnits() {
    let units = true;
    if (sessionStorage.getItem('query')) {
      units = JSON.parse(sessionStorage.getItem('query')).units;
      units = units.slice(7) === 'metric';
    }
    return units;
  }

  static getSessionQuery() {
    return sessionStorage.getItem('query') ? JSON.parse(sessionStorage.getItem('query')) : {};
  }
};
