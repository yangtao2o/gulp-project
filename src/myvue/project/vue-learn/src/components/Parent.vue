<template>
  <div>
    <child-a></child-a>
  </div>
</template>

<script>
/* eslint-disable no-console */
import ChildA from "./ChildA";

export default {
  name: "parent",
  components: {
    ChildA,
  },
  data: () => ({
    message: "Hi"
  }),
  methods: {
   
  }
};
</script>
