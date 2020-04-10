<template>
  <div>Hello Boy</div>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: "child",
  data: () => ({
    msg: "Child say Hello"
  }),
  mounted() {
    console.log(this.$parent.message); // Parent say Hi
  }
};
</script>
