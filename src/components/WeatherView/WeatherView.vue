<template lang="pug">
  .weather
    i.material-icons.material-icons_back(@click="back") arrow_back
    h1 {{ city }}
    .units
      input.units__checkbox(type="checkbox" id="checkbox" v-model="metric", @click="changeUnits")
      label.units__label(for="checkbox")
      span.units__symbols &deg;C &deg;F
      p {{ metric }}
    h1 {{ dayToday }}, {{ month }} {{ date }} {{ year }}
    h2 {{ description }}
    h1 {{ mainTemperature }}&deg;{{ units }}
    i(class="main-icon", :class="mainIconClass")
    h3(v-for="item in todayTemperature", :key="item.id") {{ item }}&deg;{{ units }}
    ul
      li(v-for="item, index in weekForecast", :key="item.id")
        i(:class="'wi wi-owm-' + weekForecast[index].weather[0].id") {{ item.main.temp }}&deg;{{ units }} {{ dayOnForecast(item.dt) }}

</template>
<script src="./WeatherView.js"></script>
<style lang="less" scoped src="./WeatherView.less"></style>
