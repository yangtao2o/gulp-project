<template>
  <div>
    <div>{{ name.join(",") }}</div>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: "child-c",
  data: () => ({
    name: ["CCC"]
  }),
  created() {
    this.$bus.on('child-a', this.getData);
    this.$bus.on('child-b', this.getData);
  },
  beforeDestroy() {
    this.$bus.off('child-a', this.getData);
    this.$bus.off('child-b', this.getData);
  },
  methods: {
    getData(data) {
      this.name.push(data);
    }
  }
};
</script>
