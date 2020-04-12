<template>
  <div>
    <p>A-attrs: {{ this.$attrs }}</p>
    <child-b v-bind="$attrs" v-on="$listeners"></child-b>
  </div>
</template>

<script>
/* eslint-disable no-console */
import ChildB from "./ChildB";
export default {
  name: "child-a",
  components: {
    ChildB
  },
  created() {
    console.log(this.$attrs);
    console.log(this.$listeners.click());
  }
};
</script>
