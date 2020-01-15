<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <HelloWorld msg="Hello Vue!" />
    <span v-bind:title="message">提示信息{{now()}}</span>
    <p v-if="seen">现在你看到我了</p>
    <div>把{{str}}进行反转：{{reversedMessage}}</div>
    <ul>
      <li
        v-for="(todo, index) in todos"
        v-bind:key="index"
      >
        {{todo.text}}
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable no-console */

import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  data: () => ({
    message: "页面加载于 ddd",
    seen: false,
    str: "hello vue",
    todos: [
      { text: "学习JavaScript" },
      { text: "学习Vue" },
      { text: "学习Html css" },
      { text: "学习React" }
    ]
  }),
  components: {
    HelloWorld
  },
  computed: {
    reversedMessage () {
      return this.str
        .split("")
        .reverse()
        .join("")
    },
    
  },
  methods: {
    now() {
      return Date().toLocaleString()
    },
  },
  beforeCreate() {
    console.log("beforeCreate: ", this.message);
  },
  created() {
    console.log("creatd: ", this.message);
  },
  beforeMount() {
    console.log("beforeMount: ", this.message);
  },
  mounted() {
    console.log("mounted: ", this.message);
  },
  beforeUpdate() {
    console.log("beforeUpdate: ", this.message);
  },
  updated() {
    console.log("updted: ", this.message);
  },
  beforeDestroy() {
    console.log("beforeDestroy: ", this.message);
  },
  destroyed() {
    console.log("destroyed: ", this.message);
  }
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
