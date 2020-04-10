<template>
  <div>
    子组件：<input
      @focus="focusHandle"
      type="text"
      ref="input"
      value="hello msg"
    />
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: "child-a",
  data: () => ({
    msg: "子组件信息"
  }),
  methods: {
    // 用来从父级组件聚焦输入框
    focusHandle() {
      // 如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素
      this.$refs.input.focus();
    },
    sayHello() {
      return "Hello Vue!";
    }
  },
  mounted() {
    console.log(this.$parent.message)
  }
};
</script>
