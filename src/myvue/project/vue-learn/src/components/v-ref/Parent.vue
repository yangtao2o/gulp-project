<template>
  <div>
    <button @click="sayHi">打招呼</button><br />
    <button @click="getChildMsg">点击获取子组件信息</button>
    <button @click="getChildValue">点击获取子组件 input 值</button>
    <child ref="usernameInput"></child>
    <p>{{ message }}</p>
  </div>
</template>

<script>
/* eslint-disable no-console */
import Child from "./Child";

export default {
  name: "parent",
  components: {
    Child
  },
  data: () => ({
    message: "Hi"
  }),
  methods: {
    // 如果用在子组件上，引用就指向组件实例
    getChildMsg() {
      this.message = this.$refs.usernameInput.msg;
    },
    sayHi() {
      this.message = this.$refs.usernameInput.sayHello();
    },
    getChildValue() {
      this.message = this.$refs.usernameInput.$refs.input.value;
    }
  },
  mounted() {
    console.log(this.$children[0].msg)
  }
};
</script>
