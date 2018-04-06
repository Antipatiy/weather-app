<template lang="pug">
  .search
    input.input-search__city(placeholder="City", v-model.trim="inputSearch", @keyup.enter="searchByInput")
    p.search__location
      span.search__divider or
      br
      | use&#8194my&#8194;
      span.search__position(@click="searchByCoordinate") current position
      i.material-icons.material-icons_search(@click="searchByInput") search
</template>
<script src="./SearchCity.js"></script>
<style lang="less" scoped src="./SearchCity.less"></style>
