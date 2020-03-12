<template>
  <div id="app">
    {{message}}
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
  </div>
</template>

<script>
/* eslint-disable no-console */


export default {
  name: "app",
  data: () => ({
    message: "页面加载于 ddd",
  }),
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
