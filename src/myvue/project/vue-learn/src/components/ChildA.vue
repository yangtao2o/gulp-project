<template>
  <div>
    <div>{{name}}</div>
    <button @click="postData">发给C</button>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: "child-a",
  data: () => ({
    name: "AAA"
  }),
  methods: {
    postData() {
      this.$bus.emit('child-a', this.name);
    }
  }
};
</script>
