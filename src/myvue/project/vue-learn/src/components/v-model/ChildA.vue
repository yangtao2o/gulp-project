<template>
  <div>
    <div>{{value}}</div>
    子组件：<input type="text" @input="handle" :value="value">
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: "child-a",
  props: ['value'],
  methods: {
    handle(e) {
      this.$emit('input', e.target.value)
    }
  }
};
</script>
