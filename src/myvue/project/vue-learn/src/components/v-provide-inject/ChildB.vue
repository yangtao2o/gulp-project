<template>
  <div>
    <h3 :style="{ color: this.theme.color }">B 组件</h3>
  </div>
</template>
<script>
/* eslint-disable no-console */
export default {
  inject: {
    theme: {
      default: () => ({})
    }
  },
  created() {
    console.log(this.theme);
  }
};
</script>
