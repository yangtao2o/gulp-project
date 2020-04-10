<template>
  <div>
    <child></child>
  </div>
</template>

<script>
/* eslint-disable no-console */
import Child from "./Child";

export default {
  name: "parent",
  components: {
    Child
  },
  data: () => ({
    message: "Parent say Hi"
  }),
  mounted() {
    console.log(this.$children[0].msg); // Child say Hello
  }
};
</script>
