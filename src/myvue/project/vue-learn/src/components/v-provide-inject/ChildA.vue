<template>
  <div>
    <div>{{name}}</div>
    <child-b></child-b>
  </div>
</template>

<script>
/* eslint-disable no-console */
import ChildB from "./ChildB";
export default {
  name: "child-a",
  data: () => ({
    name: "AAA"
  }),
  components: {
    ChildB
  },
  created() {
    console.log(this.theme);
  }
};
</script>
