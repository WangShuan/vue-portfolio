<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  watch: {
    $route: function (to, from) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
};
</script>

<style>
#app {
  color: #2c3e50;
  text-align: center;
}
</style>
<style lang="scss">
@import "assets/all.scss";
</style>