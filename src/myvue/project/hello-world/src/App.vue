<template>
  <div id="app">
    {{message}}
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <vue-slot msg="Hello world">
      <template v-slot:one>
        <div>
          one
        </div>
      </template>
      <template v-slot:two>
        <div>
          two
        </div>
      </template>
      <template v-slot:default>
        <div>
          hahah
        </div>
      </template>

    </vue-slot>
    <async-comp></async-comp>
  </div>
</template>

<script>
/* eslint-disable no-console */
import VueSlot from "./components/VueSlot";
import AsyncComponent from './util/async-comp.js';

export default {
  name: "app",
  components: {
    VueSlot,
    AsyncComp: AsyncComponent
  },
  data: () => ({
    message: "页面加载于 ddd"
  })
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
