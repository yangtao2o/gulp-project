<template>
  <div>
    <button @click="changeColor">change</button>
    <child-a></child-a>
  </div>
</template>

<script>
/* eslint-disable no-console */
import Vue from "vue";
import ChildA from "./ChildA";

export default {
  name: "parent",
  components: {
    ChildA
  },
  data: () => ({
    color: "blue"
  }),
  provide() {
    this.theme = Vue.observable({
      color: this.color
    });
    return {
      theme: this.theme
    };
  },
  methods: {
    changeColor() {
      this.theme.color = this.theme.color === "blue" ? "red" : "blue";
    }
  }
};
</script>
