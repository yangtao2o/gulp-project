<template>
  <div>
    <h1>{{ count }}</h1>
    <button @click="increment">+1</button>
  </div>
</template>

<script>
// 创建一个 Counter 组件
// const Counter = {
//   template: `<div>{{ count }}</div>`,
//   computed: {
//     count () {
//       return store.state.count
//     }
//   }
// }
export default {
  name: 'Counter',
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  methods: {
    increment() {
      this.$store.commit('increment')
    }
  },
}
</script>


