<template>
  <div>
    <div>{{name}}</div>
    <button @click="postData">发给C</button>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: "child-b",
  data: () => ({
    name: "BBB"
  }),
  methods: {
    postData() {
      this.$bus.emit('child-b', this.name);
    }
  }
};
</script>
