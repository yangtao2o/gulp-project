<template>
  <div>
    <child-a></child-a>
    <child-b></child-b>
    <child-c></child-c>
  </div>
</template>

<script>
/* eslint-disable no-console */
import ChildA from "./ChildA";
import ChildB from "./ChildB";
import ChildC from "./ChildC";

export default {
  name: "parent",
  components: {
    ChildA,
    ChildB,
    ChildC
  },
  data: () => ({
    message: "Hi"
  }),
  methods: {
   
  }
};
</script>
