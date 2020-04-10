<template>
  <button @click="clickHandle">点击</button>
</template>

<script>
export default {
  name: "child",
  methods: {
    clickHandle() {
      this.$emit("myclick", "子组件数据");
    }
  }
};
</script>
