<template>
  <div>
    <div>这是父组件，接收：{{ message }}</div>
    <child @myclick="getChildData"></child>
  </div>
</template>

<script>
import Child from "./Child";

export default {
  name: "parent",
  components: {
    Child
  },
  data: () => ({
    message: ""
  }),
  methods: {
    getChildData(data) {
      this.message = data;
    }
  }
};
</script>
