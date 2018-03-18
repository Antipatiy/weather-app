<template lang="pug">
  .weather
    i.material-icons.material-icons_back(@click="back") arrow_back
    h1 {{ city }}
    .units
      input.units__checkbox(type="checkbox" id="checkbox" v-model="checked")
      label.units__label(for="checkbox")
      span.units__symbols &deg;C &deg;F
      p {{ checked }}

</template>

<script>
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
      }
    },

    methods: {
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
  }
</style>
