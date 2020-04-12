<template>
  <div>
    <input type="text" :value="message" @input="message = $event.target.value">
    <div>{{message}}</div>
    <ChildA v-model="message" />
    <ChildA :value="message" @input="handle" />
  </div>
</template>

<script>
/* eslint-disable no-console */
import ChildA from './ChildA'
export default {
  name: "parent",
  components: {
    ChildA
  },
  data: () => ({
    message: "Hi"
  }),
  methods: {
    handle(data) {
      this.message = data
    }
  }
};
</script>
