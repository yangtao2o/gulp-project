<template>
  <div>
    <child-a
      :name="name"
      :age="age"
      :job="job"
      title="This is a title"
      @click="postData"
    ></child-a>
  </div>
</template>

<script>
/* eslint-disable no-console */
import ChildA from "./ChildA";

export default {
  name: "parent",
  components: {
    ChildA
  },
  data: () => ({
    name: "tao",
    age: "28",
    job: "worker"
  }),
  methods: {
    postData() {
      return "hello";
    }
  }
};
</script>
