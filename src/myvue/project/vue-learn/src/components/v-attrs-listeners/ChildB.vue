<template>
  <div>
    <p>B-attrs: {{ this.$attrs }}</p>
    <p>B-listeners: {{this.$listeners.click()}}</p>
  </div>
</template>
<script>
/* eslint-disable no-console */
export default {
  props: ["name"],
  inheritAttrs: false,
  created() {
    console.log(this.$attrs);
    console.log(this.$listeners.click());
  }
};
</script>
